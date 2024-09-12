import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  button {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }

  body {
    background-color: ${({ theme }) => theme['zinc-950']};
    color: ${({ theme }) => theme['zinc-50']};
    -webkit-font-smoothing: antialiased;
  }

  #root, html, body {
    height: 100%;
  }
`;
