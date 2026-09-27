import { defineEnableDraftMode } from 'next-sanity/draft-mode';

import { client } from '@/lib/sanity/client';
import { previewToken } from '@/lib/sanity/env';

// Visited from the "Preview" button in Sanity Studio (see
// sanity/actions/PreviewAction.tsx), which mints a short-lived, one-time
// secret stored in the dataset itself rather than a static shared secret —
// so there's nothing here that could leak from Studio's public JS bundle.
// See https://github.com/sanity-io/preview-url-secret.
//
// Deliberately the plain `client` (not lib/sanity/client's drafts-perspective
// previewClient): the secret document lives only as a draft — it's never
// published — but a request that carries a token already sees drafts by
// default without needing an explicit 'drafts' perspective, and this matches
// the pattern next-sanity's own docs show.
//
// The cast below works around a version-skew artifact, not a real type
// mismatch: next-sanity@13.3.4's published .d.ts was compiled against its
// own bundled @sanity/client@7.x (still nested in node_modules, since other
// sanity-ecosystem packages pin ^7.x too), while this project's own
// @sanity/client is v8 (required by sanity@6.11.0). TypeScript treats the
// two SanityClient classes as nominally distinct because of their private
// fields, even though both are the same shape at runtime.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: previewToken }) as unknown as Parameters<
    typeof defineEnableDraftMode
  >[0]['client'],
});
