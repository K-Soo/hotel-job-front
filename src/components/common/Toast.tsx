import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastAtom, toastAtom } from '@/recoil/toast';
import { useRecoilState } from 'recoil';
import React from 'react';
import Portal from '@/components/common/Portal';

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
    <Portal>
      <S.ToastContainer>
        <AnimatePresence mode="sync">
          {toastAtomState.map((toast, index) => (
            <S.Toast
              layoutId={toast.id}
              key={toast.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25 }}
            >
              <StyledToastIcon type={toast.type}>!</StyledToastIcon>
              <span>{toast.message}</span>
            </S.Toast>
          ))}
        </AnimatePresence>
      </S.ToastContainer>
    </Portal>
  );
}

const StyledToastIcon = styled.i<{ type: ToastAtom['type'] }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.type === 'info' &&
    css`
      background-color: #3182f6;
    `};
  ${(props) =>
    props.type === 'success' &&
    css`
      background-color: #4caf50;
    `};
  ${(props) =>
    props.type === 'error' &&
    css`
      background-color: #f44336;
    `};
  ${(props) =>
    props.type === 'warning' &&
    css`
      background-color: #ffc55b;
    `};
`;

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
    min-width: 250px;
    min-height: 50px;
    font-size: 15px;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.gray700};
  `,
};
