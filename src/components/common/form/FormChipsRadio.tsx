import React from 'react';
import styled, { css } from 'styled-components';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { motion } from 'framer-motion';
import useDidMountEffect from '@/hooks/useDidMountEffect';

interface FormChipsRadioProps<T> {
  name: Path<T>;
  label?: string;
  value: string;
  margin?: string;
  disabled?: boolean;
  palette: 'blue' | 'green' | 'gray';
  index?: string;
}

export default function FormChipsRadio<T extends FieldValues>({
  name,
  value,
  disabled,
  label,
  margin,
  palette,
  index,
}: FormChipsRadioProps<T>) {
  const { register, watch } = useFormContext<T>();

  const watchValue = watch(name);
  const isActive = watchValue === value;
  const ref = React.useRef<HTMLDivElement | null>(null);

  useDidMountEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [isActive]);

  return (
    <S.FormChipsRadio $margin={margin} $active={watchValue === value} $palette={palette} ref={ref} whileTap={{ scale: 0.98 }}>
      <input id={`FormChipsRadio-${value}-${index}`} type="radio" {...register(name)} value={value} />
      <label htmlFor={`FormChipsRadio-${value}-${index}`}>{label}</label>
    </S.FormChipsRadio>
  );
}

const S = {
  FormChipsRadio: styled(motion.div)<{ $margin?: string; $active?: boolean; $palette: 'blue' | 'green' | 'gray' }>`
    display: inline-block;
    white-space: nowrap;
    margin: ${(props) => props.$margin || 0};
    input[type='radio'] {
      display: none;
    }

    input[type='radio'] + label {
      display: block;
      border: 1px solid ${(props) => props.theme.colors.gray400};
      background-color: ${(props) => props.theme.colors.gray200};
      background-color: #ffffff;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      height: 100%;
      ${(props) =>
        props.$palette === 'blue' &&
        css`
          border: 1px solid ${(props) => props.theme.colors.blue200};
          color: ${(props) => props.theme.colors.blue500};
        `};

      ${(props) =>
        props.$palette === 'green' &&
        css`
          border: 1px solid ${(props) => props.theme.colors.green100};
          color: ${(props) => props.theme.colors.green600};
        `};

      ${(props) =>
        props.$palette === 'gray' &&
        css`
          border: 1px solid ${(props) => props.theme.colors.gray500};
          color: ${(props) => props.theme.colors.gray600};
        `};
    }

    input[type='radio']:checked + label {
      background-color: ${(props) => props.theme.colors.blue700};
      border: 1px solid ${(props) => props.theme.colors.blue700};
      color: #ffffff;
      ${(props) =>
        props.$palette === 'blue' &&
        css`
          border: 1px solid ${(props) => props.theme.colors.blue500};
          color: ${(props) => props.theme.colors.white};
          background-color: ${(props) => props.theme.colors.blue500};
        `};

      ${(props) =>
        props.$palette === 'green' &&
        css`
          border: 1px solid ${(props) => props.theme.colors.green500};
          color: ${(props) => props.theme.colors.white};
          background-color: ${(props) => props.theme.colors.green500};
        `};

      ${(props) =>
        props.$palette === 'gray' &&
        css`
          border: 1px solid ${(props) => props.theme.colors.gray700};
          color: ${(props) => props.theme.colors.white};
          background-color: ${(props) => props.theme.colors.gray700};
        `};
    }
  `,
};
