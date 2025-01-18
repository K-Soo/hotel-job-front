import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useFormContext, Path, FieldValues, PathValue } from 'react-hook-form';
import FormError from '@/components/common/form/FormError';
import { get } from 'lodash';

interface FormToggleProps<T> {
  name: Path<T>;
  label?: string;
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export default function FormToggle<T extends FieldValues>({ label, name }: FormToggleProps<T>) {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<T>();

  const value = watch(name);

  const handleToggleChange = () => {
    setValue(name, !value as PathValue<T, Path<T>>);
  };

  const error = get(errors, name);

  return (
    <S.FormToggle $isToggle={value}>
      <div className="switch" onClick={handleToggleChange}>
        <motion.div className="handle" layout transition={spring} layoutId={name} />
      </div>
      {label && <span className="toggle-label">{label}</span>}

      {error && <FormError errors={errors} name={name} />}
    </S.FormToggle>
  );
}

const S = {
  FormToggle: styled.div<{ $isToggle: boolean }>`
    margin-top: 15px;
    width: fit-content;
    display: flex;
    align-items: center;
    .toggle-label {
      font-size: 14px;
      padding-left: 8px;
      white-space: nowrap;
      color: ${(props) => props.theme.colors.gray700};
    }
    .switch {
      width: 50px;
      height: 24px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, 0.4);
      background-color: ${(props) => props.theme.colors.gray200};
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 50px;
      padding: 3px 5px;
      cursor: pointer;
      ${(props) =>
        props.$isToggle &&
        `
          justify-content: flex-end;
          background-color: ${props.theme.colors.blue600};
      `}
    }
    .handle {
      width: 18px;
      height: 18px;
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 0 3px #00000020;
    }
  `,
};
