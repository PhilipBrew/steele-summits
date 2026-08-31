import Link from 'next/link';
import { AppProviders } from '@/components/providers/AppProviders';
import { Button, Stack, Text } from '@/components/ui';
import { Section, SiteChrome } from '@/components/layout';

// Root-level fallback for a URL that matches no route at all (not even
// inside the (site) group) — app/(site)/not-found.tsx handles a notFound()
// call from within a matched (site) route instead, relying on that group's
// own layout for chrome. Wrapping in SiteChrome here (rather than reusing
// (site)/layout.tsx, which isn't in this file's tree) is what's needed —
// nothing else provides Header/Footer for a path this unmatched.
const NotFound = () => (
  <AppProviders>
    <SiteChrome>
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
            We can&apos;t find the page you&apos;re looking for. It may have
            been moved, or the link might be out of date.
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
    </SiteChrome>
  </AppProviders>
);

export default NotFound;
