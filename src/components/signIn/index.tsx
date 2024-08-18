import styled from "styled-components";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Personal from "@/components/signIn/Personal";
import Company from "@/components/signIn/Company";
import path from "@/constants/path";

interface SignInProps {}

export default function SignIn({}: SignInProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const [signInType, setSignInType] = React.useState("personal");

  const onClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/auth/sigin`,
        {
          email: loginEmail,
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

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8000/auth/signup`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("회원가입 API : ", response.data);
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

      {signInType === "personal" && <Personal />}
      {signInType === "company" && <Company />}

      <div>
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
      </div>
      {/* <button onClick={}>회원가입</button> */}
    </S.SignIn>
  );
}

const S = {
  SignIn: styled.div``,
};
