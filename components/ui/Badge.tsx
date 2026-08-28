'use client';

import styled, { css } from 'styled-components';

export type BadgeVariant =
  'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BadgeProps {
  $variant?: BadgeVariant;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.white};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.white};
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.ink};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
  `,
  neutral: css`
    background: ${({ theme }) => theme.colors.surfaceElevated};
    color: ${({ theme }) => theme.colors.ink};
  `,
};

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: 0.04em;
  text-transform: uppercase;

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
`;
