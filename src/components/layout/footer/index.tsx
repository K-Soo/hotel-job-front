import styled from "styled-components";

interface FooterProps {}

export function Footer({}: FooterProps) {
  return <S.Footer>Footer</S.Footer>;
}

const S = {
  Footer: styled.footer`
    height: 100px;
    background-color: gray;
  `,
};
