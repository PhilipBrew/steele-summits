'use client';

import { useState, type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';

import { StyledComponentsRegistry } from '@/styles/registry';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { createQueryClient } from '@/lib/query-client';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(createQueryClient);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};
