import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { hamburgerNavigationAtom } from '@/recoil/hamburgerNavigation';
import Portal from '@/components/common/Portal';
import Icon from '@/icons/Icon';
import { debounce } from 'lodash';
import { GENERAL_ASIDE_MENU } from '@/constants/menu';
import { useRouter } from 'next/router';
import useSignout from '@/hooks/useSignout';
import useAuth from '@/hooks/useAuth';
import path from '@/constants/path';
import Notification from '@/components/common/notification';

export default function HamburgerNavigation() {
  const router = useRouter();
  const [hamburgerNavigationAtomState, setHamburgerNavigationAtomState] = useRecoilState(hamburgerNavigationAtom);
  const { authAtomState } = useAuth();

  const { handleClickSignout } = useSignout();

  const handleDragDebounced = debounce((offsetX, setHamburgerNavigationAtomState) => {
    if (offsetX > 3) {
      setHamburgerNavigationAtomState({ isOpen: false });
    }
  }, 300);

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    handleDragDebounced(info.offset.x, setHamburgerNavigationAtomState);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    // 이벤트가 HamburgerNavigation 내부에서 발생하면 무시
    if ((event.target as HTMLElement).closest('[data-navigation]')) {
      return;
    }
    setHamburgerNavigationAtomState({ isOpen: false });
  };

  const handleClickSetting = () => {
    setHamburgerNavigationAtomState({ isOpen: false });
    router.push(path.USER_PROFILE);
  };

  return (
    <Portal>
      <StyledOverlay initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleOverlayClick}>
        <S.HamburgerNavigation
          data-navigation
          drag="x"
          dragConstraints={{ left: 0, right: 300 }}
          dragElastic={0}
          onDrag={handleDrag}
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.1 }}
        >
          <S.Header>
            <Icon name="CloseA24x24" onClick={() => setHamburgerNavigationAtomState({ isOpen: false })} />
            <StyledSignoutButton onClick={() => handleClickSignout()}>로그아웃</StyledSignoutButton>
          </S.Header>

          <S.UserInfo>{authAtomState.nickname && <span className="user-name">{authAtomState.nickname}</span>}</S.UserInfo>

          <S.Panel>
            <div className="item">
              <Notification />
              <span className="item__text">알람</span>
            </div>
            <div className="item">
              <i className="item__icon">
                <Icon name="Settings24x24" onClick={() => handleClickSetting()} width="24px" height="24px" />
              </i>
              <span className="item__text">설정</span>
            </div>
          </S.Panel>

          <StyledLine margin="2px" />

          <S.Content>
            {GENERAL_ASIDE_MENU.map((element) => {
              if (element.label === '회원정보') {
                return;
              }
              return (
                <S.ContentItem
                  key={element.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setHamburgerNavigationAtomState({ isOpen: false });
                    router.push(element.value);
                  }}
                >
                  <span>{element.label}</span>
                  <Icon name="ArrowRight16x16" width="16px" height="16px" />
                </S.ContentItem>
              );
            })}
          </S.Content>
        </S.HamburgerNavigation>
      </StyledOverlay>
    </Portal>
  );
}

const StyledLine = styled.div<{ margin: string }>`
  height: 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const StyledSignoutButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue400};
`;

const StyledOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const S = {
  HamburgerNavigation: styled(motion.div)`
    position: fixed;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: white;
    z-index: 20;
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    svg {
      color: ${({ theme }) => theme.colors.black300};
    }
  `,
  UserInfo: styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    padding: 15px;
    .user-name {
      font-size: 18px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.blue500};
      &::after {
        content: '님';
        color: ${({ theme }) => theme.colors.black300};
        padding-left: 1px;
      }
    }
  `,
  Panel: styled.div`
    display: flex;
    align-items: center;
    margin: 15px 0;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 70px;
      &__icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__text {
        font-size: 12px;
      }
    }
  `,

  Content: styled.div`
    flex: 1;
    padding: 15px;
  `,
  ContentItem: styled(motion.div)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    color: ${({ theme }) => theme.colors.black300};
  `,
  Footer: styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: 300;
    text-decoration: underline;
    font-size: 13px;
  `,
};
