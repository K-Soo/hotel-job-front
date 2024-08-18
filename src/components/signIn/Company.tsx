import axios from "axios";
import React from "react";
import styled from "styled-components";

interface CompanyProps {}

export default function Company({}: CompanyProps) {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

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

  return (
    <S.company>
      <form onSubmit={onClick}>
        <label htmlFor="">
          email
          <input type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        </label>
        <label htmlFor="">
          <input type="text" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          password
        </label>
      </form>
      <button onClick={onClick} type="button">
        로그인
      </button>
    </S.company>
  );
}

const S = {
  company: styled.div``,
};
