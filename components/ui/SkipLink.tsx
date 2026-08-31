'use client';

import styled from 'styled-components';

// Visually hidden until it receives keyboard focus, at which point it's the
// first thing a keyboard/screen-reader user encounters — lets them jump
// straight past the header nav to the page content.
export const SkipLink = styled.a`
  position: absolute;
  top: -100%;
  left: ${({ theme }) => theme.space[4]};
  z-index: 100;
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[5]};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:focus-visible {
    top: ${({ theme }) => theme.space[4]};
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
