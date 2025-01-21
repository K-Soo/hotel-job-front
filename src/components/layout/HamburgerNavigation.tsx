import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { hamburgerNavigationAtom } from '@/recoil/hamburgerNavigation';
import Portal from '@/components/common/Portal';
import Icon from '@/icons/Icon';
import { debounce } from 'lodash';
import { GENERAL_ASIDE_MENU } from '@/constants/menu';
import { useRouter } from 'next/router';
import { Auth } from '@/apis';

export default function HamburgerNavigation() {
  const router = useRouter();
  const [hamburgerNavigationAtomState, setHamburgerNavigationAtomState] = useRecoilState(hamburgerNavigationAtom);

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

  const handleClickSignOut = async () => {
    try {
      const response = await Auth.signOut();
      console.log('로그아웃 API : ', response);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      window.location.href = '/sign-in';
    }
  };

  return (
    <Portal>
      <StyledOverlay initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleOverlayClick}>
        <S.HamburgerNavigation
          data-navigation // 데이터 속성 추가
          drag="x" // 드래그 활성화 (x축)
          dragConstraints={{ left: 0, right: 300 }} // 드래그 가능한 영역 제한
          dragElastic={0} // 드래그 탄성 효과
          onDrag={handleDrag}
          onDragStart={() => console.log('onDragStart')}
          onDragEnter={() => console.log('onDragEnter')}
          onDragLeave={() => console.log('onDragLeave')}
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.1 }}
        >
          <S.Header>
            <Icon name="CloseA24x24" onClick={() => setHamburgerNavigationAtomState({ isOpen: false })} />
          </S.Header>
          <S.Content>
            {GENERAL_ASIDE_MENU.map((element) => {
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
          <S.Footer>
            <button onClick={handleClickSignOut}>로그아웃</button>
          </S.Footer>
        </S.HamburgerNavigation>
      </StyledOverlay>
    </Portal>
  );
}

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
    padding: 15px;
    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    margin-bottom: 20px;
  `,
  Content: styled.div`
    flex: 1;
  `,
  ContentItem: styled(motion.div)`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  `,
  Footer: styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: 300;
    text-decoration: underline;
    font-size: 13px;
  `,
};
