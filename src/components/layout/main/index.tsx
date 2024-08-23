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
    height: 2000px;
    max-width: 1080px;
    margin: 0 auto;
  `,
};
