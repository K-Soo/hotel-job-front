import styled from "styled-components";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Personal from "@/components/signIn/Personal";
import Company from "@/components/signIn/Company";

interface SignInProps {}

type TabTypes = "PERSONAL" | "COMPANY";

export default function SignIn({}: SignInProps) {
  const [signInType, setSignInType] = React.useState<TabTypes>("PERSONAL");

  const handleClickUserInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/auth/user-info`,

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
      const response = await axios.get(`http://localhost:8080/auth/sign-out`, {
        withCredentials: true,
      });

      console.log("로그아웃 API : ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleClickTest = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/business-user`, {
        withCredentials: true,
      });

      console.log("테스트 API : ", response);
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

      <h3>호텔잡</h3>

      <button onClick={handleClickTest}>에러 테스트</button>

      <div>
        <button onClick={() => setSignInType("PERSONAL")}>일반회원</button>
        <button onClick={() => setSignInType("COMPANY")}>기업회원</button>
      </div>

      {signInType === "PERSONAL" && <Personal />}
      {signInType === "COMPANY" && <Company />}
    </S.SignIn>
  );
}

const S = {
  SignIn: styled.div`
    border: 1px solid red;
  `,
};
