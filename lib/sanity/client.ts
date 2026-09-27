import { createClient } from '@sanity/client';
import { draftMode } from 'next/headers';

import { projectId, dataset, apiVersion, previewToken } from '@/lib/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Authenticated client reading the 'drafts' perspective — Sanity overlays
// each document's draft (if one exists) on top of its published version,
// keyed by the same _id, so existing GROQ queries work unchanged. Only used
// once Draft Mode is already on (see getSanityClient below); the route that
// turns Draft Mode on (app/api/draft-mode/enable) uses the plain `client`
// instead — see the comment there for why.
const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: previewToken,
  perspective: 'drafts',
});

// Server-only: call from a fetcher to pick the right client for the current
// request. Draft Mode is a per-browser cookie (next/headers `draftMode()`),
// so this "just works" for any page without threading a preview flag
// through every call site.
export const getSanityClient = async () => {
  const { isEnabled } = await draftMode();
  if (!isEnabled) {
    return { client, preview: false as const };
  }

  if (!previewToken) {
    throw new Error(
      'Draft Mode is enabled but SANITY_API_READ_TOKEN is not set — add it to .env.local to preview drafts.',
    );
  }

  return { client: previewClient, preview: true as const };
};
