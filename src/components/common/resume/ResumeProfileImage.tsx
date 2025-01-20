import React from 'react';
import styled, { css } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import Image from 'next/image';

interface ResumeProfileImageProps<T> {
  name: Path<T>;
}

export default function ResumeProfileImage<T extends FieldValues>({ name }: ResumeProfileImageProps<T>) {
  const [previewImage, setPreviewImage] = React.useState('');

  const { register, watch, setValue } = useFormContext<T>();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert('이미지 파일만 업로드 가능합니다.');
    }
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
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
      {previewImage && <Image src={previewImage} className="image" alt="프로필 이미지" fill />}
      {!previewImage && (
        <div className="guide-text">
          이미지 업로드
          <br />
          드래그 & 드롭
        </div>
      )}
    </S.ResumeProfileImage>
  );
}

const S = {
  ResumeProfileImage: styled.div<{ $previewImage: string }>`
    height: 180px;
    aspect-ratio: 9 / 12;
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
      font-size: 11px;
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
      margin-right: 15px;
      aspect-ratio: 3 / 4;
      width: 130px;
      height: 200px;
    `};
  `,
};
