'use client';

import styled from 'styled-components';

export const CardGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
