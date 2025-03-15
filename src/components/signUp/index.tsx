import React from 'react';
import styled from 'styled-components';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { SignUpForm } from '@/types';

interface SignUpProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<SignUpForm>;
}

export default function SignUp({ onSubmit, children }: SignUpProps) {
  const { handleSubmit } = useFormContext<SignUpForm>();

  return (
    <S.SignUp>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </S.SignUp>
  );
}

const S = {
  SignUp: styled.section`
    max-width: 380px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
  `,
};
