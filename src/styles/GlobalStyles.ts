import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';
import pretendard from '@/fonts/pretendard';

// DaumPost z-index: 10;
// BottomNavigation z-index: 10;
// Header z-index: 5;
// AccountBottomSheet z-index: 10;
// ProductOptionAsideMenu z-index: 10;
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
    user-select: none;
  }

  html {
    overflow-x: hidden;
    /* scrollbar-gutter: stable; //스크롤바 공간 예약 */
  }
  body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-family: var(--font-family);
    -webkit-text-size-adjust: 100%; 
    text-size-adjust: 100%; //텍스트 크기를 자동으로 조정하지 않음
    /* overflow-x: hidden; sticky: x */
  }

  textarea {  
    font-family: var(--font-family);
    line-height: 1.5;
  }

  button {
    all: unset;
    box-sizing: border-box;
    -webkit-tap-highlight-color: #e8f3ff; 
  }
  select {
    outline: none; /* 기본 포커스 스타일 제거 */
    all: unset;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
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
