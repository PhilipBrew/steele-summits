'use client';

import styled, { css } from 'styled-components';

export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bodyLg'
  | 'body'
  | 'bodySm'
  | 'caption'
  | 'eyebrow';

export type TextColor = 'ink' | 'muted' | 'primary' | 'accent' | 'white';

export interface TextProps {
  $variant?: TextVariant;
  $color?: TextColor;
  $align?: 'left' | 'center' | 'right';
}

const variantStyles = {
  display: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    letter-spacing: -0.01em;
  `,
  h1: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    line-height: ${({ theme }) => theme.lineHeights.heading};
    letter-spacing: -0.01em;
  `,
  h2: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    line-height: ${({ theme }) => theme.lineHeights.heading};
    letter-spacing: -0.01em;
  `,
  h3: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    line-height: ${({ theme }) => theme.lineHeights.heading};
  `,
  h4: css`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    line-height: ${({ theme }) => theme.lineHeights.heading};
  `,
  bodyLg: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: ${({ theme }) => theme.lineHeights.body};
  `,
  body: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.body};
  `,
  bodySm: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.body};
  `,
  caption: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.body};
  `,
  eyebrow: css`
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    letter-spacing: 0.12em;
    text-transform: uppercase;
  `,
};

const colorStyles = {
  ink: css`
    color: ${({ theme }) => theme.colors.ink};
  `,
  muted: css`
    color: ${({ theme }) => theme.colors.muted};
  `,
  primary: css`
    color: ${({ theme }) => theme.colors.primary};
  `,
  accent: css`
    color: ${({ theme }) => theme.colors.accent};
  `,
  white: css`
    color: ${({ theme }) => theme.colors.white};
  `,
};

export const Text = styled.p<TextProps>`
  margin: 0;
  ${({ $variant = 'body' }) => variantStyles[$variant]}
  ${({ $color = 'ink' }) => colorStyles[$color]}
  ${({ $align }) =>
    $align &&
    css`
      text-align: ${$align};
    `}
`;
