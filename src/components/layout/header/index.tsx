import styled from "styled-components";
import Navigation from "@/components/layout/header/Navigation";
import PromotionBanner from "@/components/layout/header/PromotionBanner";
import UtilityMenu from "@/components/layout/header/UtilityMenu";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <S.Header>
      <PromotionBanner />
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
  `,
};
