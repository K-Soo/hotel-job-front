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
        <FormInput<SignInForm> label="아이디" name="userId" placeholder="아이디" isFocusing margin="0 0 15px 0" />
        <FormInput<SignInForm> label="비밀번호" name="password" type="password" placeholder="비밀번호" />

        <S.ResponseErrorText $isVisible={isSubmitError}>로그인 정보를 확인해주세요.</S.ResponseErrorText>

        <Button label="로그인" type="submit" variant="primary" margin="30px 0 0 0" isLoading={isSubmitting} />
      </form>
      <div className="line" />
      <div className="button-group">
        <div className="button-group__find-box">
          <Button
            label="아이디 찾기"
            fontSize="11px"
            width="73px"
            type="submit"
            height="20px"
            variant="secondary200"
            onClick={() => push(path.SIGN_UP)}
            margin="0 5px 0 0"
          />
          <Button
            label="비밀번호 찾기"
            fontSize="11px"
            type="submit"
            height="20px"
            variant="secondary200"
            width="73px"
            onClick={() => push(path.SIGN_UP)}
          />
        </div>
        <Button
          label="회원가입"
          fontSize="14px"
          type="submit"
          height="25px"
          variant="secondary100"
          onClick={() => push(path.SIGN_UP)}
          width="100px"
        />
      </div>
    </S.CompanyForm>
  );
}

const S = {
  CompanyForm: styled.div`
    width: 100%;
    .line {
      border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
      width: 100%;
      margin: 25px 0;
    }
    .button-group {
      display: flex;
      justify-content: space-between;
      flex: 1;
      &__find-box {
        display: flex;
        align-items: center;
        width: auto;
      }
    }
  `,
  ResponseErrorText: styled.p<{ $isVisible: boolean }>`
    margin-top: 15px;
    text-align: center;
    color: ${(props) => props.theme.colors.red500};
    font-weight: 400;
    visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  `,
};
