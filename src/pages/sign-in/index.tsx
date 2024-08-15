import axios from "axios";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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
    <>
      <button onClick={onClick} type="button">
        로그인
      </button>
      <button onClick={handleClickUserInfo} type="button">
        유저정보 가져오기
      </button>
      <button onClick={handleClickSignOut} type="button">
        로그아웃
      </button>

      <div>
        <form onSubmit={onClick}>
          <label htmlFor="">
            email
            <input type="text" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          </label>
          <label htmlFor="">
            <input type="text" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            password
          </label>
          <button>로그인</button>
        </form>
      </div>

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
    </>
  );
}
