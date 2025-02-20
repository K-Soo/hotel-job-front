import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';
import Icon from '@/icons/Icon';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import React from 'react';
import { Auth } from '@/apis';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { QueryClient } from '@tanstack/react-query';

export function EmployerHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef(null);

  const router = useRouter();

  const queryClient = new QueryClient();

  const { isAuthenticated, authAtomState, isAuthIdle } = useAuth();

  const handleBlur = (event: React.FocusEvent) => {
    event.stopPropagation();
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (dropdownRef.current?.contains(relatedTarget)) {
      return;
    }
    setIsDropdownOpen(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    event.stopPropagation();
    // setIsDropdownOpen(true);
  };

  const handleClickToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickDropdownItem = (value: string) => {};

  const handleClickSignOut = async () => {
    try {
      const response = await Auth.signOut();
      console.log('로그아웃 API : ', response);
      await queryClient.invalidateQueries();
    } catch (error) {
      console.log('error: ', error);
    } finally {
      window.location.href = '/sign-in';
    }
  };

  return (
    <S.EmployerHeader>
      {/* TODO: 분기 처리 */}
      <nav className="nav-bar">
        <Logo size="small" isEmployer margin="0 90px 0 0" />
        {/* <Link href={path.EMPLOYER}>로그</Link> */}
        {/* TODO - 인재풀 */}
        {/* <Link href={path.SUPPORT_NOTICE}>인재풀</Link> */}
      </nav>

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
            <DropdownTemplate ref={dropdownRef} tabIndex={0} outStyle={{ height: 'auto' }}>
              <StyledDropDownItem
                initial={{ backgroundColor: '#FFFFFF' }}
                whileHover={{ backgroundColor: '#f2f4f6', color: '#4593fc' }}
                onClick={() => router.push(path.RECRUIT)}
              >
                채용페이지 바로가기
              </StyledDropDownItem>

              <StyledDropDownItem
                onClick={handleClickSignOut}
                initial={{ backgroundColor: '#FFFFFF' }}
                whileHover={{ backgroundColor: '#f2f4f6', color: '#4593fc' }}
              >
                로그아웃
              </StyledDropDownItem>
            </DropdownTemplate>
          )}
        </div>
      )}
    </S.EmployerHeader>
  );
}

const StyledDropDownItem = styled(motion.div)`
  height: 45px;
  margin: 0;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray700};
`;

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
    padding: 0 15px 0 20px;
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
    justify-content: space-between;
    margin-left: 15px;
    font-size: 14px;
    padding: 0 15px;
    cursor: pointer;
    border-radius: 5px;
    min-width: 180px;
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
