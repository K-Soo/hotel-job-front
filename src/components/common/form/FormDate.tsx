import React from 'react';
import styled, { css } from 'styled-components';
import DatePicker, { DatePickerProps, registerLocale } from 'react-datepicker';
import FormError from '@/components/common/form/FormError';
import { get } from 'lodash';
import { useFormContext, Path, FieldValues, Controller, useController } from 'react-hook-form';
import { ko } from 'date-fns/locale/ko';
import { format } from 'date-fns';
registerLocale('ko', ko);

import 'react-datepicker/dist/react-datepicker.css';

interface FormDateProps<T> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  margin?: string;
  width?: string;
  maxWidth?: string;
  placeholder?: string;
}

export default function FormDate<T extends FieldValues>({
  name,
  label,
  disabled,
  required,
  margin,
  maxWidth,
  width,
  placeholder,
}: FormDateProps<T>) {
  const {
    formState: { errors },
    control,
    clearErrors,
    watch,
  } = useFormContext<T>();
  const {
    field: { value },
  } = useController({ name, control });
  const selectedDate = value ? new Date(value) : null;

  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const datePickerRef = React.useRef<DatePicker | null>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const error = get(errors, name);

  React.useEffect(() => {
    if (error) {
      if (datePickerRef.current) {
        datePickerRef.current.setFocus();
      }
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }
  }, [error]);

  return (
    <S.FormDate $margin={margin} $width={width} $maxWidth={maxWidth} ref={containerRef}>
      {label && (
        <StyledLabel className="input-label" htmlFor={name + '-form-date'} required={required && !disabled}>
          {label}
        </StyledLabel>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          console.log('field: ', field);
          return (
            <DatePicker
              {...field}
              id={name + '-form-date'}
              tabIndex={-1}
              selected={selectedDate}
              onChange={(date) => {
                field.onChange(date);
                setIsCalendarOpen(false);
                clearErrors(name);
              }}
              placeholderText={placeholder}
              disabled={disabled}
              autoComplete="off"
              locale="ko"
              // minDate={minDate ? startAt : undefined}
              maxDate={new Date()}
              dateFormat="yyy.MM.dd"
              showYearDropdown
              open={isCalendarOpen}
              ref={datePickerRef}
              onInputClick={() => setIsCalendarOpen(true)}
              onClickOutside={() => setIsCalendarOpen(false)}
              readOnly
              value={field.value ? format(new Date(field.value), 'yyyy.MM.dd') : ''}
            />
          );
        }}
      />

      <FormError errors={errors} name={name} style={{ position: 'absolute' }} />
    </S.FormDate>
  );
}

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #5e9ed6;
  }
`;

const S = {
  FormDate: styled.div<{ $margin?: string; $width?: string; $maxWidth?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    .react-datepicker-wrapper {
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      width: 100%;
      height: 40px;
      cursor: pointer;
      .react-datepicker__input-container {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        input {
          all: unset;
          border: none;
          font-size: 14px;
          padding-left: 10px;
          margin: 0;
          height: 100%;
          &::placeholder {
            color: ${(props) => props.theme.colors.gray400};
            font-size: 14px;
          }
        }
      }
    }
  `,
};

const StyledLabel = styled.label<{ required?: boolean }>`
  color: ${({ theme }) => theme.colors.gray700};
  display: block;
  margin-bottom: 3px;
  font-size: 15px;
  cursor: default;
  white-space: nowrap;
  margin-right: 15px;
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
`;

const StyledDatePicker = styled(DatePicker)`
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  height: 40px;
  width: 100%;
  max-width: 100%;
  border-radius: 5px;
  cursor: pointer;
  padding-left: 15px;
  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    font-size: 14px;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;
