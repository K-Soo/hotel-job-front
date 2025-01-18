import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IconDimmedProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  padding?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  margin?: string;
}

export default function IconDimmed({ className, onClick, padding, height, width, margin, children }: IconDimmedProps) {
  return (
    <S.IconDimmed
      className={className}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      $padding={padding}
      $width={width}
      $height={height}
      $margin={margin}
    >
      {children}
    </S.IconDimmed>
  );
}

const S = {
  IconDimmed: styled(motion.i)<{ $padding?: string; $width?: string; $height?: string; $margin?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: ${(props) => props.$padding || '4px'};
    justify-content: center;
    align-items: center;
    font-size: 0;
    background-color: rgba(242, 244, 246, 0.7);
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    margin: ${(props) => props.$margin || '0'};
    &:hover {
      background-color: rgba(242, 244, 246, 0.8);
      background-color: ${(props) => props.theme.colors.gray200};
    }
  `,
};
