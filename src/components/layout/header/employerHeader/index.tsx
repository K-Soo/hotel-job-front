import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';
import Icon from '@/icons/Icon';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import React from 'react';
import { Post } from '@/apis';
import Link from 'next/link';

export function EmployerHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef(null);

  const router = useRouter();

  const { isAuthenticated, authAtomState, isAuthIdle } = useAuth();

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    // input 또는 dropdown 내부 클릭인 경우 blur 무시
    if (dropdownRef.current?.contains(relatedTarget)) {
      return;
    }
    setIsDropdownOpen(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log('111');
    setIsDropdownOpen(true);
  };

  const handleClickToggle = () => {
    // setIsDropdownOpen((prev) => !prev);
  };

  const handleClickDropdownItem = (value: string) => {};

  const handleClickSignOut = async () => {
    try {
      const response = await Post.signOut();
      console.log('로그아웃 API : ', response);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      window.location.href = '/sign-in';
    }
  };

  return (
    <S.EmployerHeader>
      {/* TODO: 분기 처리 */}
      <div className="nav-bar">
        <Link href={path.EMPLOYER}>로그</Link>
        <Link href={path.SUPPORT_NOTICE}>인재풀</Link>
      </div>
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

          <S.UserInfo ref={inputRef} tabIndex={0} onBlur={handleBlur} onFocus={handleFocus} onClick={handleClickToggle}>
            <span className="nickname">{authAtomState.nickname}</span>
            <Icon className="arrow-icon" name="ArrowRight16x16" width="16px" height="16px" />
          </S.UserInfo>

          {isDropdownOpen && (
            <DropdownTemplate ref={dropdownRef} tabIndex={0}>
              <div onClick={handleClickSignOut}>로그아웃</div>
            </DropdownTemplate>
          )}
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
    z-index: 10;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
    background-color: ${(props) => props.theme.colors.white};
    .nav-bar {
      display: flex;
      align-items: center;
    }
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
