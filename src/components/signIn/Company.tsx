import React from 'react';
import styled from 'styled-components';
import path from '@/constants/path';
import useAppRouter from '@/hooks/useAppRouter';
import { Get, Post } from '@/apis';
import { authAtom } from '@/recoil/auth';
import { useSetRecoilState } from 'recoil';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/common/style/Button';

export default function Company() {
  const [loginEmail, setLoginEmail] = React.useState('kanabun102');
  const [loginPassword, setLoginPassword] = React.useState('@@eerr1234');
  const { push } = useAppRouter();
  const setAuthState = useSetRecoilState(authAtom);
  const { setAuthAtomState } = useAuth();

  const onClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await Post.signIn({ userId: loginEmail, password: loginPassword });
      console.log('로그인 API : ', response);
      if (!response.success) {
        throw new Error();
      }
      setAuthAtomState({
        provider: response.result.provider,
        role: response.result.role,
        status: 'AUTHENTICATED',
      });
      push(path.HOME);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <S.company>
      <form onSubmit={onClick}>
        <label htmlFor="">
          아이디
          <input type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        </label>
        <label htmlFor="">
          <input type="text" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          비밀번호
        </label>
      </form>
      <button onClick={() => push(path.SIGN_UP)}>회원가입</button>
      <Button label="로그인" onClick={onClick} type="button" variant="primary" />
    </S.company>
  );
}

const S = {
  company: styled.div``,
};
