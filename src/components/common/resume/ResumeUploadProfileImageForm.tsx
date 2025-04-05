import React from 'react';
import styled from 'styled-components';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { Post } from '@/apis';
import ResumeProfileImage from '@/components/common/resume/ResumeProfileImage';
import Icon from '@/icons/Icon';
import Image from 'next/image';
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

  const onDrop = async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // 프론트 사이드 처라?
    // if (fileRejections.length > 0) {
    //   fileRejections.forEach((rejection) => {
    //     const { errors } = rejection;
    //     const errorCode = errors[0]?.code;
    //     if (errorCode === 'file-too-large') {
    //       alert(`파일 크기가 너무 큽니다(제한: 10MB)`);
    //     }
    //     if (errorCode === 'file-invalid-type') {
    //       alert(`지원되지 않는 파일 형식입니다.`);
    //     }
    //   });
    //   return;
    // }

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
    } catch (error: any) {
      const errorMessage = error.response?.data?.error?.message;
      if (errorMessage) {
        alert(errorMessage);
        return;
      }
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/jpg': [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB 제한
  });

  return (
    <>
      <S.ResumeUploadProfileImageForm {...getRootProps()} $previewImage={previewImage}>
        <input type="text" {...getInputProps()} />

        {previewImage && <ResumeProfileImage imageUrl={previewImage} />}

        <Image src="/images/profile_default.png" fill alt="default" />

        <StyledDimmed />

        <StyledUploadButton aria-label="사진 변경">
          <Icon name="UploadImage24x24" width="24px" height="24px" />
        </StyledUploadButton>
      </S.ResumeUploadProfileImageForm>
    </>
  );
}

const StyledUploadButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 2;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${(props) => props.theme.colors.blue400};
  }
`;

const StyledDimmed = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.06) 30%, rgba(0, 0, 0, 0.05) 60%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
`;

const S = {
  ResumeUploadProfileImageForm: styled.div<{ $previewImage: string }>`
    width: 120px;
    height: 120px;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .guide-text {
      font-size: 14px;
      color: ${(props) => props.theme.colors.gray500};
    }
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.blue200};
    }
  `,
};
