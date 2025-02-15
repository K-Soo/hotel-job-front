import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

interface RecruitTagButtonProps {
  label: string;
  name?: string;
  margin?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
}

export default function RecruitTagButton({ label, name, margin, onClick, value }: RecruitTagButtonProps) {
  const router = useRouter();
  const queryValue = name ? router.query[name] : undefined;

  const isActive = React.useMemo(() => {
    if (!name) return false;
    if (!queryValue) return false;
    return Array.isArray(queryValue) ? queryValue.includes(value) : queryValue === value;
  }, [queryValue, value, name]);

  return (
    <S.RecruitTagButton type="button" $margin={margin} name={name} onClick={onClick} value={value} $active={isActive}>
      <span>{label}</span>
    </S.RecruitTagButton>
  );
}

const S = {
  RecruitTagButton: styled.button<{ $margin?: string; $active: boolean }>`
    color: ${(props) => props.theme.colors.gray700};
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.gray200};
    padding: 0 15px;
    width: auto;
    height: 35px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    ${(props) =>
      props.$active &&
      css`
        border: 1px solid ${(props) => props.theme.colors.blue500};
        color: ${(props) => props.theme.colors.blue500};
        box-shadow: inset 0 0 0 1px ${(props) => props.theme.colors.blue500};
      `};

    ${(props) =>
      props.$active === false &&
      css`
        &:hover {
          transition: 0.3s;
          background-color: ${(props) => props.theme.colors.gray};
          color: ${(props) => props.theme.colors.black200};
        }
      `};
  `,
};
