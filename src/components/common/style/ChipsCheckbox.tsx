import styled from 'styled-components';
import React from 'react';
import Icon from '@/icons/Icon';
interface ChipsCheckboxProps {
  name: string;
  label: string;
  margin?: string;
  checked?: boolean;
  disabled?: boolean;
  value: string;
  isCloseIcon?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChipsCheckbox({ name, label, checked, onChange, disabled, margin, value, isCloseIcon }: ChipsCheckboxProps) {
  return (
    <S.ChipsCheckbox $margin={margin}>
      <S.FormChipsContainer>
        <input
          id={`chips-checkbox-${name}`}
          type="checkbox"
          onChange={onChange}
          disabled={disabled}
          checked={checked}
          value={value}
          name={name}
        />
        <label htmlFor={`chips-checkbox-${name}`}>
          <span>{label}</span>
          {isCloseIcon && <Icon name="CloseA24x24" width="18px" height="18px" margin="0 0 0 2px" />}
        </label>
      </S.FormChipsContainer>
    </S.ChipsCheckbox>
  );
}

const S = {
  ChipsCheckbox: styled.div<{ $margin?: string }>`
    margin: ${(props) => props.$margin || 0};
  `,
  FormChipsContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 25px;
    user-select: none;
    white-space: nowrap;
    font-size: 15px;
    input[type='checkbox'] {
      display: none;
    }
    svg {
      fill: #fff;
    }

    input[type='checkbox'] + label {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid ${(props) => props.theme.colors.gray400};
      color: ${(props) => props.theme.colors.gray600};
      padding: 0 15px 0 32px;
      min-width: 95px;
      max-width: auto;
      border-radius: 25px;
      background-color: ${(props) => props.theme.colors.gray200};
      background-color: #ffffff;
      cursor: pointer;
      height: 100%;
      span {
        padding-right: 5px;
      }
      svg {
        color: #666;
      }
    }

    input[type='checkbox']:checked + label {
      background-color: ${(props) => props.theme.colors.blue50};
      border: 1px solid ${(props) => props.theme.colors.blue50};
      color: ${(props) => props.theme.colors.blue500};
    }

    input[type='checkbox'] + label:before {
      content: '';
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 17px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray"><path d="M9 16.2l-5.2-5.2L3 12.8l6 6 12-12-1.4-1.4-10.6 10.8z"/></svg>');
    }

    input[type='checkbox']:checked + label:before {
      background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233182f6"%3E%3Cpath d="M9 16.2l-5.2-5.2L3 12.8l6 6 12-12-1.4-1.4-10.6 10.8z"/%3E%3C/svg%3E');
    }
  `,
};
