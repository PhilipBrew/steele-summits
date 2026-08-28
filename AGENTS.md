<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Steele Summits — Website — Project Conventions

Next.js 16 (App Router) + TypeScript marketing site for Steele Summits, a UK Mountain Leader offering guided mountain walking and outdoor yoga. Package manager: **npm**. Deployed on Vercel. Personal project — no CI/test suite yet.

## Folder Structure

```
app/            # routes (App Router) — one folder per URL segment, page.tsx per route
                # route-specific components (e.g. app/contact/ContactForm.tsx) are co-located,
                # not put in components/, when nothing else will ever reuse them
components/
  ui/           # design-system primitives — Container, Stack, Text, Button, Card, Badge,
                # ImagePlaceholder, ui/form/*
  layout/       # page-scaffolding building blocks — Header, Footer, Hero, Section, SplitContent,
                # CTASection, CardGrid, TwoColumnGrid, navLinks
  cards/        # domain content cards (ServiceCard, TestimonialCard, BlogPostCard) — compose
                # components/ui, one per content type in lib/mock-data
  providers/    # React Context / client providers (AppProviders)
lib/
  mock-data/    # placeholder content (services, testimonials, blog posts) — typed the way the
                # eventual Sanity documents will be; swap for real queries when the CMS is wired
                # up, keep the same shapes where possible
  query-client.ts
hooks/          # custom hooks (e.g. useSanityQuery, once the CMS is wired up)
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

- **Tanstack Query**, via the shared `useSanityQuery` hook (to be added once the CMS is wired up) for client-side/interactive fetches. Server components fetch Sanity content directly with the Sanity client for the initial render — don't reach for Tanstack Query there.
- **Sanity** is the planned CMS — not yet integrated. `lib/sanity/` will hold the client, GROQ queries, and image URL builder once added.

## Component Patterns

- **Design-system primitives live in `components/ui/`**, exported from `components/ui/index.ts`. Reach for these before writing new one-off styled elements.
- **Layout/scaffolding components live in `components/layout/`**, exported from `components/layout/index.ts` — composed from `components/ui` primitives, not styled from scratch. `Section` wraps most page content (eyebrow/heading/intro + a `$background` of `default`/`elevated`/`accent`); reach for it before writing a bespoke section wrapper.
- **Domain content cards live in `components/cards/`**, exported from `components/cards/index.ts`. Each takes a single typed item from the matching `lib/mock-data/*` module (e.g. `ServiceCard({ service })`) — when Sanity is wired up, these should keep the same prop shape and just receive real documents instead of mock ones.
- Explicit typed props interfaces — no prop spreading of unknown shapes.
- Check `/style-guide` (`app/style-guide/page.tsx`) for what already exists — both primitives and variants — before adding a new component. Keep it up to date: when adding or changing a UI primitive or content card, add/update its entry there too. Full-width layout components (`Hero`, `SplitContent`, `CTASection`) aren't duplicated in the style guide — they're shown in context on the real pages (Home, About).

## Code Quality

- ESLint: `eslint-config-next` (core-web-vitals + typescript) plus `eslint-config-prettier` to disable stylistic rules Prettier owns. Don't disable rules inline without an explanatory comment.
- Prettier: single quotes, trailing commas everywhere, no parens around a single arrow-function param, 80-char print width — see `.prettierrc.json`. Run `npm run format` rather than hand-formatting.
- Husky pre-commit hook runs lint-staged (ESLint --fix + Prettier) on staged files.
- Run `npm run lint` and `npm run typecheck` before considering a change done.
