import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';
import { get } from 'lodash';
import { useHookFormMask } from 'use-mask-input';

interface FormInputProps<T> {
  name: Path<T>;
  className?: string;
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
  mask?: string | string[];
  maxLength?: number;
  errorPosition?: 'absolute' | 'static';
  inputStyle?: React.CSSProperties;
}

export default function FormInput<T extends FieldValues>({
  name,
  className,
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
  minWidth,
  mask,
  maxLength,
  errorPosition = 'absolute',
  inputStyle,
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
  const error = get(errors, name);

  React.useEffect(() => {
    if (error && watchValue && watchValue.length !== 0) {
      clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, watchValue]);

  React.useEffect(() => {
    if (isFocusing) {
      setFocus(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusing]);

  return (
    <S.FormInput $margin={margin} $horizontal={horizontal} $width={width} $maxWidth={maxWidth} $minWidth={minWidth} className={className}>
      {label && (
        <S.FormLabel className="input-label" htmlFor={name + '-formInput'} required={required && !readOnly}>
          {label}
        </S.FormLabel>
      )}
      <StyledMotionInput
        id={name + '-formInput'}
        autoComplete="off"
        placeholder={placeholder}
        type={type || 'text'}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
        style={inputStyle}
        tabIndex={disabled ? -1 : undefined}
        {...(mask ? registerWithMask(name, mask, { autoUnmask: true, showMaskOnFocus: false, placeholder: '_' }) : register(name))}
      />
      <FormError errors={errors} name={name} style={{ position: errorPosition }} />
    </S.FormInput>
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
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.colors.blue500};
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
  FormInput: styled.div<{ $margin?: string; $horizontal?: boolean; $width?: string; $maxWidth?: string; $minWidth?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    min-width: ${(props) => (props.$minWidth ? props.$minWidth : 'auto')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
  `,
  FormLabel: styled.label<{ required?: boolean }>`
    color: ${({ theme }) => theme.colors.gray700};
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    cursor: default;
    white-space: nowrap;
    margin-right: 15px;
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
