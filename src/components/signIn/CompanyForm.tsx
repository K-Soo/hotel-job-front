import React from 'react';
import styled from 'styled-components';
import path from '@/constants/path';
import useAppRouter from '@/hooks/useAppRouter';
import Button from '@/components/common/style/Button';
import FormInput from '@/components/common/form/FormInput';
import { SignInForm } from '@/types';
import { SubmitHandler, useFormContext } from 'react-hook-form';

interface CompanyFormProps {
  onSubmit: SubmitHandler<SignInForm>;
  isSubmitError: boolean;
}

export default function CompanyForm({ onSubmit, isSubmitError }: CompanyFormProps) {
  const { push } = useAppRouter();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<SignInForm>();

  return (
    <S.CompanyForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<SignInForm> label="아이디" name="userId" placeholder="아이디" isFocusing />
        <FormInput<SignInForm> label="비밀번호" name="password" type="password" placeholder="비밀번호" />

        <S.ResponseErrorText $isVisible={isSubmitError}>로그인 정보를 확인해주세요.</S.ResponseErrorText>

        <Button label="로그인" type="submit" variant="primary" margin="15px 0 0 0" isLoading={isSubmitting} />
      </form>

      <div className="account-group">
        <button className="account-group__recover" onClick={() => push(path.RECOVER)}>
          아이디 · 비밀번호 찾기
        </button>

        <Button
          label="회원가입"
          fontSize="14px"
          type="submit"
          height="30px"
          variant="primary100"
          padding="0"
          onClick={() => push(path.SIGN_UP)}
          width="auto"
        />
      </div>
    </S.CompanyForm>
  );
}

const S = {
  CompanyForm: styled.div`
    width: 100%;
    .account-group {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__recover {
        font-size: 13px;
        color: ${(props) => props.theme.colors.gray600};
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  `,
  ResponseErrorText: styled.p<{ $isVisible: boolean }>`
    text-align: center;
    color: ${(props) => props.theme.colors.red500};
    font-weight: 400;
    visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  `,
};
