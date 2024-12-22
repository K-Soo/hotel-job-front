import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';

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

  return (
    <S.FormInput $margin={margin} $horizontal={horizontal} $width={width}>
      {label && (
        <StyledLabel className="input-label" htmlFor={name + '-formInput'} required={required && !disabled}>
          {label}
        </StyledLabel>
      )}
      <StyledMotionInput
        id={name + '-formInput'}
        whileFocus={{
          transition: { duration: 0.3 },
          border: '1px solid #007bff',
          boxShadow: 'inset 0 0 0 1px #007bff',
        }}
        autoComplete="off"
        placeholder={placeholder}
        type={type || 'text'}
        readOnly={readOnly}
        {...register(name)}
      />
      <FormError errors={errors} name={name} />
    </S.FormInput>
  );
}

const S = {
  FormInput: styled.div<{ $margin?: string; $horizontal?: boolean; $width?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0 0 5px 0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    ${(props) =>
      props.$horizontal &&
      css`
        display: flex;
        align-items: center;
      `};
  `,
};

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

const StyledMotionInput = styled(motion.input)`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  display: block;
  height: 40px;
  width: 100%;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 16px;
  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    font-size: 14px;
  }
`;
