import styled from 'styled-components';
import path from '@/constants/path';
import Link from 'next/link';

export default function BottomNavigation() {
  return (
    <S.BottomNavigation>
      <Link className="items" href={path.HOME}>
        <i>IC</i>
        <span>홈</span>
      </Link>
      <Link className="items" href={path.RECRUIT}>
        <i>IC</i>
        <span>채용정보</span>
      </Link>
      <Link className="items" href={path.TALENT}>
        <i>IC</i>
        <span>인재풀</span>
      </Link>
      <Link className="items" href={path.HOME}>
        <i>IC</i>
        <span>HOME</span>
      </Link>
      <Link className="items" href={path.USER}>
        <i>IC</i>
        <span>MY</span>
      </Link>
    </S.BottomNavigation>
  );
}

const S = {
  BottomNavigation: styled.nav`
    display: none;
    z-index: 15;
    ${(props) => props.theme.media.tablet`
      display: flex;
    `};
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.white};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: 0 -1px 15px rgba(0, 0, 0, 0.1);
    .items {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      svg {
      }
    }
  `,
};
