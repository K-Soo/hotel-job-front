import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues, PathValue } from 'react-hook-form';
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
  errorPosition?: 'absolute' | 'static';
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
  errorPosition,
}: FormNumberInputProps<T>) {
  const {
    formState: { errors },
    register,
    setFocus,
    watch,
    clearErrors,
    setValue,
    getValues,
  } = useFormContext<T>();

  const error = get(errors, name);

  const watchValue = watch(name) ?? 0;

  React.useEffect(() => {
    if (isFocusing) {
      setFocus(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusing]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    if (isComma) {
      // isComma가 true인 경우 콤마를 제거
      inputValue = inputValue.replace(/,/g, '');
    }

    if (/^0[0-9]+/.test(inputValue)) {
      inputValue = inputValue.replace(/^0+/, '');
    }

    const numericValue = inputValue === '' || isNaN(Number(inputValue)) ? 0 : inputValue;
    setValue(name, numericValue as PathValue<T, Path<T>>); // 상태 저장
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // 커서를 항상 `0`의 왼쪽으로 이동
    if (inputValue === '0') {
      event.target.setSelectionRange(0, 0);
    }
  };

  const handleValidation = () => {
    // 벨리데이션 시 콤마 제거
    const currentValue = getValues(name);
    if (isComma) {
      const numericValue = String(currentValue).replace(/,/g, '');
      setValue(name, Number(numericValue) as PathValue<T, Path<T>>, { shouldValidate: true });
    }
  };

  return (
    <S.FormNumberInput $margin={margin} $width={width} $maxWidth={maxWidth} $minWidth={minWidth}>
      {label && (
        <S.FormLabel className="input-label" htmlFor={name + '-Form-number-Input'} required={required && !readOnly}>
          {label}
        </S.FormLabel>
      )}
      <div className="input-container">
        <StyledMotionInput
          id={name + '-Form-number-Input'}
          autoComplete="off"
          placeholder={placeholder}
          type="text"
          readOnly={readOnly}
          disabled={disabled}
          value={isComma ? priceComma(watchValue) : watchValue}
          maxLength={maxLength}
          onFocus={handleInputFocus}
          {...register(name, {
            onChange: handleInputChange,
            valueAsNumber: isComma ? false : true,
            onBlur: handleValidation,
          })}
        />
        <span className="unit">{unit}</span>
      </div>
      <FormError errors={errors} name={name} style={{ position: errorPosition }} />
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
    color: ${({ theme }) => theme.colors.black400};
    display: block;
    margin-bottom: 3px;
    font-size: 16px;
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
