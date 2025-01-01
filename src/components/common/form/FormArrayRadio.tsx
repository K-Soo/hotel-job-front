import React from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import FormError from '@/components/common/form/FormError';
import { motion } from 'framer-motion';

interface FormArrayRadioProps<T> {
  name: Path<T>;
  options: { label: string; value: string }[];
}

export default function FormArrayRadio<T extends FieldValues>({ name, options }: FormArrayRadioProps<T>) {
  const {
    watch,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext<T>();

  const watchValue = watch(name);

  React.useEffect(() => {
    if (watchValue && watchValue.length !== 0) {
      clearErrors(name);
    }
  }, [clearErrors, name, watchValue]);

  const handleClickOption = (value: string) => {
    setValue(name, value as PathValue<T, Path<T>>);
  };

  return (
    <S.FormArrayRadio>
      <div className="salary-list">
        {options.map((element) => (
          <motion.div
            key={element.value}
            className="item"
            onClick={() => handleClickOption(element.value)}
            animate={watchValue === element.value ? { backgroundColor: '#3182f6', color: '#FFFFFF' } : undefined}
            transition={{ duration: 0 }}
          >
            {element.label}
          </motion.div>
        ))}
      </div>
      <FormError errors={errors} name={name} style={{ position: 'absolute' }} />
    </S.FormArrayRadio>
  );
}

const S = {
  FormArrayRadio: styled.div`
    width: 100%;
    .salary-list {
      display: flex;
      height: 40px;
    }
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${(props) => props.theme.colors.gray400};
      color: ${(props) => props.theme.colors.gray700};
      font-size: 14px;
      cursor: pointer;
    }
    .item:not(:first-child) {
      border-left: none;
    }
    .item:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .item:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  `,
};
