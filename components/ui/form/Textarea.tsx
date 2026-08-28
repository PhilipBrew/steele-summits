'use client';

import styled from 'styled-components';
import { fieldStyles } from './fieldStyles';

export const Textarea = styled.textarea`
  ${fieldStyles}
  min-height: 8rem;
  resize: vertical;
`;
