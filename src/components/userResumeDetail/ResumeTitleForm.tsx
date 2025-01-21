import React from 'react';
import FormError from '@/components/common/form/FormError';
import styled from 'styled-components';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { get } from 'lodash';

interface ResumeTitleFormProps {
  name: string;
}

export default function ResumeTitleForm({ name }: ResumeTitleFormProps) {
  const {
    formState: { errors },
    register,
    setFocus,
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
      <input type="text" className="title-input" placeholder="이력서 제목" maxLength={25} {...register(name)} />
      <FormError errors={errors} name={name} />
    </S.ResumeTitleForm>
  );
}

const S = {
  ResumeTitleForm: styled.div`
    margin-bottom: 5px;
    .title-input {
      all: unset;
      font-size: 28px;
      word-break: break-all;
      width: 100%;
      color: ${(props) => props.theme.colors.black300};
      ${(props) => props.theme.media.mobile`
        font-size: 20px;
      `};
    }
  `,
};
