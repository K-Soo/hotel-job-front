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
  fontSize?: string;
}

export default function IconDimmed({ className, onClick, padding, height, width, margin, fontSize, children }: IconDimmedProps) {
  return (
    <S.IconDimmed
      className={className}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      $padding={padding}
      $width={width}
      $height={height}
      $margin={margin}
      $fontSize={fontSize}
    >
      {children}
    </S.IconDimmed>
  );
}

const S = {
  IconDimmed: styled(motion.i)<{ $padding?: string; $width?: string; $height?: string; $margin?: string; $fontSize?: string }>`
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    margin: ${(props) => props.$margin || '0'};
    padding: ${(props) => props.$padding || '4px'};
    font-size: ${(props) => props.$fontSize || '0'};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    background-color: rgba(242, 244, 246, 0.7);
    cursor: pointer;
    &:hover {
      background-color: rgba(242, 244, 246, 0.8);
      background-color: ${(props) => props.theme.colors.gray200};
    }
  `,
};
