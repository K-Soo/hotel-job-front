import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { SignUpForm } from '@/types';
import FormInput from '@/components/common/form/FormInput';

interface SignUpProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<SignUpForm>;
}

export default function SignUp({ children }: SignUpProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/signup`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      console.log('회원가입 API : ', response.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <S.SignUp>
      {children}
      {/* <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            email
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="">
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            password
          </label>
          <button>회원가입</button>
        </form>
      </div> */}
    </S.SignUp>
  );
}

const S = {
  SignUp: styled.section`
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 60px;
  `,
};
