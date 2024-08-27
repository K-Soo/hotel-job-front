import styled from "styled-components";

interface HomeProps {}

export default function Home({}: HomeProps) {
  return <S.Home>Home</S.Home>;
}

const S = {
  Home: styled.section`
    border: 1px solid red;
  `,
};
