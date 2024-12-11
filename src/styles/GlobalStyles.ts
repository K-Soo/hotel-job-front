import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';
import pretendard from '@/fonts/pretendard';

const GlobalStyle = createGlobalStyle`
  ${Reset}

  /* CSS Variables */
  :root {
    --background-color: #f7fafc;
    --text-color: #171717;
    --font-family: ${pretendard.style.fontFamily}, Arial, sans-serif;
  }

  /* Global Element Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Structural Element Styles */
  body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: var(--font-family);
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
