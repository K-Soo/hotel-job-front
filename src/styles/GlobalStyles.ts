import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';
import pretendard from '@/fonts/pretendard';

// BottomNavigation z-index: 5;
const GlobalStyle = createGlobalStyle`
  ${Reset}

  /* CSS Variables */
  :root {
    --background-color: #ffffff;
    --text-color: #171717;
    --font-family: ${pretendard.style.fontFamily}, Arial, sans-serif;
  }

  /* Global Element Styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
  }
  body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: var(--font-family);
    overflow-x: hidden;
  }

  button {
    all: unset;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:visited {
    color: inherit;
  }

  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
