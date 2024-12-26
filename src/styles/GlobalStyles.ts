import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';
import pretendard from '@/fonts/pretendard';

// DaumPost z-index: 10;
// BottomNavigation z-index: 10;
// Header z-index: 5;
// AccountBottomSheet z-index: 10;
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
    /* overflow-x: hidden; sticky: x */
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
  input:focus {
    outline: none;
  }
`;

export default GlobalStyle;
