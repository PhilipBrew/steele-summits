import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { theme } from '@/styles/theme';

const exitPreview = async () => {
  'use server';
  const draft = await draftMode();
  draft.disable();
  redirect('/');
};

// Shown site-wide (via SiteChrome) whenever Draft Mode is on, so whoever's
// previewing a draft always knows they're not looking at the live site, with
// a one-click way back out. Plain inline styles rather than styled-components:
// every styled-components usage in this codebase needs a 'use client'
// boundary, which would force splitting this into a second file just to
// call the server-only draftMode() check — not worth it for one small bar.
export const PreviewBanner = async () => {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <aside
      role="status"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.space['3'],
        padding: `${theme.space['2']} ${theme.space['4']}`,
        background: theme.colors.accent,
        color: theme.colors.white,
        fontFamily: theme.fonts.body,
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.semibold,
        textAlign: 'center',
      }}
    >
      <span>
        Preview mode — you&rsquo;re viewing draft content that isn&rsquo;t
        published yet.
      </span>
      <form action={exitPreview}>
        <button
          type="submit"
          style={{
            background: 'transparent',
            border: '1px solid currentColor',
            borderRadius: theme.radii.pill,
            color: 'inherit',
            font: 'inherit',
            fontWeight: theme.fontWeights.semibold,
            padding: `${theme.space['1']} ${theme.space['3']}`,
            cursor: 'pointer',
          }}
        >
          Exit preview
        </button>
      </form>
    </aside>
  );
};
