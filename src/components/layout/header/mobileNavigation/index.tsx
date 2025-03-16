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

interface MobileNavigationProps {
  backIcon?: boolean;
  profileIcon?: boolean;
  hamburgerIcon?: boolean;
  logoIcon?: boolean;
  homeIcon?: boolean;
  backUrl?: string;
  title?: string;
  notificationIcon?: boolean;
}

export function MobileNavigation({
  title,
  backUrl,
  backIcon,
  profileIcon,
  logoIcon,
  homeIcon,
  hamburgerIcon,
  notificationIcon,
}: MobileNavigationProps) {
  const [hasBorder, setHasBorder] = React.useState(false);

  const router = useRouter();
  const { scrollY } = useScroll();

  const setHamburgerNavigationAtomState = useSetRecoilState(hamburgerNavigationAtom);

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
        {profileIcon && <i>profile</i>}
        {notificationIcon && <Notification />}
        {hamburgerIcon && (
          <Icon name="ListA24x24" width="24px" height="24px" onClick={() => setHamburgerNavigationAtomState({ isOpen: true })} />
        )}
      </div>
    </S.MobileNavigation>
  );
}

const S = {
  MobileNavigation: styled(motion.div)<{ $hasBorder: boolean }>`
    display: none;
    height: 50px;
    padding: 0 15px;
    background-color: rgba(255, 255, 255, 0.8);
    border-bottom: ${(props) => (props.$hasBorder ? '1px solid #e5e8eb' : 'none')};
    ${(props) => props.theme.media.tablet`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
    .left {
      flex-basis: 50px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .title {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      flex-basis: calc(100% - 100px);
      font-size: 16px;
      font-weight: 500;
    }
    .right {
      flex-basis: 50px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
    }
  `,
};
