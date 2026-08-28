'use client';

import styled from 'styled-components';

export const Label = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;
