import styled from 'styled-components';

interface MainProps {
  maxWidth?: string;
  children: React.ReactNode;
}

export function Main({ maxWidth, children }: MainProps) {
  return <S.Main $maxWidth={maxWidth}>{children}</S.Main>;
}

const S = {
  Main: styled.main<{ $maxWidth?: string }>`
    flex: 1;
    height: 100%;
    max-width: ${(props) => (props.$maxWidth ? props.$maxWidth : '1024px')};
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 30px;
    ${(props) => props.theme.media.laptop`
      padding: 30px 15px 0 15px;
    `};
    & > section {
      flex: 1;
    }
  `,
};
