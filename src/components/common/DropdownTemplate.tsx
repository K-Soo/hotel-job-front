import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface DropdownTemplateProps {
  outStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  tabIndex?: number;
  children: React.ReactNode;
}

const DropdownTemplate = forwardRef<HTMLDivElement, DropdownTemplateProps>(
  ({ outStyle, tabIndex, innerStyle, children }: DropdownTemplateProps, ref) => {
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
    padding-top: 10px;
  `,
  Content: styled(motion.div)`
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray300};
    height: 100%;
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    overflow-y: auto;
    z-index: 6;
  `,
};

DropdownTemplate.displayName = 'DropdownTemplate';

export default DropdownTemplate;
