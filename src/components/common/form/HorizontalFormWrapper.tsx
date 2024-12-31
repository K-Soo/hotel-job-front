import styled from 'styled-components';

interface HorizontalFormWrapperProps {
  children: React.ReactNode;
}

export default function HorizontalFormWrapper({ children }: HorizontalFormWrapperProps) {
  return <S.HorizontalFormWrapper>{children}</S.HorizontalFormWrapper>;
}

const S = {
  HorizontalFormWrapper: styled.div`
    padding: 15px 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray300};
  `,
};
