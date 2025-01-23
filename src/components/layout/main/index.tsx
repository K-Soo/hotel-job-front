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
    padding: ${(props) => (props.$padding ? props.$padding : '30px 0 30px 0')};
    ${(props) => props.theme.media.laptop`
      padding: 15px 15px 0 15px;
    `};
    ${(props) => props.theme.media.tablet`
      padding: 15px 15px 100px 15px;
    `};
    & > section {
      flex: 1;
    }
  `,
};
