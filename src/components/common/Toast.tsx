import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { toastAtom } from '@/recoil/toast';
import { useRecoilState } from 'recoil';
import React from 'react';

// TODO type별 icon 추가
export default function Toast() {
  const [toastAtomState, setToastAtomState] = useRecoilState(toastAtom);

  React.useEffect(() => {
    const timers = toastAtomState.map((toast) =>
      setTimeout(() => {
        setToastAtomState((prev) => prev.filter((t) => t.id !== toast.id));
      }, 1500),
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [toastAtomState, setToastAtomState]);

  return (
    <S.ToastContainer>
      <AnimatePresence mode="sync">
        {toastAtomState.map((toast, index) => (
          <S.Toast
            layoutId={toast.id}
            key={toast.id}
            // type={toast.type}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.25 }}
          >
            {toast.message}
          </S.Toast>
        ))}
      </AnimatePresence>
    </S.ToastContainer>
  );
}

const S = {
  ToastContainer: styled(motion.div)`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 15;
  `,
  Toast: styled(motion.div)`
    position: relative; /* 기본 위치 설정 */
    border-radius: 8px;
    color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 10px 20px;
    width: 300px;
    min-height: 50px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.gray700};
  `,
};
