import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';
import Icon from '@/icons/Icon';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import React from 'react';

export function EmployerHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const router = useRouter();

  const { isAuthenticated, authAtomState, isAuthIdle } = useAuth();

  return (
    <S.EmployerHeader>
      {/* TODO: 분기 처리 */}
      <Logo size="small" margin="0 30px 0 0" />
      {!isAuthIdle && !isAuthenticated && (
        <Button
          label="로그인"
          variant="tertiary"
          height="40px"
          onClick={() => router.push(`${path.SIGN_IN}?type=company`)}
          fontSize="15px"
          width="80px"
        />
      )}

      {isAuthenticated && (
        <div className="user-control-bar">
          <S.UtilMenu>
            <Icon name="SolarBell24x24" width="22px" height="22px" />
            <span>알림</span>
          </S.UtilMenu>
          <S.UserInfo onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <span className="nickname">{authAtomState.nickname}</span>
            {/* <Icon className="arrow-icon" name="ArrowRight16x16" width="16px" height="16px" /> */}
          </S.UserInfo>
          {/* {isDropdownOpen && (
            <DropdownTemplate outStyle={{ top: '60px' }}>
              <div>asd</div>
            </DropdownTemplate>
          )} */}
        </div>
      )}
    </S.EmployerHeader>
  );
}

const S = {
  EmployerHeader: styled.div`
    position: sticky;
    top: -0;
    height: 60px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    background-color: ${(props) => props.theme.colors.white};
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    .user-control-bar {
      height: 45px;
      display: flex;
      position: relative;
    }
  `,
  UtilMenu: styled.div`
    border-right: 1px solid ${(props) => props.theme.colors.gray200};
    display: flex;
    align-items: center;
    padding-right: 15px;
    & > span {
      font-size: 14px;
      padding-left: 5px;
    }
  `,
  UserInfo: styled.div`
    display: flex;
    align-items: center;
    margin-left: 15px;
    font-size: 14px;
    padding: 0 15px;
    cursor: pointer;
    border-radius: 5px;
    .nickname {
      padding-right: 8px;
      user-select: none;
    }
    .arrow-icon {
      transform: rotate(90deg);
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.gray100};
    }
  `,
};
