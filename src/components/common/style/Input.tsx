import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  maxLength?: number;
}

export default function Input({ onChange, name, value, maxLength }: InputProps) {
  return (
    <S.Input>
      <StyledMotionInput onChange={onChange} name={name} value={value} maxLength={maxLength} placeholder="서류전형 합격 발표" />
    </S.Input>
  );
}

const StyledMotionInput = styled(motion.input)<{ readOnly?: boolean; disabled?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  color: ${({ theme }) => theme.colors.black500};
  display: block;
  height: 40px;
  width: 100%;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 16px;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue};
    border: 1px solid ${(props) => props.theme.colors.blue100};
  }

  &:focus {
    transition: 0.3s;
    border: 1px solid ${(props) => props.theme.colors.blue500};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    font-size: 15px;
    font-weight: 400;
  }

  ${(props) =>
    props.disabled &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      background-color: ${(props) => props.theme.colors.gray};
      pointer-events: none;
    `};

  ${(props) =>
    props.readOnly &&
    css`
      background-color: none;
      border: none;
      pointer-events: none;
    `};
`;

const S = {
  Input: styled.div`
    width: 100%;
  `,
};
