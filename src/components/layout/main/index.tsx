import styled from "styled-components";

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return <S.Main>{children}</S.Main>;
}

const S = {
  Main: styled.main`
    flex: 1;
    height: 100%;
    max-width: 1080px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    background-color: white;
    & > section {
      flex: 1;
    }
  `,
};
