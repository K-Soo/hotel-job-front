import { createGlobalStyle } from "styled-components";
// import "pretendard/dist/web/static/pretendard.css";
import Reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  :root {
    --background-color: #f7fafc;
    --text-color: #171717;
  }
 * {
   box-sizing: border-box;
   color: #171717;
 }
 body{
   background-color: #fafafafa;
 }
 a {
   text-decoration: none; /* 밑줄 제거 */
   color: inherit; /* 부모 요소의 색상 상속 */
 }
 
 a:visited {
   color: inherit; /* 방문한 링크 색상도 상속 */
 }
 
 a:hover,
 a:focus,
 a:active {
   text-decoration: none; /* 모든 상태에서 밑줄 제거 */
   color: inherit; /* 모든 상태에서 부모 요소의 색상 상속 */
 }
 
 button {
   all: unset; 
   display: inline-block;
   cursor: pointer;
 }
 
`;

export default GlobalStyle;
