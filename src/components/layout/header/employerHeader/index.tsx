import styled from 'styled-components';
import Button from '@/components/common/style/Button';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';
import Icon from '@/icons/Icon';
import DropdownTemplate from '@/components/common/DropdownTemplate';
import React from 'react';
import { motion } from 'framer-motion';
import Notification from '@/components/common/notification';
import SkeletonUI from '@/components/common/SkeletonUI';
import useSignout from '@/hooks/useSignout';

interface EmployerHeaderProps {
  borderBottom?: boolean;
}

export function EmployerHeader({ borderBottom = true }: EmployerHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef(null);

  const { handleClickSignout } = useSignout();

  const router = useRouter();

  const { isAuthenticated, authAtomState, isUnAuthenticated, isAuthLoading, role } = useAuth();

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
  };

  const handleClickToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  if (isUnAuthenticated) {
    return (
      <S.EmployerHeader $borderBottom={borderBottom}>
        <nav className="nav-bar">
          <Logo size="small" isEmployer margin="0 90px 0 0" />
        </nav>
        <Button
          label="로그인"
          variant="tertiary"
          height="40px"
          onClick={() => router.push(`${path.SIGN_IN}?type=company`)}
          fontSize="15px"
          width="80px"
        />
      </S.EmployerHeader>
    );
  }

  if (isAuthLoading) {
    return (
      <S.EmployerHeader $borderBottom={borderBottom}>
        <nav className="nav-bar">
          <Logo size="small" isEmployer margin="0 90px 0 0" />
        </nav>
        <SkeletonUI.Line style={{ width: '180px', height: '45px' }} />
      </S.EmployerHeader>
    );
  }

  return (
    <S.EmployerHeader $borderBottom={borderBottom}>
      {/* TODO: 분기 처리 */}
      <nav className="nav-bar">
        <Logo size="small" isEmployer margin="0 90px 0 0" />

        {/* <Link href={path.EMPLOYER}>로그</Link> */}
        {/* TODO - 인재풀 */}
        {/* <Link href={path.SUPPORT_NOTICE}>인재풀</Link> */}
      </nav>

      {role === 'EMPLOYER' && (
        <div className="user-control-bar">
          <S.UtilMenu>
            <Notification margin="0 5px 0 0" />
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
                채용 페이지 바로가기
              </StyledDropDownItem>

              <StyledDropDownItem
                onClick={handleClickSignout}
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
  EmployerHeader: styled.div<{ $borderBottom?: boolean }>`
    position: sticky;
    top: -0;
    height: 60px;
    z-index: 10;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px 0 20px;
    background-color: ${(props) => props.theme.colors.white};
    border-bottom: ${(props) => (props.$borderBottom ? '1px solid #e5e8eb' : 'none')};
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
