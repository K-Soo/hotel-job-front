import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';
import { get } from 'lodash';
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
}

export default function FormInput<T extends FieldValues>({
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
}: FormInputProps<T>) {
  const {
    formState: { errors },
    register,
    setFocus,
    watch,
    clearErrors,
  } = useFormContext<T>();

  const watchValue = watch(name);

  React.useEffect(() => {
    if (watchValue && watchValue.length !== 0) {
      clearErrors(name);
    }
  }, [clearErrors, name, watchValue]);

  React.useEffect(() => {
    if (isFocusing) {
      setFocus(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusing]);

  const error = get(errors, name);

  return (
    <S.FormInput $margin={margin} $horizontal={horizontal} $width={width} $maxWidth={maxWidth}>
      {label && (
        <S.FormLabel className="input-label" htmlFor={name + '-formInput'} required={required && !disabled}>
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
        {...register(name)}
      />
      <FormError errors={errors} name={name} />
    </S.FormInput>
  );
}

const StyledMotionInput = styled(motion.input)`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  display: block;
  height: 40px;
  width: 100%;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 16px;
  &:hover {
    background-color: ${(props) => props.theme.colors.blue};
  }
  &:focus {
    transition: 0.3s;
    border: 1px solid ${(props) => props.theme.colors.blue500};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    font-size: 14px;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;

const S = {
  FormInput: styled.div<{ $margin?: string; $horizontal?: boolean; $width?: string; $maxWidth?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};

    ${(props) =>
      props.$horizontal &&
      css`
        display: flex;
        align-items: center;
      `};
  `,
  FormLabel: styled.label<{ required?: boolean }>`
    color: ${({ theme }) => theme.colors.gray700};
    display: block;
    margin-bottom: 3px;
    font-size: 15px;
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
