import styled from "styled-components";

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return <S.Main>{children}</S.Main>;
}

const S = {
  Main: styled.main`
    background-color: gainsboro;
    max-width: 1080px;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    border: 1px solid red;
    flex: 1;
  `,
};
