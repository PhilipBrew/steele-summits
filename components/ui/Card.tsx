'use client';

import styled, { css } from 'styled-components';

export type CardVariant = 'default' | 'elevated' | 'accent';

export interface CardProps {
  $variant?: CardVariant;
}

const variantStyles = {
  default: css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.ink};
    box-shadow: ${({ theme }) => theme.shadows.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
  `,
  elevated: css`
    background: ${({ theme }) => theme.colors.surfaceElevated};
    color: ${({ theme }) => theme.colors.ink};
    box-shadow: ${({ theme }) => theme.shadows.card};
    border: 1px solid ${({ theme }) => theme.colors.border};
  `,
  accent: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.shadows.cardElevated};
    border: 1px solid ${({ theme }) => theme.colors.primaryDark};
  `,
};

export const Card = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[5]};

  ${({ $variant = 'default' }) => variantStyles[$variant]}
`;
