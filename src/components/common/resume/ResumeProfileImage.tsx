import React from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { Post, Get } from '@/apis';
import useGetResumeProfileImage from '@/hooks/useGetResumeProfileImage';
import { getImageUrl } from '@/utils';

interface ResumeProfileImageProps<T> {
  name: Path<T>;
}

// TODO - 이미지 예외처리
export default function ResumeProfileImage<T extends FieldValues>({ name }: ResumeProfileImageProps<T>) {
  const [previewImage, setPreviewImage] = React.useState('');
  const [isImageError, setIsImageError] = React.useState(false);
  const { watch, setValue } = useFormContext<T>();
  const profileImageValue = watch(name);

  React.useEffect(() => {
    if (profileImageValue) {
      setPreviewImage(profileImageValue);
      console.log('profileImageValue: ', profileImageValue);
    }
  }, [profileImageValue]);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert('이미지 파일만 업로드 가능합니다.');
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await Post.uploadProfileImage(formData);
      console.log('이미지 응답 API : ', response.result);
      setValue(name, response.result.key as PathValue<T, Path<T>>);
      setPreviewImage(response.result.key);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/jpg': [],
    },
    maxSize: 10 * 1024 * 1024, // 10MB 제한
  });
  return (
    <S.ResumeProfileImage {...getRootProps()} $previewImage={previewImage}>
      <input type="text" {...getInputProps()} />
      {previewImage && !isImageError && (
        <Image
          src={previewImage}
          className="image"
          alt="프로필 이미지"
          fill
          onError={() => {
            setIsImageError(true);
          }}
        />
      )}
      {!previewImage && <div className="guide-text">이미지 업로드</div>}
    </S.ResumeProfileImage>
  );
}

const S = {
  ResumeProfileImage: styled.div<{ $previewImage: string }>`
    height: 150px;
    width: 130px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .image {
      position: absolute;
      width: calc(100%);
      height: 100%;
      border-radius: inherit;
      font-size: 0;
      object-fit: cover;
    }
    .guide-text {
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray500};
    }
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.blue200};
    }
    ${(props) =>
      props.$previewImage &&
      css`
        border: none;
        &:hover {
          border: none;
        }
      `};
    ${(props) => props.theme.media.mobile`
      margin-bottom: 15px;
      border-radius: 15px;
      height: 150px;
      width: 130px;
    `};
  `,
};
