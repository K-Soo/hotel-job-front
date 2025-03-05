import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';
import { get } from 'lodash';
import { useHookFormMask } from 'use-mask-input';

interface FormInputProps<T> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  readOnly?: boolean;
  isFocusing?: boolean;
  required?: boolean;
  disabled?: boolean;
  margin?: string;
  horizontal?: boolean;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  labelFlexBasis?: string;
  mask?: string | string[];
  maxLength?: number;
}

export default function FormInputB<T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  readOnly,
  isFocusing,
  required,
  disabled,
  margin,
  horizontal,
  width,
  maxWidth,
  mask,
  minWidth,
  labelFlexBasis,
  maxLength,
}: FormInputProps<T>) {
  const {
    formState: { errors },
    register,
    setFocus,
    watch,
    clearErrors,
  } = useFormContext<T>();

  const registerWithMask = useHookFormMask(register);

  const watchValue = watch(name);

  React.useEffect(() => {
    if (error && watchValue.length !== 0) {
      clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchValue]);

  React.useEffect(() => {
    if (isFocusing) {
      setFocus(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusing]);

  const error = get(errors, name);

  return (
    <S.FormInputB $margin={margin} $horizontal={horizontal} $width={width} $maxWidth={maxWidth} $minWidth={minWidth}>
      {label && (
        <S.FormLabel
          className="input-label"
          htmlFor={name + '-FormInputB'}
          required={required && !readOnly}
          labelFlexBasis={labelFlexBasis}
        >
          {label}
        </S.FormLabel>
      )}
      <div className="input-wrapper">
        <StyledMotionInput
          id={name + '-FormInputB'}
          autoComplete="off"
          placeholder={placeholder}
          type={type || 'text'}
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxLength}
          {...(mask ? registerWithMask(name, mask, { autoUnmask: true, showMaskOnFocus: false, placeholder: '_' }) : register(name))}
        />
        <FormError errors={errors} name={name} style={{ position: 'absolute' }} />
      </div>
    </S.FormInputB>
  );
}

const StyledMotionInput = styled(motion.input)<{ readOnly?: boolean; disabled?: boolean }>`
  all: unset;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  color: ${({ theme }) => theme.colors.black500};
  display: block;
  height: 40px;
  width: 100%;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${(props) => props.theme.colors.blue};
    border: 1px solid ${(props) => props.theme.colors.blue100};
  }

  &:focus {
    transition: 0.3s;
    border: 1px solid ${(props) => props.theme.colors.blue500};
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.colors.blue500};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    font-size: 15px;
    font-weight: 300;
  }

  ${(props) =>
    props.disabled &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      background-color: ${(props) => props.theme.colors.gray};
      pointer-events: none;
    `};

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    background-color: ${(props) => props.theme.colors.gray};
    pointer-events: none;
  }

  ${(props) =>
    props.readOnly &&
    css`
      background-color: none;
      border: none;
      pointer-events: none;

      /* readOnly일 때 hover 비활성화 */
      &:hover {
        background-color: inherit;
        border: none;
      }
    `};
`;

const S = {
  FormInputB: styled.div<{
    $margin?: string;
    $horizontal?: boolean;
    $width?: string;
    $maxWidth?: string;
    $minWidth?: string;
    $position?: string;
  }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    min-width: ${(props) => (props.$minWidth ? props.$minWidth : 'auto')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    display: flex;
    align-items: center;
    .input-wrapper {
      flex: 1;
    }
  `,
  FormLabel: styled.label<{ required?: boolean; labelFlexBasis?: string }>`
    color: ${({ theme }) => theme.colors.gray700};
    display: block;
    font-size: 14px;
    cursor: default;
    white-space: nowrap;
    flex-basis: ${(props) => props.labelFlexBasis || '150px'};
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
  `,
};
