import styled from "styled-components";
import Navigation from "@/components/layout/header/Navigation";
import UtilityMenu from "@/components/layout/header/UtilityMenu";
import { motion, useScroll } from "framer-motion";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const { scrollYProgress, scrollX, scrollY } = useScroll();
  console.log("scrollY: ", scrollY);
  console.log("scrollYProgress: ", scrollYProgress);

  return (
    <S.Header initial={{ borderBottom: "0px solid transparent" }}>
      <UtilityMenu />
      <Navigation />
    </S.Header>
  );
}

const S = {
  Header: styled(motion.header)`
    position: sticky;
    top: -30px;
    background-color: rgba(255, 255, 255);
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  `,
};
