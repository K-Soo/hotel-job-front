import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues, PathValue } from 'react-hook-form';
import { motion } from 'framer-motion';
import { get } from 'lodash';
import Icon from '@/icons/Icon';
interface FormSelectProps<T> {
  name: Path<T>;
  label?: string;
  readOnly?: boolean;
  isFocusing?: boolean;
  required?: boolean;
  disabled?: boolean;
  margin?: string;
  width?: string;
  maxWidth?: string;
  options: { label: string; value: string }[];
  errorPosition?: 'absolute' | 'static';
}

export default function FormSelect<T extends FieldValues>({
  name,
  label,
  readOnly,
  isFocusing,
  required,
  disabled,
  margin,
  width,
  maxWidth,
  options,
  errorPosition,
}: FormSelectProps<T>) {
  const {
    formState: { errors },
    register,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useFormContext<T>();

  const watchValue = watch(name) || '';

  const error = get(errors, name);

  React.useEffect(() => {
    if (error && watchValue) {
      clearErrors(name);
    }
  }, [error, watchValue]);

  return (
    <S.FormSelect $margin={margin} $width={width} $maxWidth={maxWidth}>
      {label && (
        <StyledLabel className="input-label" htmlFor={name + '-formInput'} required={required && !disabled}>
          {label}
        </StyledLabel>
      )}

      <div className="form-select-container">
        <StyledMotionSelect
          disabled={disabled}
          {...(register(name),
          {
            onChange: (e) => {
              const value = e.target.value === '' ? null : e.target.value;
              setValue(name, value as PathValue<T, Path<T>>);
            },
          })}
          id={name + '-formInput'}
          value={watchValue}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledMotionSelect>
        <Icon className="form-select-icon" name="ArrowRight16x16" width="16px" height="16px" />
      </div>

      <FormError errors={errors} name={name} style={{ position: errorPosition }} />
    </S.FormSelect>
  );
}

const S = {
  FormSelect: styled.div<{ $margin?: string; $horizontal?: boolean; $width?: string; $maxWidth?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    color: ${({ theme }) => theme.colors.black500};
    .form-select-container {
      position: relative;
      .form-select-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: rotate(90deg);
        transform: translateY(-50%) rotate(90deg);
        color: ${({ theme }) => theme.colors.gray300};
        pointer-events: none;
      }
    }
  `,
};

const StyledLabel = styled.label<{ required?: boolean }>`
  display: block;
  margin-bottom: 3px;
  font-size: 14px;
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
  color: ${(props) => props.theme.colors.black500};
  position: relative;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.white};
  &:hover {
    transition: 0.3s;
    border: 1px solid ${({ theme }) => theme.colors.blue100};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.blue500};
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray};
  }
`;
