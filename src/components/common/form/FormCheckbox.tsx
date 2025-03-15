import styled from 'styled-components';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import FormError from '@/components/common/form/FormError';
import { get } from 'lodash';
import React from 'react';
interface FormCheckboxProps<T> {
  name: Path<T>;
  label: string;
  visibleIcon?: boolean;
  margin?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  handleClickIcon?: (value: string) => void;
}

export default function FormCheckbox<T extends FieldValues>({
  label,
  name,
  visibleIcon = true,
  margin,
  required,
  optional,
  disabled,
  handleClickIcon,
}: FormCheckboxProps<T>) {
  const {
    register,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<T>();

  const watchValue = watch(name);

  const error = get(errors, name);

  React.useEffect(() => {
    if (error && watchValue) {
      clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, watchValue]);

  React.useEffect(() => {
    if (error) {
      const label = document.querySelector(`[for="form-checkbox-${name}"]`);
      if (label) {
        (label as HTMLElement).focus();
      }
    }
  }, [error, name]);

  return (
    <S.FormCheckbox $margin={margin}>
      <S.CheckBoxContainer $active={!!watchValue}>
        <div>
          <input id={`form-checkbox-${name}`} type="checkbox" {...register(name)} disabled={disabled} />

          <label className="form-label" htmlFor={`form-checkbox-${name}`} tabIndex={0}>
            <p className="form-label__wrapper">
              {required && <span className="form-label__wrapper--required">[필수]</span>}
              {optional && <span className="form-label__wrapper--optional">[선택]</span>}
              <span>{label}</span>
            </p>
          </label>
        </div>
        {visibleIcon && (
          <S.ViewIcon
            onClick={() => {
              if (handleClickIcon) {
                handleClickIcon(name);
              }
            }}
          >
            보기
          </S.ViewIcon>
        )}
      </S.CheckBoxContainer>

      <FormError errors={errors} name={name} style={{ position: 'absolute' }} />
    </S.FormCheckbox>
  );
}

const S = {
  FormCheckbox: styled.div<{ $margin?: string; $active?: boolean }>`
    margin: ${(props) => props.$margin || 0};
  `,
  CheckBoxContainer: styled.div<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    user-select: none;
    /* &:hover {
      color: ${(props) => props.theme.colors.blue700};
    } */
    input[type='checkbox'] {
      display: none;
    }
    input[type='checkbox']:checked + label:before {
      background-color: ${(props) => props.theme.colors.blue700};
      border: 2px solid ${(props) => props.theme.colors.blue700};
    }

    input[type='checkbox']:checked + label:after {
      content: '';
      position: absolute;
      left: 3px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 17px;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 16.2l-5.2-5.2L3 12.8l6 6 12-12-1.4-1.4-10.6 10.8z"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    input[type='checkbox']:disabled + label:before {
      background-color: ${(props) => props.theme.colors.gray100};
      border: 2px solid ${(props) => props.theme.colors.gray300};
    }

    input[type='checkbox']:disabled:checked + label:before {
      background-color: ${(props) => props.theme.colors.blue700};
      border: 2px solid ${(props) => props.theme.colors.blue700};
      opacity: 0.7;
    }

    .form-label {
      position: relative;
      padding-left: 30px;
      min-height: 24px;
      color: ${(props) => props.theme.colors.gray700};
      display: flex;
      align-items: center;
      font-size: 13px;
      cursor: pointer;

      &__wrapper {
        font-weight: 300;
        word-break: keep-all;

        ${(props) =>
          props.$active &&
          `
          color: ${props.theme.colors.blue700};
          font-weight: 400;
        `};
        &--required {
          color: ${(props) => props.theme.colors.blue700};
          padding-right: 2px;
        }
        &--optional {
          padding-right: 2px;
        }
      }
    }

    .form-label:before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 22px;
      height: 22px;
      border: 2px solid #ccc;
      border-radius: 5px;
    }

    .form-label:hover:before {
      border-color: #888;
      background-color: ${(props) => props.theme.colors.blue100};
      border: 2px solid ${(props) => props.theme.colors.blue700};
    }
  `,
  ViewIcon: styled.i`
    white-space: nowrap;
    margin-left: 10px;
    color: ${(props) => props.theme.colors.gray600};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.colors.blue700};
      text-decoration: underline;
      font-weight: 400;
    }
  `,
};
