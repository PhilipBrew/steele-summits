'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';
import {
  Container,
  Stack,
  Text,
  LandscapeBanner,
  type LandscapeScene,
} from '@/components/ui';

export interface HeroProps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  actions?: ReactNode;
  align?: 'left' | 'center';
  $scene?: LandscapeScene;
  $size?: 'lg' | 'md';
}

const Wrapper = styled.section<{ $size: 'lg' | 'md' }>`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  min-height: ${({ $size }) => ($size === 'lg' ? '640px' : '420px')};
  padding-block: ${({ theme }) => theme.space[8]};
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ $size }) => ($size === 'lg' ? '520px' : '380px')};
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

export const Hero = ({
  eyebrow,
  heading,
  intro,
  actions,
  align = 'left',
  $scene = 'fells',
  $size = 'lg',
}: HeroProps) => (
  <Wrapper $size={$size}>
    <LandscapeBanner $scene={$scene} />
    <Scrim />
    <Content>
      <Container>
        <Stack
          $gap="5"
          $align={align === 'center' ? 'center' : 'stretch'}
          style={
            align === 'center'
              ? { textAlign: 'center', marginInline: 'auto', maxWidth: 760 }
              : { maxWidth: 760 }
          }
        >
          {eyebrow && (
            <Text $variant="eyebrow" $color="white">
              {eyebrow}
            </Text>
          )}
          <Text $variant="display" as="h1" $color="white">
            {heading}
          </Text>
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
        </Stack>
      </Container>
    </Content>
  </Wrapper>
);
