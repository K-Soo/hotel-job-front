import styled from "styled-components";

interface MainProps {}

export function Main({}: MainProps) {
  return <S.Main>Main</S.Main>;
}

const S = {
  Main: styled.main`
    background-color: gainsboro;
    height: 2000px;
    max-width: 1080px;
    margin: 0 auto;
  `,
};
