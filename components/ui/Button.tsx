'use client';

import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $fullWidth?: boolean;
}

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[5]};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  lg: css`
    padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryDark};
      box-shadow: ${({ theme }) => theme.shadows.glow};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surfaceElevated};
    color: ${({ theme }) => theme.colors.ink};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.border};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.ink};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceElevated};
      border-color: ${({ theme }) => theme.colors.muted};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease,
    color 0.15s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size = 'md' }) => sizeStyles[$size]}
  ${({ $variant = 'primary' }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;
