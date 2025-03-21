import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Logo from '@/components/common/Logo';
import path from '@/constants/path';
import Icon from '@/icons/Icon';
import { useSetRecoilState } from 'recoil';
import { hamburgerNavigationAtom } from '@/recoil/hamburgerNavigation';
import Notification from '@/components/common/notification';
import { useScroll, motion, useMotionValueEvent } from 'framer-motion';
import useAuth from '@/hooks/useAuth';
import useShare from '@/hooks/useShare';

interface MobileNavigationProps {
  backIcon?: boolean;
  hamburgerIcon?: boolean;
  logoIcon?: boolean;
  homeIcon?: boolean;
  backUrl?: string;
  title?: string;
  notificationIcon?: boolean;
  signUpIcon?: boolean;
  shareIcon?: boolean;
}

export function MobileNavigation({
  title,
  backUrl,
  backIcon,
  logoIcon,
  homeIcon,
  hamburgerIcon,
  notificationIcon,
  signUpIcon,
  shareIcon,
}: MobileNavigationProps) {
  const [hasBorder, setHasBorder] = React.useState(false);
  const { isUnAuthenticated } = useAuth();
  const router = useRouter();
  const { scrollY } = useScroll();

  const setHamburgerNavigationAtomState = useSetRecoilState(hamburgerNavigationAtom);

  const { handleClickShare } = useShare({
    title: ``,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest >= 50 && !hasBorder) {
      setHasBorder(true);
    }
    if (latest < 50 && hasBorder) {
      setHasBorder(false);
    }
  });

  const handleClickBack = () => {
    if (!backUrl) return;
    router.push(backUrl);
  };

  return (
    <S.MobileNavigation $hasBorder={hasBorder}>
      <div className="left">
        {backIcon && <Icon name="ArrowLeft24x24" width="24px" height="24px" onClick={handleClickBack} />}
        {homeIcon && <Icon name="Home24x24" width="24px" height="24px" onClick={() => router.push(path.HOME)} />}
        {logoIcon && <Logo size="small" margin="0" />}
      </div>

      <div className="title">{title && <h1>{title}</h1>}</div>

      <div className="right">
        {notificationIcon && <Notification />}
        {signUpIcon && isUnAuthenticated && <SignUpButton>회원가입</SignUpButton>}
        {hamburgerIcon && (
          <Icon name="ListA24x24" width="24px" height="24px" onClick={() => setHamburgerNavigationAtomState({ isOpen: true })} />
        )}
        {shareIcon && (
          <StyledShareButton onClick={() => handleClickShare()}>
            <Icon name="Share24x24" width="24px" height="24px" />
          </StyledShareButton>
        )}
      </div>
    </S.MobileNavigation>
  );
}

const StyledShareButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const SignUpButton = styled.div`
  font-size: 12px;
  border: 1px solid ${(props) => props.theme.colors.gray300};
  border-radius: 8px;
  padding: 0 12px;
  color: ${(props) => props.theme.colors.blue500};
  height: 32px;
  display: flex;
  align-items: center;
`;

const S = {
  MobileNavigation: styled(motion.div)<{ $hasBorder: boolean }>`
    display: none;
    height: 50px;
    padding: 0 15px;
    background-color: rgba(255, 255, 255, 0.8);
    border-bottom: ${(props) => (props.$hasBorder ? '1px solid #e5e8eb' : 'none')};
    svg {
      color: #333333;
    }
    ${(props) => props.theme.media.tablet`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
    .left {
      flex-basis: 120px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .title {
      flex: 1 0 auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
    }
    .right {
      flex-basis: 120px;
      flex-basis: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
    }
  `,
};
