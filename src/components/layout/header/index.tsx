import styled from "styled-components";
import Navigation from "@/components/layout/header/Navigation";
import UtilityMenu from "@/components/layout/header/UtilityMenu";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <S.Header>
      <UtilityMenu />
      <Navigation />
    </S.Header>
  );
}

const S = {
  Header: styled.header`
    border: 1px solid red;
    position: sticky;
    top: -30px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.9);
  `,
};
