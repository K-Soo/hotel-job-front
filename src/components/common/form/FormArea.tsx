import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';
import { get } from 'lodash';

interface FormAreaProps<T> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  width?: string;
  maxWidth?: string;
  isFocusing?: boolean;
}

export default function FormArea<T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  maxLength,
  width,
  maxWidth,
  isFocusing,
}: FormAreaProps<T>) {
  const {
    formState: { errors },
    register,
    setFocus,
    watch,
    clearErrors,
  } = useFormContext<T>();

  const watchValue = watch(name);

  React.useEffect(() => {
    if (isFocusing) {
      setFocus(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusing]);

  const error = get(errors, name);

  return (
    <S.FormArea $width={width} $maxWidth={maxWidth}>
      {label && (
        <StyledLabel className="input-label" htmlFor={name + '-form-area'} required={required && !disabled}>
          {label}
        </StyledLabel>
      )}
      <StyledTextArea id={name + '-form-area'} maxLength={maxLength} {...register(name)} disabled={disabled} />
      {error && <FormError errors={errors} name={name} />}
    </S.FormArea>
  );
}

const S = {
  FormArea: styled.div<{ $margin?: string; $width?: string; $maxWidth?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0 0 10px 0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
  `,
};

const StyledTextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  display: block;
  height: 140px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  padding: 15px;
  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    font-size: 14px;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;

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
