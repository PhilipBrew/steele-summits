'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Stack, Text } from '@/components/ui';

export interface SplitContentProps {
  eyebrow?: string;
  heading: string;
  body: string;
  actions?: ReactNode;
  media: ReactNode;
  $reverse?: boolean;
}

const Grid = styled.div<{ $reverse: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.space[7]};
  align-items: center;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }

  > *:first-child {
    order: 2;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      order: ${({ $reverse }) => ($reverse ? 2 : 1)};
    }
  }

  > *:last-child {
    order: 1;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      order: ${({ $reverse }) => ($reverse ? 1 : 2)};
    }
  }
`;

export const SplitContent = ({
  eyebrow,
  heading,
  body,
  actions,
  media,
  $reverse = false,
}: SplitContentProps) => (
  <Grid $reverse={$reverse}>
    <Stack $gap="4">
      {eyebrow && (
        <Text $variant="eyebrow" $color="primary">
          {eyebrow}
        </Text>
      )}
      <Text $variant="h2" as="h2">
        {heading}
      </Text>
      <Text $variant="bodyLg" $color="muted">
        {body}
      </Text>
      {actions && (
        <Stack $direction="row" $gap="3" $wrap>
          {actions}
        </Stack>
      )}
    </Stack>
    {media}
  </Grid>
);
