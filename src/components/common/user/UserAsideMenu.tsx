import styled from 'styled-components';
import React from 'react';
import { GENERAL_ASIDE_MENU } from '@/constants/menu';
import Line from '@/components/common/Line';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import useSignout from '@/hooks/useSignout';

export default function UserAsideMenu() {
  const router = useRouter();
  const { handleClickSignout } = useSignout();

  return (
    <S.UserAsideMenu>
      {GENERAL_ASIDE_MENU.map((element) => {
        return (
          <S.MenuItem key={element.label} whileTap={{ scale: 0.95 }} onClick={() => router.push(element.value)}>
            <h6>{element.label}</h6>
          </S.MenuItem>
        );
      })}

      <Line color="#f2f4f6" margin="10px 0" />

      <S.SignOutButton onClick={() => handleClickSignout()}>로그아웃</S.SignOutButton>
    </S.UserAsideMenu>
  );
}

const S = {
  UserAsideMenu: styled.aside`
    position: sticky;
    top: calc(60px + 30px);
    max-height: calc(100vh - 65px);
    border-right: 1px solid ${(props) => props.theme.colors.gray100};
    width: 280px;
    margin-right: 30px;
    padding-right: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    /* scrollbar-width: thin; */
    /* scrollbar-color: #eaeaea #0000; */
    /* scrollbar-gutter: stable; */
    user-select: none;
    ${(props) => props.theme.media.tablet`
      display: none;
    `};
  `,
  MenuItem: styled(motion.button)`
    color: ${(props) => props.theme.colors.gray700};
    height: 45px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.gray100};
      color: ${(props) => props.theme.colors.black100};
      transition: all 0.5s;
    }
  `,
  SignOutButton: styled.button`
    color: ${(props) => props.theme.colors.gray400};
    height: 45px;
    margin-right: 10px;
    width: 100%;
    padding: 0 15px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 400;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray100};
      color: ${(props) => props.theme.colors.black300};
      transition: all 0.5s;
    }
  `,
};
