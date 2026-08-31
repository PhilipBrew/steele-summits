import Link from 'next/link';
import { Button, Stack, Text } from '@/components/ui';
import { Section } from '@/components/layout';

// Used for a notFound() call from a route matched within this (site) group
// (e.g. a bad service/blog slug). No chrome here — (site)/layout.tsx already
// wraps this in SiteChrome, since the parent layout keeps rendering around a
// bubbled-up not-found boundary rather than being bypassed.
const SiteNotFound = () => (
  <Section $background="default">
    <Stack
      $gap="5"
      $align="center"
      style={{ textAlign: 'center', marginInline: 'auto', maxWidth: 480 }}
    >
      <Text $variant="display" as="h1" $color="primary">
        404
      </Text>
      <Text $variant="h3" as="h2">
        Off the marked path
      </Text>
      <Text $variant="bodyLg" $color="muted">
        We can&apos;t find the page you&apos;re looking for. It may have been
        moved, or the link might be out of date.
      </Text>
      <Stack $direction="row" $gap="3" $wrap $justify="center">
        <Link href="/">
          <Button $variant="primary">Back to home</Button>
        </Link>
        <Link href="/services">
          <Button $variant="outline">Browse services</Button>
        </Link>
      </Stack>
    </Stack>
  </Section>
);

export default SiteNotFound;
