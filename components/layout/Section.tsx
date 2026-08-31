'use client';

import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Container, Stack, Text } from '@/components/ui';

export type SectionBackground = 'default' | 'elevated' | 'accent';

export interface SectionProps {
  $background?: SectionBackground;
  id?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

const backgroundStyles = {
  default: css`
    background: ${({ theme }) => theme.colors.surface};
  `,
  elevated: css`
    background: ${({ theme }) => theme.colors.surfaceElevated};
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.primary};
  `,
};

const Wrapper = styled.section<{ $background: SectionBackground }>`
  padding-block: ${({ theme }) => theme.space[9]};
  scroll-margin-top: 96px;
  ${({ $background }) => backgroundStyles[$background]}
`;

export const Section = ({
  $background = 'default',
  id,
  eyebrow,
  heading,
  intro,
  align = 'left',
  children,
}: SectionProps) => {
  const headingColor = $background === 'accent' ? 'white' : 'ink';
  const introColor = $background === 'accent' ? 'white' : 'muted';
  const eyebrowColor = $background === 'accent' ? 'white' : 'primary';

  return (
    <Wrapper id={id} $background={$background}>
      <Container>
        <Stack $gap="8">
          {(eyebrow || heading || intro) && (
            <Stack
              $gap="3"
              $align={align === 'center' ? 'center' : 'stretch'}
              style={
                align === 'center'
                  ? { textAlign: 'center', marginInline: 'auto', maxWidth: 640 }
                  : undefined
              }
            >
              {eyebrow && (
                <Text $variant="eyebrow" $color={eyebrowColor}>
                  {eyebrow}
                </Text>
              )}
              {heading && (
                <Text $variant="h2" as="h2" $color={headingColor}>
                  {heading}
                </Text>
              )}
              {intro && (
                <Text $variant="bodyLg" $color={introColor}>
                  {intro}
                </Text>
              )}
            </Stack>
          )}
          {children}
        </Stack>
      </Container>
    </Wrapper>
  );
};
