import styled from "styled-components";
import Link from "next/link";
import path from "@/constants/path";

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
  return (
    <S.Navigation>
      <div>
        <Link href={path.RECRUIT}>채용정보</Link>
        <Link href={path.TALENT}>인재정보</Link>
      </div>
      <div>
        <Link href={path.SIGN_IN}>로그인</Link>
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
