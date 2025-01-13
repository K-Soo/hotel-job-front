import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues, useFieldArray } from 'react-hook-form';
import { get } from 'lodash';
import ChipsCheckbox from '@/components/common/style/ChipsCheckbox';

interface FormArrayCheckboxProps<T> {
  name: Path<T>;
  label?: string;
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
  optionsKeyData: Record<string, string>;
}

export default function FormArrayCheckbox<T extends FieldValues>({
  name,
  disabled,
  horizontal,
  isFocusing,
  label,
  labelFlexBasis,
  margin,
  mask,
  maxLength,
  minWidth,
  readOnly,
  required,
  type,
  width,
  maxWidth,
  optionsKeyData,
}: FormArrayCheckboxProps<T>) {
  const {
    formState: { errors },
    watch,
    clearErrors,
    setFocus,
  } = useFormContext<T>();

  const watchValue = watch(name) || [];

  const error = get(errors, name);

  React.useEffect(() => {
    if (error && watchValue.length !== 0) {
      clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchValue]);

  React.useEffect(() => {
    if (error) {
      const label = document.querySelector(`[for="form-input-b-${name}"]`);
      if (label) {
        (label as HTMLElement).focus();
      }
    }
  }, [error, name]);

  return (
    <S.FormArrayCheckbox $margin={margin} $width={width} $maxWidth={maxWidth} $minWidth={minWidth}>
      {label && (
        <S.FormLabel
          className="input-label"
          htmlFor={'form-input-b-' + name}
          required={required && !readOnly}
          labelFlexBasis={labelFlexBasis}
          tabIndex={1}
        >
          {label}
        </S.FormLabel>
      )}
      <S.CheckboxContainer>
        <div className="content-list">
          {watchValue.map((item) => (
            <ChipsCheckbox
              key={item}
              label={optionsKeyData[item]}
              name={item}
              onChange={() => {}}
              margin="3px"
              value={item}
              checked
              disabled={disabled}
            />
          ))}
        </div>
        <FormError errors={errors} name={name} style={{ position: 'absolute' }} />
      </S.CheckboxContainer>
    </S.FormArrayCheckbox>
  );
}

const S = {
  FormArrayCheckbox: styled.div<{
    $margin?: string;
    $maxWidth?: string;
    $minWidth?: string;
    $width?: string;
  }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    min-width: ${(props) => (props.$minWidth ? props.$minWidth : 'auto')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    display: flex;
    align-items: center;
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
  CheckboxContainer: styled.div`
    box-sizing: border-box;
    flex: 1;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    .content-list {
      flex: 1;
      min-height: 40px;
      box-sizing: border-box;
      height: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 5px;
    }
  `,
};
