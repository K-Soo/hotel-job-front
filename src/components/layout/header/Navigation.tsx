import styled from "styled-components";
import Link from "next/link";
import path from "@/constants/path";
import axios from "axios";

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
  const handleClickSignOut = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/sign-out`, {
        withCredentials: true,
      });

      console.log("로그아웃 API : ", response);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <S.Navigation>
      <div>
        <Link href={path.RECRUIT}>채용정보</Link>
        <Link href={path.TALENT}>인재정보</Link>
      </div>
      <div>
        <Link href={path.ACCOUNT}>마이페이지</Link>
        <Link href={path.SIGN_IN}>로그인</Link>
        <button onClick={handleClickSignOut} type="button">
          로그아웃
        </button>
      </div>
    </S.Navigation>
  );
}

const S = {
  Navigation: styled.nav`
    max-width: 1080px;
    margin: 0 auto;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
};
