import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background-color: #000000;
    background-image: url("/header.svg"), url("/footer.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top left, bottom right;
  }
`;

export default GlobalStyles;