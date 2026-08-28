'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.body};
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }
`;
