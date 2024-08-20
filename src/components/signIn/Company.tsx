import axios from "axios";
import React from "react";
import styled from "styled-components";
import path from "@/constants/path";
import useAppRouter from "@/hooks/useAppRouter";

interface CompanyProps {}

export default function Company({}: CompanyProps) {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const { push } = useAppRouter();

  const onClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/sign-in`,
        {
          username: loginEmail,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      );
      console.log("로그인 API : ", response.data);
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
