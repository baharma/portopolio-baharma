# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config in eslint.config.mjs)
```

There is no test suite/runner configured in this repo. `next build` does not run lint in Next 16, so run `npm run lint` and `npx tsc --noEmit` (no script for it) separately. Lint currently has pre-existing errors, all in the legacy `src/` tree (mostly `no-explicit-any` and unused imports); the new code is lint-clean, keep it that way.

## Architecture

Next.js 16 App Router personal portfolio (baharma.my.id), Tailwind v4 + GSAP. Content comes from a headless CMS API via `lib/cms.ts`.

### Layout of the repo

- `app/(site)/` — all pages (`/`, `/experience`, `/about`, `/projects`, `/projects/[slug]`) under one layout (sticky `Navbar`, `Footer`, `Motion`, Person JSON-LD). `app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx` are file-convention SEO routes. `next.config.ts` redirects the old `/project` and `/contacts` URLs.
- `content/site.ts` — static identity/nav/SEO facts (name, domain, github, nav). Everything else comes from the CMS.
- `lib/cms.ts` — the data layer (server-only). Base URL is `CMS_API_URL ?? API_SECRET ?? https://api.baharma.my.id/api` (yes, `API_SECRET` holds a base URL, not a secret). Pages come from `{base}/website/slug/baharma/page/{home,experience,contact,projects}` (public GET, no auth; `fetch` with `revalidate: 300` and the page name as cache tag) and are normalized into `Experience`, `Home`, `Contact`. Server components call `getExperience()/getProjects()/getProject(slug)/getHome()/getContact()` directly. The API drops unfilled sub-fields and wraps values as `{key,label,type,value}`, so the parsers are defensive and every getter returns empty values on failure; the UI omits whatever is missing. Field keys follow `cms-template.json`. `about` is fetched only for `getAbout()` (education list); the rest of the about page copy is hardcoded.
- Projects: `getProjects()` first reads the product API (`{base}/product?website_id=13`, needs the `API_SECRET_KEY` bearer token; fields under `description.value.project`) and only falls back to the CMS `projects` page (`name_project`, `image_list`, ...) when that token is missing or the call fails. Slugs come from the product `slug` or the title, de-duplicated with `-2`, `-3`; `/projects/[slug]` and the sitemap follow this list.
- `/api/revalidate` busts the cache with `revalidateTag(tag, { expire: 0 })` (immediate, not stale-while-revalidate): GET `?secret=…[&tag=<page>]`, or POST with an `x-revalidate-secret` header as the CMS save webhook. No tag = all `CMS_TAGS`.
- `components/ui/` (button, project-card, browser-mockup, cta-band, ...) and `components/sections/` (navbar, footer, `home/*`, `case-study/`, ...). `lib/format.ts` computes date ranges/durations from today's date.
- Path alias `@/*` maps to the repo root (`@/content/...`, `@/components/...`).

### Legacy CMS code (unused by pages now)

`src/` (sections, components, `src/service/api/*`, `uitls/gsapUtils.ts`) is kept from the previous CMS-driven site; nothing in `app/(site)` imports it. The one live dependency is `app/api/contact`, a same-origin proxy that uses `src/service/api/http.ts` (axios, base URL `API_SECRET`, `Authorization: Bearer API_SECRET_KEY`) to POST to the email API; any authenticated client write should go through such a server route. Don't build new features on `src/`.

Env vars (`.env`, gitignored): `API_SECRET` (API base URL), `API_SECRET_KEY` (bearer token for the product and email APIs), `REVALIDATE_SECRET` (`/api/revalidate`), optional `CMS_API_URL` (overrides the base URL in `lib/cms.ts` only).

`AGENTS.md` documents only this legacy CMS architecture (`app/(main)`, `/[slug]`, `src/` conventions) and is outdated for the current site; trust this file where they disagree. `README.md` is unmodified create-next-app boilerplate.

### Styling

- Design tokens (`paper`, `ink`, `accent`, `highlight`, ... plus radii/shadow) are defined in an `@theme static` block in `app/globals.css`; component styles are plain CSS in `app/portfolio.css`, scoped under `.site` and written in real px/clamp() values.
- **Do not use numeric Tailwind spacing utilities** (`p-6`, `gap-10`, `w-200`) in the new pages: `globals.css` overrides `--spacing: calc(100vw / var(--bw))`, making them viewport-relative (that scaling, and the `text-*d` utilities, belong to the legacy `src/` components). Use the classes in `portfolio.css`, or arbitrary values like `w-[44px]`.
- Highlight blue (`--color-highlight`) is for hover states and links only. Every section heading has one italic accent word (`<em>` inside `.display`).
- Layout primitives: `.container` (1440px max), `.grid12` with `.s3/.s6/.c9`-style span/start classes (stacked below 900px), `.section` (128px / 96px mobile).

### Animation

`components/sections/motion.tsx` (mounted once in the site layout) runs GSAP inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`: `[data-hero]` elements fade up with a stagger on load, `[data-reveal]` elements reveal on scroll (`top 85%`, once). Add those attributes to markup rather than writing new timelines. Marquee, availability pulse and the floating caption are CSS keyframes, disabled by a reduced-motion media query.

### Images

`BrowserMockup` and `Portrait` use `next/image` with SVG placeholders in `public/placeholders/` (rendered `unoptimized`). Project covers/screens are remote URLs from the product API (`image`/`images`) or the CMS `image_list`, rendered `unoptimized`; the placeholders show when none is set; swap `PORTRAIT` in `components/sections/portrait.tsx` for a real photo.
