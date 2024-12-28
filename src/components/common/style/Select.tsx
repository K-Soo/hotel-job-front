import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';
import { get } from 'lodash';
interface SelectProps {
  options: { label: string; value: string }[];
}

export default function Select({ options }: SelectProps) {
  return (
    <S.Select>
      <StyledMotionSelect name="" id="">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledMotionSelect>
    </S.Select>
  );
}

const StyledLabel = styled.label<{ required?: boolean }>`
  display: block;
  margin-bottom: 3px;
  font-size: 15px;
  cursor: default;
  white-space: nowrap;
  margin-right: 15px;
  color: ${({ theme }) => theme.colors.gray700};
  ${(props) =>
    props.required &&
    css`
      &::after {
        content: '*';
        margin-left: 2px;
        vertical-align: top;
        color: crimson;
      }
    `};
`;

const StyledMotionSelect = styled(motion.select)`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  display: block;
  height: 40px;
  width: 100%;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  /* &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    font-size: 14px;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray100};
  } */
`;

const S = {
  Select: styled.div`
    height: 40px;
    width: 100%;
  `,
};
