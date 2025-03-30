import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import media from './media';
import colors from './colors';

interface ThemeProps {
  children: React.ReactNode;
}

const theme: DefaultTheme = {
  colors,
  media,
};

export default function Theme({ children }: ThemeProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
