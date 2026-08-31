'use client';

import { useEffect } from 'react';
import { Button, Stack, Text } from '@/components/ui';
import { Section } from '@/components/layout';

interface SiteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const SiteError = ({ error, reset }: SiteErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section $background="default">
      <Stack
        $gap="5"
        $align="center"
        style={{ textAlign: 'center', marginInline: 'auto', maxWidth: 480 }}
      >
        <Text $variant="eyebrow" $color="primary">
          Something went wrong
        </Text>
        <Text $variant="h1" as="h1">
          We hit an unexpected error
        </Text>
        <Text $variant="bodyLg" $color="muted">
          Please try again — if it keeps happening, get in touch and let us know
          what you were doing.
        </Text>
        <Stack $direction="row" $gap="3" $wrap $justify="center">
          <Button $variant="primary" type="button" onClick={reset}>
            Try again
          </Button>
        </Stack>
      </Stack>
    </Section>
  );
};

export default SiteError;
