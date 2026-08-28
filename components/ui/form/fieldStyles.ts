import { css } from 'styled-components';

export const fieldStyles = css`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(169, 103, 59, 0.25);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surfaceElevated};
    cursor: not-allowed;
  }
`;
