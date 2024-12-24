import styled from 'styled-components';

interface MainProps {
  maxWidth?: string;
  padding?: string;
  children: React.ReactNode;
}

export function Main({ maxWidth, padding, children }: MainProps) {
  return <S.Main $maxWidth={maxWidth}>{children}</S.Main>;
}

const S = {
  Main: styled.main<{ $maxWidth?: string; $padding?: string }>`
    flex: 1;
    height: 100%;
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '1024px')};
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    ${(props) => props.theme.media.laptop`
      padding: 30px 15px 0 15px;
    `};
    padding: ${(props) => (props.$padding ? props.$padding : '30px 0 0 0')};
    & > section {
      flex: 1;
    }
  `,
};
