import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { Reset as StyledReset } from "styled-reset";
import styledMedia from "./Media";

interface ThemeProps {
  children: React.ReactNode;
}

//rgba(0, 0, 0, .08);
const colors = {
  gray100: "rgba(0, 0, 0, 0.05)",
  gray200: "rgba(0, 0, 0, 0.05)",
  gray300: "rgba(0, 0, 0, 0.05)",
  gray400: "rgba(0, 0, 0, 0.05)",
  gray500: "rgba(0, 0, 0, 0.05)",
  gray600: "rgba(0, 0, 0, 0.05)",
  gray700: "rgba(0, 0, 0, 0.05)",
  gray800: "rgba(0, 0, 0, 0.05)",
  gray: "hsla(0,0%,92%,1)",
};

export default function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={styledMedia}>
      <GlobalStyles />
      <StyledReset />
      {children}
    </ThemeProvider>
  );
}
