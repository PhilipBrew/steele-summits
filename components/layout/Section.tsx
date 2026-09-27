'use client';

import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Container, Stack, Text } from '@/components/ui';

export type SectionBackground = 'default' | 'elevated' | 'contrast' | 'accent';

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
  // A visibly darker neutral than 'elevated' — for a section that needs to
  // read as clearly separate from a 'default' section sitting right next to
  // it, without reaching for the green 'accent' treatment.
  contrast: css`
    background: ${({ theme }) => theme.colors.border};
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.primary};
  `,
};

// Section padding was previously a flat 96px top and bottom at every
// viewport, which was both unresponsive (96px is a lot of a phone screen)
// and optically static. clamp() scales it with the viewport, and the bottom
// runs slightly heavier than the top so a heading reads as belonging to the
// content below it rather than floating between two equal voids.
const Wrapper = styled.section<{ $background: SectionBackground }>`
  padding-block: clamp(3rem, 7vw, 5.5rem) clamp(3.5rem, 8vw, 6.5rem);
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
        <Stack $gap="6">
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
