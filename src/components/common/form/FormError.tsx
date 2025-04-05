import styled, { css } from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { get } from 'lodash';

interface FormErrorProps {
  name: string;
  errors: FieldErrors<FieldValues>;
  margin?: string;
  style?: React.CSSProperties;
}

export default function FormError({ name, errors, margin, style }: FormErrorProps) {
  const type = get(errors, `${name}.type`);

  return (
    <S.FormError $margin={margin} style={style} $type={type}>
      <ErrorMessage errors={errors} name={name} />
    </S.FormError>
  );
}

const S = {
  FormError: styled.div<{ $margin?: string; $type?: any }>`
    height: 20px;
    font-size: 13px;
    color: red;
    font-weight: 500;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: absolute;
    ${(props) =>
      props.$type === 'available' &&
      css`
        font-size: 13px;
        color: #36b700;
        font-weight: 500;
      `};
  `,
};
