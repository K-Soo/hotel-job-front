import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface DropdownTemplateProps {
  width?: string;
  outStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  tabIndex?: number;
  children: React.ReactNode;
}

// forwardRef를 사용하여 ref를 전달할 수 있도록 수정
const DropdownTemplate = forwardRef<HTMLDivElement, DropdownTemplateProps>(
  ({ width, outStyle, tabIndex, innerStyle, children }: DropdownTemplateProps, ref) => {
    return (
      <S.DropdownTemplate ref={ref} style={outStyle} tabIndex={tabIndex}>
        <S.Content style={innerStyle}>{children}</S.Content>
      </S.DropdownTemplate>
    );
  },
);

const S = {
  DropdownTemplate: styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    height: 100%;
    height: 450px;
    z-index: 5;
  `,
  Content: styled(motion.div)`
    background-color: ${({ theme }) => theme.colors.white};
    height: 100%;
    border-radius: 5px;
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.gray300};
    padding: 15px;
    overflow-y: auto;
    z-index: 6;
  `,
};

DropdownTemplate.displayName = 'DropdownTemplate';

export default DropdownTemplate;
