import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Portal from '@/components/common/Portal';

interface LoadingProps {
  height?: string;
  message?: string;
}

export default function LoadingOverlay({ height, message }: LoadingProps) {
  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <Portal>
      <S.LoadingOverlay height={height}>
        <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
        {message && <p className="message">{message}</p>}
      </S.LoadingOverlay>
    </Portal>
  );
}

const S = {
  LoadingOverlay: styled.div<{ height?: string }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    min-height: ${({ height }) => height || '100%'};
    z-index: 15;
    .message {
      margin-top: 20px;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.black400};
    }
  `,
};
