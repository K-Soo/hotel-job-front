import styled from 'styled-components';
import React from 'react';

interface SignInProps {
  children: React.ReactNode;
}

export default function SignIn({ children }: SignInProps) {
  return (
    <S.SignIn>
      <div className="signin-container">{children}</div>
    </S.SignIn>
  );
}

const S = {
  SignIn: styled.section`
    min-height: 100%;
    max-width: 380px;
    width: 100%;
    margin: 50px auto 50px auto;
    .signin-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      height: 100%;
      max-width: 400px;
    }
  `,
};
