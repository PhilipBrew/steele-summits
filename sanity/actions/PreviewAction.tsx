import { useCallback, useState } from 'react';
// Imported from its own subpath rather than the package root: the root
// barrel's exports changed shape between @sanity/icons patch releases
// (5.2.1 -> 5.2.2 dropped per-icon named exports from it), but each icon's
// own subpath is a stable, explicitly documented entry in its package.json.
import { EyeOpenIcon } from '@sanity/icons/EyeOpen';
import { createPreviewSecret } from '@sanity/preview-url-secret/create-secret';
import {
  urlSearchParamPreviewPathname,
  urlSearchParamPreviewSecret,
} from '@sanity/preview-url-secret/constants';
import { useClient, useCurrentUser } from 'sanity';
import type { DocumentActionComponent } from 'sanity';

import { apiVersion } from '@/lib/sanity/env';

// Only document types with a slug-based frontend page can be previewed —
// keep in sync with the slug -> path mapping the site itself uses
// (lib/sanity/fetchers.ts / app/api/draft-mode/enable).
const PATH_PREFIX_BY_TYPE: Record<string, string> = {
  blogPost: '/blog',
  service: '/services',
};

interface SlugDocument {
  slug?: { current?: string };
}

// Adds a "Preview" button (alongside Publish/Discard etc.) that opens the
// live site showing this document's unpublished content, via Draft Mode
// (see app/api/draft-mode/enable). Only shown once there's actually
// something unpublished to see: a brand-new draft, or a published document
// with edits since — not for a document that's fully in sync with what's
// already live.
//
// Named in PascalCase (unusual for a plain function, but matches every
// other document action in the Sanity ecosystem): Sanity calls this like a
// component on every render of the document pane's action bar, and it
// calls hooks — react-hooks/rules-of-hooks only recognises that as valid
// for names starting with an uppercase letter or "use".
export const PreviewAction: DocumentActionComponent = props => {
  const { type, draft, published } = props;
  const client = useClient({ apiVersion });
  const currentUser = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const pathPrefix = PATH_PREFIX_BY_TYPE[type];
  const slug = ((draft ?? published) as SlugDocument | null)?.slug?.current;

  const handle = useCallback(async () => {
    if (!pathPrefix || !slug) return;
    setIsLoading(true);

    try {
      const path = `${pathPrefix}/${slug}`;
      // Matches sanity.config.ts's basePath — informational only (surfaced
      // back via validatePreviewUrl's studioOrigin), not used for routing.
      const studioUrl = `${window.location.origin}/studio`;
      // No 5th argument: that's the _id for the new secret document
      // createPreviewSecret creates (as "drafts.<id>"), which defaults to
      // a fresh random uuid if omitted. Passing this document's own `id`
      // here (an earlier mistake) pointed it at "drafts.<this document's
      // id>" — a draft that already exists as a blogPost/service, so the
      // write failed: "immutable attribute _type may not be modified".
      const { secret } = await createPreviewSecret(
        client,
        path,
        studioUrl,
        currentUser?.id,
      );

      const previewUrl = new URL(
        '/api/draft-mode/enable',
        window.location.origin,
      );
      previewUrl.searchParams.set(urlSearchParamPreviewSecret, secret);
      previewUrl.searchParams.set(urlSearchParamPreviewPathname, path);

      // Navigates this tab rather than opening a new one. Minting the
      // secret above is async, and trying to open-then-later-redirect a
      // separate tab around that gap is unreliable across browsers (it
      // needs a live window reference, which popup blockers and the
      // 'noopener' flag can both take away, and which we hit trying).
      // A same-tab navigation has no such failure mode — it's never
      // treated as a popup at all. Trade-off: this tab leaves Studio;
      // use the browser Back button to return to it.
      window.location.href = previewUrl.toString();
    } catch (error) {
      console.error('Failed to open preview', error);
      setIsLoading(false);
    }
  }, [client, currentUser?.id, pathPrefix, slug]);

  if (!pathPrefix || !slug || !draft) {
    return null;
  }

  return {
    label: isLoading ? 'Opening preview…' : 'Preview',
    icon: EyeOpenIcon,
    disabled: isLoading,
    onHandle: handle,
  };
};
