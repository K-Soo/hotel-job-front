import React from 'react';
import styled from 'styled-components';

interface BackgroundProps {
  children: React.ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  React.useEffect(() => {
    const targetElement = document.querySelector('html') as HTMLHtmlElement;
    targetElement.style.overflow = 'hidden';
    return () => {
      targetElement.style.overflow = 'visible';
    };
  }, []);

  return <S.Background>{children}</S.Background>;
}

const S = {
  Background: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 15;
  `,
};
