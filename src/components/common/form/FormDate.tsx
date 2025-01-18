import styled, { css } from 'styled-components';
import DatePicker, { DatePickerProps, registerLocale } from 'react-datepicker';
import FormError from '@/components/common/form/FormError';
import { get } from 'lodash';
import { useFormContext, Path, FieldValues, Controller } from 'react-hook-form';
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
    register,
    setFocus,
    watch,
    clearErrors,
  } = useFormContext<T>();

  const error = get(errors, name);

  return (
    <S.FormDate $margin={margin} $width={width} $maxWidth={maxWidth}>
      {label && (
        <StyledLabel className="input-label" htmlFor={name + '-formInput'} required={required && !disabled}>
          {label}
        </StyledLabel>
      )}
      <Controller
        name={name}
        // control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value} // React Hook Form의 값 연결
            onChange={(date) => field.onChange(date)} // 선택한 값 변경
            placeholderText={placeholder}
            disabled={disabled}
            autoComplete="off"
            // disabled={disabled}
            // locale={ko}
            //  timeIntervals={60}
            //  selected={selectedDate}
            //  showTimeSelect={showTimeSelect}
            //  showYearDropdown
            // minDate={minDate ? startAt : undefined}
            maxDate={new Date()}
            dateFormat="yyy.MM.dd"
            // selected={selectedDate}
            // showTimeSelect={showTimeSelect}
            // showYearDropdown
          />
        )}
      />
      <FormError errors={errors} name={name} style={{ position: 'absolute' }} />
    </S.FormDate>
  );
}

const S = {
  FormDate: styled.div<{ $margin?: string; $width?: string; $maxWidth?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    /* overflow: hidden; */
    /* padding: 0 15px; */
    .react-datepicker-wrapper {
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      width: 100%;
      height: 40px;
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

const StyledDatePicker = styled(DatePicker)<DatePickerProps>`
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
