'use client';

import styled from 'styled-components';

export const TwoColumnGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[7]};
  grid-template-columns: 1fr;
  max-width: 960px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 3fr 2fr;
  }
`;
