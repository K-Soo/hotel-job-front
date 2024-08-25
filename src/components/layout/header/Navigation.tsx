import styled from "styled-components";
import Link from "next/link";
import path from "@/constants/path";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom, authSelector } from "@/recoil/auth";
import { Post, Get } from "@/apis";

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
  const authSelectorValue = useRecoilValue(authSelector);

  const handleClickSignOut = async () => {
    try {
      const response = await Get.signOut();
      console.log("로그아웃 API : ", response);
    } catch (error) {
      alert("로그아웃 중 에러가 발생했습니다.");
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <S.Navigation>
      <div>
        <Link href={path.RECRUIT}>채용정보</Link>
        <Link href={path.TALENT}>인재정보</Link>
      </div>
      <div>
        {authSelectorValue.isLogin && <Link href={path.ACCOUNT}>마이페이지</Link>}
        {!authSelectorValue.isLogin && <Link href={path.SIGN_IN}>로그인</Link>}
        {authSelectorValue.isLogin && (
          <button onClick={handleClickSignOut} type="button">
            로그아웃
          </button>
        )}
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
