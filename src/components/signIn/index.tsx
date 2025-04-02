import styled from 'styled-components';
import React from 'react';

interface SignInProps {
  children: React.ReactNode;
}

export default function SignIn({ children }: SignInProps) {
  return (
    <S.SignIn>
      <div className="signin-container">
        <h1 className="signin-container__title">로그인</h1>
        {children}
      </div>
    </S.SignIn>
  );
}

const S = {
  SignIn: styled.section`
    .signin-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      height: 100%;
      max-width: 350px;
      &__title {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 50px;
        color: ${(props) => props.theme.colors.gray800};
      }
    }
  `,
};
