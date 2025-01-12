import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues, PathValue, useController } from 'react-hook-form';
import { motion } from 'framer-motion';
import { get } from 'lodash';
import { priceComma } from '@/utils';

interface FormNumberInputProps<T> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  isFocusing?: boolean;
  required?: boolean;
  disabled?: boolean;
  margin?: string;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  unit: string;
  maxLength?: number;
  isComma?: boolean;
}

export default function FormNumberInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  readOnly,
  isFocusing,
  required,
  disabled,
  margin,
  width,
  maxWidth,
  minWidth,
  unit,
  maxLength,
  isComma,
}: FormNumberInputProps<T>) {
  const [inputValue, setInputValue] = React.useState('0');

  const {
    formState: { errors },
    register,
    setFocus,
    watch,
    clearErrors,
    setValue,
  } = useFormContext<T>();

  const {
    field: { value },
  } = useController({ name });

  const watchValue = watch(name);

  React.useEffect(() => {
    setInputValue(value);
  }, [watchValue]);

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

  // 내부 상태로 렌더링 값을 관리

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log('value: ', value);

    const rawValue = event.target.value.replace(/,/g, ''); // 쉼표 제거
    console.log('rawValue: ', rawValue);
    setInputValue(isComma ? priceComma(rawValue) : rawValue); // 내부 상태 업데이트
    setValue(name, rawValue as PathValue<T, Path<T>>); // 폼 상태 업데이트
  };

  return (
    <S.FormNumberInput $margin={margin} $width={width} $maxWidth={maxWidth} $minWidth={minWidth}>
      {label && (
        <S.FormLabel className="input-label" htmlFor={name + '-FormNumberInput'} required={required && !readOnly}>
          {label}
        </S.FormLabel>
      )}
      <div className="input-container">
        <StyledMotionInput
          id={name + '-FormNumberInput'}
          autoComplete="off"
          placeholder={placeholder}
          type="text"
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          maxLength={maxLength}
          {...register(name, {
            onChange: handleInputChange,
            valueAsNumber: true,
          })}
        />
        <span className="unit">{unit}</span>
      </div>
      {error && <FormError errors={errors} name={name} style={{ position: 'absolute' }} />}
    </S.FormNumberInput>
  );
}

const StyledMotionInput = styled(motion.input)<{ readOnly?: boolean; disabled?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  display: block;
  height: 40px;
  width: 100%;
  padding-left: 10px;
  padding-right: 30px;
  border-radius: 5px;
  font-size: 16px;
  text-align: right;
  font-size: 14px;
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
    font-size: 14px;
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
  FormNumberInput: styled.div<{ $margin?: string; $horizontal?: boolean; $width?: string; $maxWidth?: string; $minWidth?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    min-width: ${(props) => (props.$minWidth ? props.$minWidth : 'auto')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    .input-container {
      position: relative;
      .unit {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 13px;
        color: ${({ theme }) => theme.colors.gray600};
      }
    }
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
