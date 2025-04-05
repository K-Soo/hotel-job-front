import React from 'react';
import FormError from '@/components/common/form/FormError';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { useResumeContext } from '@/context/ResumeProvider';

interface ResumeTitleFormProps {
  name: string;
}

export default function ResumeTitleForm({ name }: ResumeTitleFormProps) {
  const { isEditing } = useResumeContext();

  const {
    formState: { errors },
    register,
    watch,
    clearErrors,
  } = useFormContext();

  const watchValue = watch(name);

  React.useEffect(() => {
    if (errors[name] && watchValue && watchValue.length !== 0) {
      clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, watchValue]);

  return (
    <S.ResumeTitleForm>
      <input
        type="text"
        className="title-input"
        placeholder="이력서 제목을 작성해주세요."
        maxLength={25}
        {...register(name)}
        disabled={!isEditing}
      />
      <FormError errors={errors} name={name} />
    </S.ResumeTitleForm>
  );
}

const S = {
  ResumeTitleForm: styled.div`
    margin-bottom: 30px;
    ${(props) => props.theme.media.mobile`
      margin-bottom: 15px;
    `};
    .title-input {
      all: unset;
      font-size: 30px;
      word-break: break-all;
      max-width: 700px;
      width: 100%;
      color: ${(props) => props.theme.colors.black300};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border: 2px solid transparent;
      &:focus {
        white-space: normal;
        overflow: visible;
        text-overflow: unset;
        border: 2px solid ${(props) => props.theme.colors.blue300};
      }
      ${(props) => props.theme.media.tablet`
        font-size: 24px;
        max-width: 600px;
      `};
      ${(props) => props.theme.media.mobile`
        max-width: 450px;
    `};
    }
  `,
};
