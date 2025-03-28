import styled from 'styled-components';

interface MainProps {
  maxWidth?: string;
  padding?: string;
  children: React.ReactNode;
}

export function Main({ maxWidth, padding, children }: MainProps) {
  return (
    <S.Main $maxWidth={maxWidth} $padding={padding}>
      {children}
    </S.Main>
  );
}

const S = {
  Main: styled.main<{ $maxWidth?: string; $padding?: string }>`
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '1024px')};
    padding: ${(props) => (props.$padding ? props.$padding : '30px 0 30px 0')};
    flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    ${(props) =>
      !props.$padding &&
      props.theme.media.laptop`
        padding: 15px 15px 0 15px;
      `};
    ${(props) =>
      !props.$padding &&
      props.theme.media.tablet`
        padding: 15px 15px 100px 15px;
      `};

    & > section {
      flex: 1;
    }
  `,
};
