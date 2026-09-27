'use client';

import styled from 'styled-components';

/**
 * Layout primitives that deliberately avoid the three-equal-columns grid.
 *
 * The site previously used one `CardGrid` (three equal `1fr` columns) for
 * services, blog posts and testimonials alike, which meant four consecutive
 * homepage sections shared an identical shape. These give each section its
 * own layout family while still collapsing to a single column on mobile.
 */

/**
 * Alternating asymmetric grid: rows run 7/5 then 5/7 across a 12 column
 * track, so no two adjacent rows share a rhythm. An odd final item spans
 * the full width rather than leaving a dead cell, which keeps the "N items
 * produce N cells, no gaps" rule intact for any number of children.
 */
export const AsymmetricGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(12, 1fr);

    > * {
      grid-column: span 6;
    }

    > *:nth-child(4n + 1) {
      grid-column: span 7;
    }

    > *:nth-child(4n + 2) {
      grid-column: span 5;
    }

    > *:nth-child(4n + 3) {
      grid-column: span 5;
    }

    > *:nth-child(4n) {
      grid-column: span 7;
    }

    /* An odd final item sits centred at a middling width, between the 7 and
       5 of the row above. Stretching it across the full row gave one
       service far more visual weight than the others, and matching the
       lead's 7 columns left it sitting lopsided against empty space. */
    > *:last-child:nth-child(odd) {
      grid-column: 4 / span 6;
    }
  }
`;

/**
 * Offset columns for short quotes. Even items sit lower than odd ones, so
 * the block reads as a considered wall rather than a row of equal boxes.
 * The offset is dropped on mobile, where a single column makes it noise.
 */
export const StaggeredGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: 1fr;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);

    > *:nth-child(even) {
      margin-top: ${({ theme }) => theme.space[7]};
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);

    > *:nth-child(even) {
      margin-top: 0;
    }

    /* On a three-up row, step the middle column instead. */
    > *:nth-child(3n + 2) {
      margin-top: ${({ theme }) => theme.space[7]};
    }
  }
`;

/**
 * Editorial split for a lead item: media on one side, copy on the other,
 * with the media taking the larger share. Stacks on mobile.
 */
export const LeadSplit = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: 1fr;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 7fr 5fr;
    gap: ${({ theme }) => theme.space[6]};
  }
`;

/**
 * A compact row for secondary items sitting under a lead. Two up rather
 * than three, so it never reads as the old equal-thirds grid.
 */
export const SecondaryRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
