'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Card, Text } from '@/components/ui';

// Wraps a Card in a Link while keeping the card itself as a flex column
// that fills the grid cell's full stretched height — lets every card in a
// row line up to the same height regardless of content length, matching
// how TestimonialCard already behaves as a direct grid child.
export const CardLink = styled(Link)`
  display: flex;
  height: 100%;
`;

export const StretchCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  width: 100%;
`;

export const ReadMore = styled(Text).attrs({
  $variant: 'bodySm',
  as: 'span',
})`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space[2]};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;
