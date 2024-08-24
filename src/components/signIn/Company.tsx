import axios from "axios";
import React from "react";
import styled from "styled-components";
import path from "@/constants/path";
import useAppRouter from "@/hooks/useAppRouter";
import { Get, Post } from "@/apis";
import { authAtom } from "@/recoil/auth";
import { useSetRecoilState } from "recoil";

interface CompanyProps {}

export default function Company({}: CompanyProps) {
  const [loginEmail, setLoginEmail] = React.useState("kanabun102");
  const [loginPassword, setLoginPassword] = React.useState("@@EErr1234");
  const { push } = useAppRouter();
  const setAuthState = useSetRecoilState(authAtom);

  const onClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await Post.signIn({ username: loginEmail, password: loginPassword });
      console.log("로그인 API : ", response);
      if (response.status !== 200) {
        throw new Error();
      }
      setAuthState({
        accessToken: response.result.accessToken,
        nickname: response.result.nickname,
        provider: response.result.provider,
      });
      push(path.HOME);
    } catch (error) {
      console.log("error: ", error);
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

      <button onClick={onClick} type="button">
        로그인
      </button>
    </S.company>
  );
}

const S = {
  company: styled.div``,
};
