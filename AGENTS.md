<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Steele Summits — Website — Project Conventions

Next.js 16 (App Router) + TypeScript marketing site for Steele Summits, a UK Mountain Leader offering guided mountain walking and outdoor yoga. Content is fully CMS-driven via an embedded Sanity Studio. Package manager: **npm**. Node **22.12+** required (see `.nvmrc`) — the Sanity toolchain's dependencies (`groq-js`, etc.) require it. Deployed on Vercel. Personal project — no CI/test suite yet.

## Folder Structure

```
app/
  (site)/       # marketing routes, wrapped in the site chrome — (site)/layout.tsx renders
                # Header/Footer/AppProviders. Route group, doesn't affect URLs (e.g.
                # app/(site)/about/page.tsx still serves /about). Route-specific components
                # (e.g. app/(site)/contact/ContactForm.tsx) are co-located, not put in
                # components/, when nothing else will ever reuse them.
  studio/       # embedded Sanity Studio at /studio — deliberately OUTSIDE (site), so it gets
                # only the bare root layout, none of the marketing site's chrome/theme
  sitemap.ts, robots.ts, api/revalidate/route.ts
components/
  ui/           # design-system primitives — Container, Stack, Text, Button, Card, Badge,
                # ImagePlaceholder, SanityImage, CardMedia, LandscapeBanner, ui/form/*
  layout/       # page-scaffolding building blocks — Header, Footer, Hero, Section, SplitContent,
                # CTASection, CardGrid, TwoColumnGrid
  cards/        # domain content cards (ServiceCard, TestimonialCard, BlogPostCard) — compose
                # components/ui, one per Sanity document type
  portable-text/ # PortableTextRenderer — renders Sanity rich-text body fields via themed
                # components/ui primitives; the extension point for future custom blocks
  providers/    # React Context / client providers (AppProviders)
lib/
  sanity/       # client.ts, image.ts (urlFor), env.ts, types.ts, queries.ts (GROQ), fetchers.ts
                # (one function per query, each tagged for on-demand revalidation), seo.ts
                # (buildMetadata helper), tags.ts
  query-client.ts
sanity/         # Studio-only: schemaTypes/ (objects/ + documents/), structure.ts (desk structure,
                # pins the 4 singleton pages so they can't be duplicated)
sanity.config.ts, sanity.cli.ts   # repo root
hooks/          # reserved for a future useSanityQuery hook, if a client-side interactive
                # fetch is ever needed — everything today fetches Sanity directly in
                # Server Components, so this is currently unused
styles/         # theme.ts (tokens), GlobalStyle.ts, styled-components SSR registry, styled.d.ts
public/         # static assets
```

## Language & File Conventions

- New files: `.ts` / `.tsx` only.
- No file extensions in imports; use the `@/*` path alias (maps to project root).
- Named exports for components, hooks, and utilities — no `export default`, including page/layout components (`export const Foo = () => ...; export default Foo;` only where Next requires a default export, e.g. `app/**/page.tsx` and `app/layout.tsx`).
- **Arrow functions always** — never `function` declarations, for components or otherwise. Enforced by `func-style` in `eslint.config.mjs`.
- Shared types live next to what they describe (e.g. `components/ui/Button.tsx` exports `ButtonProps`/`ButtonVariant`); introduce a shared `types/` folder only once something is genuinely cross-cutting.

## Styling

- **styled-components** exclusively — no CSS modules, no Tailwind, no inline `style={{}}` except one-off dynamic layout tweaks (e.g. a computed width).
- **Requires `"use client"`.** Every file that calls `styled.xxx`, `styled(Component)`, `css`, or `createGlobalStyle` needs the directive at the top — these consume React context via hooks, which Server Components can't do. Pages/layouts that only _render_ these components can stay Server Components.
- **Transient props.** Styling-only props are prefixed `$` (e.g. `$variant`, `$size`) so they're never forwarded to the DOM.
- Spacing, color, font, radius, shadow, and breakpoint tokens live in `styles/theme.ts` and are consumed via the `theme` prop styled-components injects — never hardcode a value that already has a token.
- Typography: `Fraunces` (heading font, `--font-heading`) for `Text` `$variant`s `display`/`h1`–`h4`; `Karla` (body font, `--font-body`) for everything else. Loaded via `next/font/google` in `app/layout.tsx`.

### The site is light-themed by default

There is no dark-mode toggle. The page background (`GlobalStyle`) is `colors.surface` — a warm parchment/mist tone — and `Text` defaults to `$color="ink"`.

- `surface` — page background (warm parchment). `Section $background="default"` uses this.
- `surfaceElevated` — a subtler, slightly darker warm tone for alternating sections and secondary UI: `Section $background="elevated"`, `Card $variant="elevated"`, the Footer background, `Badge $variant="neutral"`.
- `white` — the default `Card` background (`$variant="default"`) and form field background, so cards read as "lifted" off the parchment page.
- `primary` (deep pine green) — brand colour, used for primary buttons, eyebrow labels, and `Section $background="accent"` / `Card $variant="accent"` for the occasional strong-colour section or highlighted card. Text on an `accent` background should be `$color="white"`.
- `accent` (bracken/rust brown) — secondary brand colour, mainly used on `Badge $variant="accent"` and focus rings.
- `ink` — primary text colour, and the `Text` default.
- `muted` — secondary/supporting text colour, used anywhere `onDark`/`mutedOnDark` would have been used in a dark-themed sibling project. This is the one to reach for on intros, captions, and card body copy.
- `border` — the single border colour for the whole site (no separate light/dark border tokens are needed since there's only one theme).
- `Input`/`Textarea` keep a white background matching the default `Card` — form fields always read as "on top of" whatever section background surrounds them.

## Data Fetching

- **Sanity is the CMS**, wired up via `lib/sanity/`. Server components fetch directly using the `lib/sanity/fetchers.ts` functions (`getServices`, `getHomePage`, etc.) — don't write ad-hoc GROQ inline in a page, add a query to `lib/sanity/queries.ts` and a fetcher instead.
- Every fetcher tags its `fetch` call (`next: { tags: [...] }`) so `/api/revalidate` can invalidate it on-demand when Sanity's webhook fires on publish; there's also a 1-hour time-based fallback in case a webhook delivery is missed.
- **Tanstack Query** is set up (`AppProviders`) but currently unused — it's reserved for a future client-side/interactive fetch (via a `useSanityQuery` hook in `hooks/`, not yet needed). Don't reach for it for anything that can be a Server Component fetch.
- Images: use `<SanityImage image={...} />` (or `<CardMedia image={...} fallbackLabel="..." />` for card/hero slots that should fall back to an illustrated placeholder when no image is set yet) — never construct a Sanity CDN URL by hand.
- Rich text: Sanity `body`/similar Portable Text fields render via `<PortableTextRenderer value={...} />`, not by dumping the raw blocks.
- SEO metadata: every route's `generateMetadata` calls `buildMetadata()` from `lib/sanity/seo.ts`, passing that document's `seo` field — don't hand-roll a `Metadata` object.

## Component Patterns

- **Design-system primitives live in `components/ui/`**, exported from `components/ui/index.ts`. Reach for these before writing new one-off styled elements.
- **Layout/scaffolding components live in `components/layout/`**, exported from `components/layout/index.ts` — composed from `components/ui` primitives, not styled from scratch. `Section` wraps most page content (eyebrow/heading/intro + a `$background` of `default`/`elevated`/`accent`); reach for it before writing a bespoke section wrapper.
- **Domain content cards live in `components/cards/`**, exported from `components/cards/index.ts`. Each takes a single typed item from `lib/sanity/types.ts` (e.g. `ServiceCard({ service })`).
- Explicit typed props interfaces — no prop spreading of unknown shapes.
- Check `/style-guide` (`app/(site)/style-guide/page.tsx`) for what already exists — both primitives and variants — before adding a new component. Keep it up to date: when adding or changing a UI primitive or content card, add/update its entry there too. Full-width layout components (`Hero`, `SplitContent`, `CTASection`) aren't duplicated in the style guide — they're shown in context on the real pages (Home, About).

## Sanity Studio & Schema

- Add a new content field: edit the relevant schema in `sanity/schemaTypes/documents/*`, update the matching type in `lib/sanity/types.ts`, add/extend the GROQ projection in `lib/sanity/queries.ts`, then wire it into the page/component.
- The 4 singleton page types (`homePage`, `aboutPage`, `contactPage`, `siteSettings`) are pinned in `sanity/structure.ts` with a fixed `documentId` and have the Duplicate action removed (`sanity.config.ts`'s `document.actions`) — don't add a 5th singleton without following that same pattern, or editors will be able to create duplicates.
- Every image field uses the shared `imageWithAlt` object (hotspot + required alt text) — never add a bare Sanity `image` field.
- Rich text fields use the shared `blockContent` type — it's the extension point for future custom blocks (galleries, callouts) without a data migration, so extend `sanity/schemaTypes/objects/blockContent.ts`'s `of` array rather than adding a separate body field.
- **Cylance Endpoint Security on this machine kills newly-downloaded native binaries** (confirmed with `esbuild` — reproducible `SIGKILL` even executing it directly, unrelated to Gatekeeper). This is why the Sanity CLI (`sanity login`/`init`, which needs `esbuild`) doesn't work here — project setup was done via the plain web dashboard (sanity.io/manage) instead. It also means: always install packages with `npm install --ignore-scripts`, and never introduce an esbuild-dependent tool (`tsx`, `vite`, the standalone `sanity` CLI) as something that needs to actually _run_ locally — Turbopack (Next's own bundler) is what makes the embedded `/studio` route work despite this. If a one-off script needs to run outside Next, use plain `node --experimental-strip-types` (see git history for `scripts/seed-content.ts`, since removed) rather than a script runner.

## Code Quality

- ESLint: `eslint-config-next` (core-web-vitals + typescript) plus `eslint-config-prettier` to disable stylistic rules Prettier owns. Don't disable rules inline without an explanatory comment.
- Prettier: single quotes, trailing commas everywhere, no parens around a single arrow-function param, 80-char print width — see `.prettierrc.json`. Run `npm run format` rather than hand-formatting.
- Husky pre-commit hook runs lint-staged (ESLint --fix + Prettier) on staged files.
- Run `npm run lint` and `npm run typecheck` before considering a change done.
