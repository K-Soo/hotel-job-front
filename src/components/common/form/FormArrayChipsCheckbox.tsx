import React from 'react';
import styled, { css } from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { get } from 'lodash';
import ChipsCheckbox from '@/components/common/style/ChipsCheckbox';

interface FormArrayChipsCheckboxProps<T> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  labelFlexBasis?: string;
  readOnly?: boolean;
  disabled?: boolean;
  onClickInputForm?: () => void;
  placeholder?: string;
  optionsKeyData: Record<string, string>;
}

export default function FormArrayChipsCheckbox<T extends FieldValues>({
  label,
  labelFlexBasis,
  readOnly,
  required,
  name,
  disabled,
  onClickInputForm,
  optionsKeyData,
  placeholder,
}: FormArrayChipsCheckboxProps<T>) {
  const {
    formState: { errors },
    watch,
    clearErrors,
    setValue,
    register,
  } = useFormContext<T>();

  const watchValue = watch(name) || [];
  const error = get(errors, name);

  React.useEffect(() => {
    if (error && watchValue.length !== 0) {
      clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchValue, error]);

  // XXX - UI상으로 목록내에서 체크해제 불가능하게
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = watchValue.filter((item) => item !== event.target.name);
  //   setValue(name, inputValue as PathValue<T, Path<T>>);
  // };

  return (
    <S.FormArrayChipsCheckbox>
      {label && (
        <S.FormLabel
          className="input-label"
          htmlFor={'form-array-chips-checkbox' + name}
          required={required && !readOnly}
          labelFlexBasis={labelFlexBasis}
          tabIndex={1}
        >
          {label}
        </S.FormLabel>
      )}
      <div className="chips-container">
        <input
          type="text"
          id={'form-array-chips-checkbox' + name}
          readOnly
          onClick={() => {
            if (disabled) return;
            onClickInputForm?.();
          }}
          {...(register(name),
          {
            placeholder: watchValue.length === 0 ? placeholder : undefined,
          })}
        />

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

        <FormError errors={errors} name={name} style={{ position: 'absolute', bottom: '-14px' }} />
      </div>
    </S.FormArrayChipsCheckbox>
  );
}

const S = {
  FormArrayChipsCheckbox: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    .chips-container {
      min-height: 40px;
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      input {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
        background-color: #ffffff;
        border: 1px solid ${({ theme }) => theme.colors.gray300};
        color: ${({ theme }) => theme.colors.black500};
        &:hover {
          border: 1px solid ${(props) => props.theme.colors.blue100};
        }
        &::placeholder {
          color: ${(props) => props.theme.colors.gray400};
          font-size: 14px;
          font-weight: 400;
          padding-left: 10px;
        }
        &:focus {
          transition: 0.3s;
          border: 1px solid ${(props) => props.theme.colors.blue500};
        }
        &:disabled {
          border: 1px solid ${({ theme }) => theme.colors.gray300};
          background-color: ${(props) => props.theme.colors.gray};
          pointer-events: none;
        }
      }
    }
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
};
