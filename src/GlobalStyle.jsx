import { styled, createGlobalStyle } from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    height: 100vh;
  }
`;

export default GlobalStyle;