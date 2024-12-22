import styled, { css } from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface FormErrorProps {
  name: string;
  errors: FieldErrors<FieldValues>;
  margin?: string;
}

export default function FormError({ name, errors, margin }: FormErrorProps) {
  return (
    <S.FormError $margin={margin}>
      <ErrorMessage errors={errors} name={name} />
    </S.FormError>
  );
}

const S = {
  FormError: styled.div<{ $margin?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '1px 0 0 0')};
    height: 15px;
    font-size: 13px;
    color: crimson;
  `,
};
