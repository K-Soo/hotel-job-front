import styled, { css } from 'styled-components';

interface HorizontalFormWrapperProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  border?: string;
  position?: string;
  style?: React.CSSProperties;
}

export default function HorizontalFormWrapper({ label, required, border, children, position, style }: HorizontalFormWrapperProps) {
  return (
    <S.HorizontalFormWrapper $border={border} $position={position} style={style}>
      {label && <S.FormLabel required={required}>{label}</S.FormLabel>}
      {children}
    </S.HorizontalFormWrapper>
  );
}

const S = {
  HorizontalFormWrapper: styled.div<{ $border?: string; $position?: string }>`
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
    border-bottom: ${(props) => props.$border};
    position: ${(props) => props.$position};
    display: flex;
    align-items: center;
    min-height: 70px;
  `,
  FormLabel: styled.span<{ required?: boolean }>`
    color: ${({ theme }) => theme.colors.gray700};
    white-space: nowrap;
    font-size: 14px;
    flex-basis: 150px;
    flex-shrink: 0;
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
  `,
};
