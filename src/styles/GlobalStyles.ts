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
    -webkit-text-size-adjust: 100%; 
    text-size-adjust: 100%; //텍스트 크기를 자동으로 조정하지 않음
    /* overflow-x: hidden; sticky: x */
  }

  button, a {
  }


  button {
    all: unset;
    box-sizing: border-box;
    -webkit-tap-highlight-color: #e8f3ff; /* 하이라이트 제거 */
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
