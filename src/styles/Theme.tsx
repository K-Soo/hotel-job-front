import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { Reset as StyledReset } from "styled-reset";

interface ThemeProps {
  children: React.ReactNode;
}

export default function Theme({ children }: ThemeProps) {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      <StyledReset />
      {children}
    </ThemeProvider>
  );
}
