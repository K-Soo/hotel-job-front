import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Portal from '@/components/common/Portal';
import Background from '@/components/common/Background';

interface LoadingProps {
  height?: string;
}

export default function Loading({ height }: LoadingProps) {
  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <Portal>
      <S.Loading height={height}>
        <Image src="/images/spinner200px.gif" width={30} height={30} alt="loading" priority />
      </S.Loading>
    </Portal>
  );
}

const S = {
  Loading: styled.div<{ height?: string }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    min-height: ${({ height }) => height || '100%'};
    z-index: 15;
  `,
};
