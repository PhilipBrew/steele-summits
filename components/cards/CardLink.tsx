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

  /* Transform and box-shadow only, so hover stays on the compositor and
     never reflows the grid around it. */
  transition:
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  ${CardLink}:hover & {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.cardElevated};
  }

  ${CardLink}:active & {
    transform: translateY(-1px);
  }

  ${CardLink}:focus-visible & {
    box-shadow: ${({ theme }) => theme.shadows.cardElevated};
  }

  img {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${CardLink}:hover & img {
    transform: scale(1.04);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${CardLink}:hover &,
    ${CardLink}:active & {
      transform: none;
    }

    img,
    ${CardLink}:hover & img {
      transition: none;
      transform: none;
    }
  }
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
