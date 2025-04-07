import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues, PathValue } from 'react-hook-form';
import { motion } from 'framer-motion';
import { get } from 'lodash';
import Icon from '@/icons/Icon';
interface FormMapSelectProps<T> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  margin?: string;
  width?: string;
  maxWidth?: string;
  options: Record<string, string>;
  position?: 'absolute' | 'static';
}

export default function FormMapSelect<T extends FieldValues>({
  name,
  label,
  required,
  disabled,
  margin,
  width,
  maxWidth,
  options,
  position,
}: FormMapSelectProps<T>) {
  const {
    formState: { errors },
    register,
    watch,
    setValue,
    clearErrors,
  } = useFormContext<T>();
  const selectRef = React.useRef<HTMLSelectElement | null>(null);
  const watchValue = watch(name) || '';

  const error = get(errors, name);

  React.useEffect(() => {
    if (error) {
      selectRef.current?.focus();
    }
  }, [error]);

  return (
    <S.FormMapSelect $margin={margin} $width={width} $maxWidth={maxWidth}>
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
              const inputValue = e.target.value;
              const value = inputValue === '' ? null : inputValue;
              setValue(name, value as PathValue<T, Path<T>>);
              if (error) {
                clearErrors(name);
              }
            },
          })}
          id={name + '-formInput'}
          value={watchValue}
          ref={selectRef}
        >
          {Object.entries(options).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </StyledMotionSelect>
        <Icon className="form-select-icon" name="ArrowRight16x16" width="16px" height="16px" />
      </div>
      <FormError errors={errors} name={name} style={{ position: 'static' }} />
    </S.FormMapSelect>
  );
}

const S = {
  FormMapSelect: styled.div<{ $margin?: string; $horizontal?: boolean; $width?: string; $maxWidth?: string }>`
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
  padding-bottom: 4px;
  font-size: 16px;
  cursor: default;
  white-space: nowrap;
  margin-right: 15px;
  color: ${({ theme }) => theme.colors.black400};
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
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.white};
  &:hover {
    transition: 0.3s;
    border: 1px solid ${({ theme }) => theme.colors.blue100};
  }
  &:focus {
    transition: 0.3s;
    border: 1px solid ${(props) => props.theme.colors.blue500};
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.colors.blue500};
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray};
  }
`;
