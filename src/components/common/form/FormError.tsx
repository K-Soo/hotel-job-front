import styled, { css } from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface FormErrorProps {
  name: string;
  errors: FieldErrors<FieldValues>;
  margin?: string;
  style?: React.CSSProperties;
}

export default function FormError({ name, errors, margin, style }: FormErrorProps) {
  return (
    <S.FormError $margin={margin} style={style}>
      <ErrorMessage errors={errors} name={name} />
    </S.FormError>
  );
}

const S = {
  FormError: styled.div<{ $margin?: string }>`
    margin: ${(props) => (props.$margin ? props.$margin : '1.5px 0 0 0')};
    height: 12px;
    font-size: 11px;
    color: crimson;
  `,
};
