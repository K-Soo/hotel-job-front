import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IconDimmedProps {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  padding?: string;
  children: React.ReactNode;
}

export default function IconDimmed({ onClick, padding, children }: IconDimmedProps) {
  return (
    <S.IconDimmed onClick={onClick} whileTap={{ scale: 0.95 }} $padding={padding}>
      {children}
    </S.IconDimmed>
  );
}

const S = {
  IconDimmed: styled(motion.i)<{ $padding?: string }>`
    display: inline-block;
    border-radius: 50%;
    padding: ${(props) => props.$padding || '4px'};
    justify-content: center;
    align-items: center;
    font-size: 0;
    background-color: rgba(242, 244, 246, 0.7);
    &:hover {
      background-color: rgba(242, 244, 246, 0.8);
      background-color: ${(props) => props.theme.colors.gray200};
    }
  `,
};
