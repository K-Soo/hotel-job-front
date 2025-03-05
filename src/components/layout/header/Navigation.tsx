import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import path from '@/constants/path';
import Logo from '@/components/common/Logo';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import User from '@/components/layout/header/User';
import Notification from '@/components/common/notification';

export default function Navigation() {
  const router = useRouter();

  return (
    <S.Navigation>
      <S.Menu>
        <Logo size="small" margin="0 30px 0 0" />

        <MotionLink className="item" href={path.RECRUIT}>
          채용정보
        </MotionLink>

        {/* <MotionLink className="item" href={path.TALENT}>
          인재
        </MotionLink> */}

        {/* <MotionLink className="item" href={path.TALENT}>
          고객센터
        </MotionLink> */}
      </S.Menu>

      <S.Utility>
        <Notification margin="0 5px 0 0" />
        <User />
      </S.Utility>
    </S.Navigation>
  );
}

const MotionLink = motion(Link);

const S = {
  Navigation: styled.nav`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Menu: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    .item {
      margin-right: 15px;
      font-size: 18px;
      color: ${(props) => props.theme.colors.gray700};
      height: 40px;
      padding: 0 12px;
      border-radius: 5px;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
        color: ${(props) => props.theme.colors.black};
        transition: all 0.3s;
      }
    }
  `,
  Utility: styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    min-width: 80px;
  `,
};
