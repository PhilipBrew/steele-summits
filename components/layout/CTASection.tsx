'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Container, Stack, Text } from '@/components/ui';

export interface CTASectionProps {
  heading: string;
  body?: string;
  actions: ReactNode;
}

const Wrapper = styled.section`
  padding-block: ${({ theme }) => theme.space[8]};
  background: linear-gradient(
    120deg,
    ${({ theme }) => theme.colors.primaryDark} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
`;

export const CTASection = ({ heading, body, actions }: CTASectionProps) => (
  <Wrapper>
    <Container>
      <Stack
        $gap="5"
        $align="center"
        style={{ textAlign: 'center', marginInline: 'auto', maxWidth: 640 }}
      >
        <Text $variant="h1" as="h2" $color="white">
          {heading}
        </Text>
        {body && (
          <Text $variant="bodyLg" $color="white">
            {body}
          </Text>
        )}
        <Stack $direction="row" $gap="3" $wrap $justify="center">
          {actions}
        </Stack>
      </Stack>
    </Container>
  </Wrapper>
);
