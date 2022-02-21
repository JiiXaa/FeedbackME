// Global styles for styled-components

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Cabin', sans-serif;
  }

  button {
      font-family: inherit;
  }
`;

export default GlobalStyle;
