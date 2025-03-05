import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IconHoverProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  padding?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  margin?: string;
}

export default function IconHover({ children, className, height, margin, onClick, padding, width }: IconHoverProps) {
  return (
    <S.IconHover
      className={className}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      $padding={padding}
      $width={width}
      $height={height}
      $margin={margin}
    >
      {children}
    </S.IconHover>
  );
}

const S = {
  IconHover: styled(motion.i)<{ $padding?: string; $width?: string; $height?: string; $margin?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: ${(props) => props.$padding || '4px'};
    justify-content: center;
    align-items: center;
    font-size: 0;
    width: ${(props) => props.$width || 'auto'};
    height: ${(props) => props.$height || 'auto'};
    margin: ${(props) => props.$margin || '0'};
    cursor: pointer;
    &:hover {
      background-color: rgba(242, 244, 246, 1);
      transition: background-color 0.2s;
    }
  `,
};
