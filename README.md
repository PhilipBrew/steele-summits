# Steele Summits

Marketing and blog website for Steele Summits, a UK Mountain Leader offering guided mountain walking and adventures alongside outdoor yoga sessions — homepage, blog, services, about, and contact. All content is editable via an embedded Sanity Studio.

## Stack

Next.js (App Router) + TypeScript, styled-components, Tanstack Query, Sanity CMS (embedded Studio at `/studio`), deployed on Vercel. See [AGENTS.md](./AGENTS.md) for conventions.

Node **22.12+** is required (see `.nvmrc`) — run `nvm use` before installing.

## Getting started

```bash
nvm use
npm install --ignore-scripts   # see AGENTS.md's "Sanity Studio & Schema" section for why
npm run dev
```

Copy `.env.example` to `.env.local` and fill in the Sanity project details (get these from sanity.io/manage or ask whoever set up the project).

Open [http://localhost:3000](http://localhost:3000). The `/style-guide` route is the living reference for shared UI components and design tokens. The `/studio` route is the CMS — sign in with a Sanity account that's been added to the project.

## Scripts

```bash
npm run dev            # start dev server
npm run build           # production build
npm run lint              # eslint
npm run format             # prettier --write
npm run format:check        # prettier --check
npm run typecheck             # tsc --noEmit
```
