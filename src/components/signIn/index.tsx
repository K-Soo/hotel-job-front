import styled from "styled-components";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Personal from "@/components/signIn/Personal";
import Company from "@/components/signIn/Company";
import { Get } from "@/apis";
import { useRouter } from "next/router";

interface SignInProps {}

type TabTypes = "personal" | "company";

export default function SignIn({}: SignInProps) {
  const [signInType, setSignInType] = React.useState<TabTypes>("personal");
  const router = useRouter();
  const queryType = (router.query.type as TabTypes) || "personal";

  // useEffect(() => {
  //   if (queryType) {
  //     setSignInType(queryType);
  //   }
  // }, [queryType]);

  const handleClickUserInfo = async () => {
    try {
      const response = await Get.getUserInfo();

      console.log("유저정보 API : ", response);
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

      <h3 className="title">호텔잡</h3>

      <button onClick={handleClickTest}>에러 테스트</button>

      <div>
        <button onClick={() => setSignInType("personal")}>일반회원</button>
        <button onClick={() => setSignInType("company")}>기업회원</button>
      </div>

      {signInType === "personal" && <Personal />}
      {signInType === "company" && <Company />}
    </S.SignIn>
  );
}

const S = {
  SignIn: styled.section`
    border: 1px solid red;
    height: 100%;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    .title {
      font-size: 24px;
    }
  `,
};
