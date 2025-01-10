import styled from 'styled-components';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import FormError from '@/components/common/form/FormError';
import { get } from 'lodash';
import React from 'react';
import Icon from '@/icons/Icon';

interface FormChipsCheckboxProps<T> {
  name: Path<T>;
  label: string;
}

export default function FormChipsCheckbox<T extends FieldValues>({ name, label }: FormChipsCheckboxProps<T>) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<T>();

  // const watchValue = watch(name);
  const error = get(errors, name);

  return (
    <S.FormChipsCheckbox>
      <S.FormChipsContainer>
        {/* <Icon name="CheckOn16x17" width="16px" height="16px" /> */}
        <input id={`FormChipsCheckbox-${name}`} type="checkbox" {...register(name)} />
        <label htmlFor={`FormChipsCheckbox-${name}`}>{label}</label>
      </S.FormChipsContainer>
      {error && <FormError errors={errors} name={name} />}
    </S.FormChipsCheckbox>
  );
}

const S = {
  FormChipsCheckbox: styled.div`
    /* border: 1px solid red; */
  `,
  FormChipsContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    user-select: none;
    input[type='checkbox'] {
      display: none;
    }

    svg {
      fill: #fff;
    }

    input[type='checkbox'] + label {
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid ${(props) => props.theme.colors.gray400};
      padding: 0 5px 0 30px;
      max-width: 130px;
      width: 100%;
      border-radius: 30px;
      background-color: ${(props) => props.theme.colors.gray200};
      background-color: #ffffff;
      cursor: pointer;
      height: 100%;
    }

    input[type='checkbox']:checked + label {
      background-color: ${(props) => props.theme.colors.blue700};
      border: 1px solid ${(props) => props.theme.colors.blue700};
      color: #ffffff;
    }

    input[type='checkbox'] + label:before {
      content: '';
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 17px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 16.2l-5.2-5.2L3 12.8l6 6 12-12-1.4-1.4-10.6 10.8z"/></svg>');
    }
  `,
};
