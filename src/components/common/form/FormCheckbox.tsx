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
}

export default function FormCheckbox<T extends FieldValues>({
  label,
  name,
  visibleIcon = true,
  margin,
  required,
  optional,
}: FormCheckboxProps<T>) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<T>();

  const watchValue = watch(name);
  const error = get(errors, name);

  return (
    <>
      <S.FormCheckbox $margin={margin} $active={!!watchValue}>
        <div className="wrapper">
          <input id={`FormCheckbox-${name}`} type="checkbox" checked={!!watchValue} {...register(name)} />
          <label htmlFor={`FormCheckbox-${name}`}>
            <p className="label-text">
              {required && <span className="label-text__required">[필수]</span>}
              {optional && <span className="label-text__optional">[선택]</span>}
              <span>{label}</span>
            </p>
          </label>
        </div>
        {visibleIcon && <i className="view">보기</i>}
      </S.FormCheckbox>
      {error && <FormError errors={errors} name={name} />}
    </>
  );
}

const S = {
  FormCheckbox: styled.div<{ $margin?: string; $active?: boolean }>`
    margin: ${(props) => props.$margin || 0};
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    font-size: 13px;
    cursor: pointer;
    .view {
      white-space: nowrap;
      margin-left: 10px;
      color: ${(props) => props.theme.colors.gray600};
      &:hover {
        text-decoration: underline;
        color: ${(props) => props.theme.colors.blue700};
        text-decoration: underline;
        cursor: pointer;
        font-weight: 400;
      }
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      line-height: 1.2;
      :hover {
        color: ${(props) => props.theme.colors.blue700};
      }
      .label-text {
        font-weight: 300;
        cursor: pointer;
        word-break: keep-all;
        ${(props) =>
          props.$active &&
          `
          color: ${props.theme.colors.blue700};
          font-weight: 400;
        `};
        &__required {
          color: ${(props) => props.theme.colors.blue700};
          padding-right: 2px;
        }
        &__optional {
          padding-right: 2px;
        }
      }

      input[type='checkbox'] {
        display: none;
      }

      label {
        position: relative;
        padding-left: 30px;
        min-height: 24px;
        color: ${(props) => props.theme.colors.gray700};
        display: flex;
        align-items: center;
        font-size: 13px;
      }

      label:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        border: 2px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
      }

      label:hover:before {
        border-color: #888;
        background-color: ${(props) => props.theme.colors.blue100};
        border: 2px solid ${(props) => props.theme.colors.blue700};
      }

      /* 체크된 상태 */
      input[type='checkbox']:checked + label:before {
        background-color: ${(props) => props.theme.colors.blue700};
        border: 2px solid ${(props) => props.theme.colors.blue700};
      }

      /* 체크된 상태 */
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
    }
  `,
};
