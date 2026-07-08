# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config in eslint.config.mjs)
```

There is no test suite/runner configured in this repo.

### Environment variables (`.env`, gitignored)

- `NEXT_PUBLIC_API_URL` — base URL of the external content/CMS API this site reads from.
- `API_SECRET_KEY` — bearer token attached server-side to outgoing API requests (see `src/service/api/http.ts`); never exposed to the client.

## Architecture

This is a Next.js 16 App Router personal portfolio (baharma.my.id) that renders content pulled from an external headless CMS-style API, styled with Tailwind v4 and animated with GSAP.

### Routing vs. implementation split

`app/` contains only thin route wrappers — each `page.tsx` just renders a section component from `src/sections/`. All real UI/logic lives under `src/`:

- `app/(main)/` is a route group whose `layout.tsx` wraps every page in the shared `ComponentsNavbar` / `ComponentsFooter`.
- `app/(main)/[slug]/page.tsx` is a single dynamic route that renders `SectionExperience` for multiple nav destinations (e.g. `/experience`, `/project`); the section branches its data-fetching and rendering based on `slug === 'project'` vs. anything else.
- `app/api/contact/route.ts` is a same-origin proxy: the client form POSTs plain JSON here, and this route forwards it server-to-server to the external email API via `http()`, which attaches `Authorization: Bearer API_SECRET_KEY`. This keeps the secret key off the client — any future client-initiated write that needs auth should go through a proxy route like this rather than calling the external API directly from a `"use client"` component (env vars without the `NEXT_PUBLIC_` prefix are `undefined` in client bundles anyway).
- Path alias `@/*` maps to the repo root, so imports read as `@/src/...` and `@/app/...`.

### Data layer (`src/service/api/`)

- `http.ts` builds an axios instance pointed at `NEXT_PUBLIC_API_URL`, attaching `Authorization: Bearer ${API_SECRET_KEY}` when present.
- `server.ts` wraps each endpoint call in `unstable_cache` (typically `revalidate: 3600`, some with `tags` for on-demand revalidation) and exports one fetch function per page/resource: `apiMain`, `homePage`, `apiExperience`, `apiAboutMe`, `productApi`.
- All content endpoints hang off one fixed website slug, `portopolio-baharma` (and `website_id`/`user_id` `3` for product/email calls) — this app only ever renders one site's content.
- Responses share a consistent CMS shape: `response.data.workflows[0].value.<page-key>`, where individual fields are frequently objects of the form `{ key, label, type, value }` (see `src/service/type/value.ts`). Expect to drill through this shape (often with optional chaining) whenever wiring up a new field from the CMS.

### Sections & components

- `src/sections/<name>/index.tsx` is the entry point for a page area — usually an **async Server Component** that calls the relevant `server.ts` fetcher, reaches into the `workflows[0].value...` payload, and passes plain props down to sibling files in the same folder (`main-hero.tsx`, `list.tsx`, `timeline.tsx`, etc.).
- `src/component/` holds reusable, presentational UI shared across sections (e.g. `card-project`, `gradient-image` with built-in lightbox support, `navbar`, `footer`, `render-blog`).
- `src/component/render-blog` (`BlogContent`) renders CMS rich text (authored in Quill) via `dangerouslySetInnerHTML`. Its list-marker styling depends on the `.blog-content` rules in `app/globals.css` — Quill emits `<li data-list="ordered|bullet">` with an empty `.ql-ui` span and no native `list-style`, so markers are drawn via CSS counters there. Keep that CSS in sync if this component changes.

### Animations

GSAP + `@gsap/react`'s `useGSAP` hook is used in client components for scroll-triggered reveals. Shared helpers live in `src/uitls/gsapUtils.ts` (note: directory is spelled `uitls`, not `utils`) — `gsapShowTextOnTop`/`Left`/`Right` each register a `ScrollTrigger` against elements matching `.show-text-on-top` / `.show-text-on-left` / `.show-text-on-right`. Apply the matching class name to trigger the effect rather than writing new GSAP timelines from scratch.

### Styling

Tailwind v4 with CSS-first config in `app/globals.css` (`@theme inline`), no `tailwind.config.js`. Notable custom tokens:

- Color scale: `primary`/`secondary`/`tertiary`/`quaternary`/`quinary` (navy-based palette, defined as CSS vars).
- A fluid, viewport-relative sizing scale (`text-8d` … `text-80d`, `radius-8d/10d/15d`) computed as `calc(N / var(--bw) * 100vw)`, where `--bw` is a "design width" that switches between 375 (mobile), 480 (portrait tablet), and 1280 (default) via media queries. Use these `*d`-suffixed utilities for new type/radius sizing instead of introducing fixed px values, to stay consistent with the rest of the site's fluid scaling.
