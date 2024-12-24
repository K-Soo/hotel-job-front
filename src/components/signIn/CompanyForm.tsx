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

  const { handleSubmit } = useFormContext<SignInForm>();

  return (
    <S.CompanyForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput<SignInForm> label="아이디" name="userId" required />
        <FormInput<SignInForm> label="비밀번호" name="password" required type="password" />

        <S.ResponseErrorText $isVisible={isSubmitError}>로그인 정보를 확인해주세요.</S.ResponseErrorText>

        <Button label="로그인" type="submit" variant="primary" margin="30px 0 0 0" />
      </form>
      <div className="line" />
      <div className="button-group">
        <div className="button-group__find-box">
          <Button
            label="아이디 찾기"
            fontSize="12px"
            width="85px"
            type="submit"
            height="25px"
            variant="secondary"
            onClick={() => push(path.SIGN_UP)}
            margin="0 5px 0 0"
          />
          <Button
            label="비밀번호 찾기"
            fontSize="12px"
            type="submit"
            height="25px"
            variant="secondary"
            width="85px"
            onClick={() => push(path.SIGN_UP)}
          />
        </div>
        <Button
          label="회원가입"
          fontSize="14px"
          type="submit"
          height="25px"
          variant="secondary"
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
        width: auto;
      }
    }
  `,
  ResponseErrorText: styled.p<{ $isVisible: boolean }>`
    text-align: center;
    color: crimson;
    font-weight: 500;
    visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  `,
};
