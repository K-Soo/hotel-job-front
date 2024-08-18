import styled from "styled-components";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Personal from "@/components/signIn/Personal";
import Company from "@/components/signIn/Company";
import path from "@/constants/path";
import useAppRouter from "@/hooks/useAppRouter";

interface SignInProps {}

type TabTypes = "PERSONAL" | "COMPANY";

export default function SignIn({}: SignInProps) {
  const [signInType, setSignInType] = React.useState<TabTypes>("PERSONAL");

  const { push } = useAppRouter();

  const handleClickUserInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/auth/user-info`,

        {
          withCredentials: true,
        }
      );

      console.log("유저정보 API : ", response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleClickSignOut = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/auth/sign-out`, {
        withCredentials: true,
      });

      console.log("로그아웃 API : ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <S.SignIn>
      <a href="">asd</a>
      <button onClick={handleClickUserInfo} type="button">
        유저정보 가져오기
      </button>
      <button onClick={handleClickSignOut} type="button">
        로그아웃
      </button>
      <div>
        <button onClick={() => setSignInType("PERSONAL")}>일반회원</button>
        <button onClick={() => setSignInType("COMPANY")}>기업회원</button>
      </div>

      {signInType === "PERSONAL" && <Personal />}
      {signInType === "COMPANY" && <Company />}

      <button onClick={() => push(path.SIGN_UP)}>회원가입</button>
    </S.SignIn>
  );
}

const S = {
  SignIn: styled.div``,
};
