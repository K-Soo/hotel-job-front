import styled from 'styled-components';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import FormError from '@/components/common/form/FormError';
import { get } from 'lodash';
import React from 'react';

interface FormRadioProps<T> {
  name: Path<T>;
  label: string;
  value: string;
  visibleIcon?: boolean;
  margin?: string;
}

export default function FormRadio<T extends FieldValues>({ label, name, margin, value }: FormRadioProps<T>) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<T>();

  const watchValue = watch(name);
  const error = get(errors, name);

  return (
    <S.FormRadio $margin={margin} $active={watchValue === value}>
      <div className="wrapper">
        <input id={`FormRadio-${name}-${value}`} type="radio" checked={watchValue === value} {...register(name)} value={value} />
        <label htmlFor={`FormRadio-${name}-${value}`}>
          <span>{label}</span>
        </label>
      </div>

      {error && <FormError errors={errors} name={name} />}
    </S.FormRadio>
  );
}

const S = {
  FormRadio: styled.div<{ $margin?: string; $active?: boolean }>`
    margin: ${(props) => props.$margin || 0};
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    font-size: 13px;
    cursor: pointer;
    border-radius: 4px;

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1.2;
      cursor: pointer;
      :hover {
        color: ${(props) => props.theme.colors.blue700};
        cursor: pointer;
      }

      input[type='radio'] {
        display: none;
      }

      label {
        position: relative;
        padding-left: 30px;
        min-height: 24px;
        font-weight: 300;
        color: ${(props) => props.theme.colors.gray700};
        display: flex;
        align-items: center;
        font-size: 13px;
        ${(props) =>
          props.$active &&
          `
          color: ${props.theme.colors.blue700};
          font-weight: 400;
        `};
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
        border-radius: 50%;
        cursor: pointer;
      }

      label:hover:before {
        border-color: #888;
        background-color: ${(props) => props.theme.colors.blue100};
        border: 2px solid ${(props) => props.theme.colors.blue700};
      }

      /* 체크된 상태 */
      input[type='radio']:checked + label:before {
        border: 2px solid ${(props) => props.theme.colors.blue700};
      }

      /* 체크된 상태 */
      input[type='radio']:checked + label:after {
        content: '';
        position: absolute;
        left: 4px;
        top: 50%;
        transform: translateY(-50%);
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.colors.blue700};
        cursor: pointer;
      }
    }
  `,
};
