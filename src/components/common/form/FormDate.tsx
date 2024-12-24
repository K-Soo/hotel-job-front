import styled, { css } from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import FormError from '@/components/common/form/FormError';
import { useFormContext, Path, FieldValues } from 'react-hook-form';
import { get } from 'lodash';

import 'react-datepicker/dist/react-datepicker.css';

interface FormDateProps<T> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  margin?: string;
  width?: string;
  maxWidth?: string;
}

export default function FormDate<T extends FieldValues>({ name, label, disabled, required, margin, maxWidth, width }: FormDateProps<T>) {
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
      <StyledDatePicker
      // placeholderText="날짜를 선택해주세요."
      // locale={ko}
      //  timeIntervals={60}
      //  selected={selectedDate}
      //  showTimeSelect={showTimeSelect}
      //  showYearDropdown
      // minDate={minDate ? startAt : undefined}
      // maxDate={maxDate ? endAt : undefined}
      // dateFormat={showTimeSelect ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'}
      // selected={selectedDate}
      // showTimeSelect={showTimeSelect}
      // showYearDropdown
      />
      {error && <FormError errors={errors} name={name} />}
    </S.FormDate>
  );
}

const S = {
  FormDate: styled.div<{ $margin?: string; $width?: string; $maxWidth?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '0 0 10px 0')};
    width: ${(props) => (props.$width ? props.$width : '100%')};
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '100%')};
    .react-datepicker-wrapper {
      width: 100%;
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
