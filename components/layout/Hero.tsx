'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';
import {
  Container,
  Stack,
  Text,
  LandscapeBanner,
  SanityImage,
  type LandscapeScene,
} from '@/components/ui';
import type { SanityImageWithAlt } from '@/lib/sanity/types';

export interface HeroProps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  actions?: ReactNode;
  align?: 'left' | 'center';
  $scene?: LandscapeScene;
  $size?: 'lg' | 'md';
  heroImage?: SanityImageWithAlt | null;
}

// Height is viewport-relative rather than a fixed 640px, so the hero always
// leaves room for the CTAs plus a hint of the section below, instead of
// eating a laptop viewport whole. dvh (not vh) so mobile browser chrome
// appearing and disappearing doesn't cause a jump.
const Wrapper = styled.section<{ $size: 'lg' | 'md' }>`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  min-height: ${({ $size }) =>
    $size === 'lg'
      ? 'clamp(30rem, 78dvh, 44rem)'
      : 'clamp(22rem, 52dvh, 30rem)'};
  padding-block: ${({ theme }) => theme.space[8]};
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ $size }) =>
      $size === 'lg'
        ? 'clamp(26rem, 68dvh, 34rem)'
        : 'clamp(20rem, 44dvh, 26rem)'};
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[8]};
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    0deg,
    rgba(15, 20, 15, 0.78) 0%,
    rgba(15, 20, 15, 0.42) 45%,
    rgba(15, 20, 15, 0.08) 75%
  );
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const HeadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.space[2]};
  }
`;

const Heading = styled(Text)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
`;

// Deliberately wide rather than a narrow asymmetric column. A narrower
// column does not save vertical space, it costs it: the same intro copy
// wraps into more lines and pushes the CTAs further down, which works
// against keeping the hero short enough to show the next section. 47.5rem
// still caps the measure so the copy never runs uncomfortably wide on a
// large display.
const ContentStack = styled(Stack)<{ $centered: boolean }>`
  max-width: 47.5rem;
  margin-inline: ${({ $centered }) => ($centered ? 'auto' : '0')};
  text-align: ${({ $centered }) => ($centered ? 'center' : 'left')};
`;

export const Hero = ({
  eyebrow,
  heading,
  intro,
  actions,
  align = 'left',
  $scene = 'fells',
  $size = 'lg',
  heroImage,
}: HeroProps) => (
  <Wrapper $size={$size}>
    {heroImage?.asset ? (
      <SanityImage
        image={heroImage}
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />
    ) : (
      <LandscapeBanner $scene={$scene} />
    )}
    <Scrim />
    <Content>
      <Container>
        <ContentStack
          $gap="5"
          $align={align === 'center' ? 'center' : 'stretch'}
          $centered={align === 'center'}
        >
          <HeadingGroup>
            {eyebrow && (
              <Text $variant="eyebrow" $color="white">
                {eyebrow}
              </Text>
            )}
            <Heading $variant="display" as="h1" $color="white">
              {heading}
            </Heading>
          </HeadingGroup>
          {intro && (
            <Text $variant="bodyLg" $color="white">
              {intro}
            </Text>
          )}
          {actions && (
            <Stack $direction="row" $gap="3" $wrap>
              {actions}
            </Stack>
          )}
        </ContentStack>
      </Container>
    </Content>
  </Wrapper>
);
