import React from 'react';
import styled from 'styled-components';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
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
