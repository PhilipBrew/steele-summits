'use client';

import styled from 'styled-components';

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 1.125rem;
  height: 1.125rem;
  accent-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
