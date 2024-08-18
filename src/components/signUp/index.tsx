import React from "react";
import styled from "styled-components";
import axios from "axios";

interface SignUpProps {}

export default function SignUp({}: SignUpProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
    <S.SignUp>
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
    </S.SignUp>
  );
}

const S = {
  SignUp: styled.div``,
};
