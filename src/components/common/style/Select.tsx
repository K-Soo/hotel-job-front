import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Icon from '@/icons/Icon';
interface SelectProps {
  margin?: string;
  options: Record<string, string>;
  name: string;
  onChange: (event: React.ChangeEvent<any>) => void;
}

export default function Select({ margin, options, name, onChange }: SelectProps) {
  return (
    <S.Select $margin={margin}>
      <StyledSelect name={name} onChange={onChange}>
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </StyledSelect>
      <Icon className="select-icon" name="ArrowRight16x16" width="16px" height="16px" />
    </S.Select>
  );
}

const StyledSelect = styled.select`
  height: 100%;
  width: 100%;
  cursor: pointer;
  padding-left: 10px;
  display: flex;
  align-items: center;
  border-radius: inherit;
  background-color: inherit;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  color: ${(props) => props.theme.colors.black500};
  font-size: 14px;
  &:hover {
    transition: 0.3s;
    border: 1px solid ${({ theme }) => theme.colors.blue100};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.blue500};
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;

const S = {
  Select: styled(motion.div)<{ $margin?: string }>`
    margin: ${(props) => props.$margin || '0'};
    background-color: ${(props) => props.theme.colors.white};
    height: 40px;
    width: 100%;
    border-radius: 4px;
    position: relative;
    :hover {
      background-color: ${(props) => props.theme.colors.blue};
    }
    .select-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: rotate(90deg);
      transform: translateY(-50%) rotate(90deg);
      color: ${({ theme }) => theme.colors.gray300};
      pointer-events: none;
    }
  `,
};
