import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues, useFieldArray } from 'react-hook-form';
import { get } from 'lodash';
import ChipsCheckbox from '@/components/common/style/ChipsCheckbox';
import { allJobs, AllJobsKeyValuesKeys } from '@/constants/job';

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
}: FormArrayCheckboxProps<T>) {
  const {
    formState: { errors },
    watch,
    clearErrors,
  } = useFormContext<T>();

  const { fields, remove } = useFieldArray({ name });
  const watchValue = watch(name) || [];

  const error = get(errors, name);

  React.useEffect(() => {
    if (error && watchValue.length !== 0) {
      clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchValue]);

  return (
    <S.FormArrayCheckbox $margin={margin} $width={width} $maxWidth={maxWidth} $minWidth={minWidth}>
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
      <S.CheckboxContainer>
        <div className="content-list">
          {watchValue.map((item: AllJobsKeyValuesKeys) => (
            <ChipsCheckbox
              key={item}
              label={allJobs[item]}
              name={item}
              onChange={() => {}}
              margin="0 15px 0 0"
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
    height: 40px;
    flex: 1;
    .content-list {
      box-sizing: border-box;
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      height: 100%;
      padding-left: 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }
  `,
};
