import React from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { Post } from '@/apis';
import ResumeProfileImage from '@/components/common/resume/ResumeProfileImage';

interface ResumeUploadProfileImageFormProps<T> {
  name: Path<T>;
}

export default function ResumeUploadProfileImageForm<T extends FieldValues>({ name }: ResumeUploadProfileImageFormProps<T>) {
  const [previewImage, setPreviewImage] = React.useState('');
  const { watch, setValue } = useFormContext<T>();
  const profileImageValue = watch(name);

  React.useEffect(() => {
    if (profileImageValue) {
      setPreviewImage(profileImageValue);
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
    <S.ResumeUploadProfileImageForm {...getRootProps()} $previewImage={previewImage}>
      <input type="text" {...getInputProps()} />

      {previewImage && <ResumeProfileImage imageUrl={previewImage} />}

      {!previewImage && <div className="guide-text">이미지 업로드</div>}
    </S.ResumeUploadProfileImageForm>
  );
}

const S = {
  ResumeUploadProfileImageForm: styled.div<{ $previewImage: string }>`
    width: 100px;
    height: 120px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .guide-text {
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray500};
    }
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.blue200};
    }
    ${(props) => props.theme.media.mobile`
      margin-bottom: 30px;
    `};
  `,
};
