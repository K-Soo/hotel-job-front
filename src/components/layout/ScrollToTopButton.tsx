import React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Icon from '@/icons/Icon';

export function ScrollToTopButton() {
  const [visible, setVisible] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 200);
  });

  const ScrollToTopButton = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <S.ScrollToTopButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={ScrollToTopButton}
        >
          <Icon name="ArrowToTop24x24" width="28px" height="28px" />
        </S.ScrollToTopButton>
      )}
    </AnimatePresence>
  );
}

const S = {
  ScrollToTopButton: styled(motion.div)`
    position: fixed;
    bottom: 95px;
    right: calc(50% - 512px - 100px);
    z-index: 15;
    padding: 10px;
    border-radius: 50%;
    background-color: white;
    color: white;
    cursor: pointer;
    width: 50px;
    height: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) => props.theme.media.tablet`
      width: 40px;
      height: 40px;
      right: 15px;
    `};
  `,
};
