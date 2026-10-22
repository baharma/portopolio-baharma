# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config in eslint.config.mjs)
```

There is no test suite/runner configured in this repo. `next build` does not run lint in Next 16, so run `npm run lint` and `npx tsc --noEmit` (no script for it) separately. Lint currently has pre-existing errors (mostly `no-explicit-any` and unused imports in `src/sections/home/*`); don't add new ones.

## Architecture

Next.js 16 App Router personal portfolio (baharma.my.id), Tailwind v4 + GSAP. Content lives in typed files, not a CMS.

### Layout of the repo

- `app/(site)/` — all pages (`/`, `/experience`, `/about`, `/projects`, `/projects/[slug]`) under one layout (sticky `Navbar`, `Footer`, `Motion`, Person JSON-LD). `app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx` are file-convention SEO routes. `next.config.ts` redirects the old `/project` and `/contacts` URLs.
- `content/` — `site.ts`, `experience.ts`, `projects.ts`, `tools.ts`. Single source of truth. Missing facts are `undefined` with a `// TODO` (LinkedIn URL, `/cv.pdf`, project URLs/screenshots/learnings); the UI omits those spots instead of inventing data. Adding a project to `projects.ts` automatically adds its card, row, `/projects/[slug]` page and sitemap entry.
- `components/ui/` (button, project-card, browser-mockup, cta-band, ...) and `components/sections/` (navbar, footer, `home/*`, `case-study/`, ...). `lib/format.ts` computes date ranges/durations (pages use `revalidate = 86400` because "current role" durations depend on today).
- Path alias `@/*` maps to the repo root (`@/content/...`, `@/components/...`).

### Legacy CMS code (unused by pages now)

`src/` (sections, components, `src/service/api/*` with `unstable_cache` fetchers, `uitls/gsapUtils.ts`) and `app/api/{contact,revalidate}` are kept from the previous CMS-driven site but nothing in `app/(site)` imports them. `/api/contact` is still a working same-origin proxy (attaches `API_SECRET_KEY` server-side; any authenticated client write should go through such a route). Env vars: `NEXT_PUBLIC_API_URL`, `API_SECRET_KEY`, `REVALIDATE_SECRET` — only needed by that legacy code. Don't build new features on `src/`.

### Styling

- Design tokens (`paper`, `ink`, `accent`, `highlight`, ... plus radii/shadow) are defined in an `@theme static` block in `app/globals.css`; component styles are plain CSS in `app/portfolio.css`, scoped under `.site` and written in real px/clamp() values.
- **Do not use numeric Tailwind spacing utilities** (`p-6`, `gap-10`, `w-200`) in the new pages: `globals.css` overrides `--spacing: calc(100vw / var(--bw))`, making them viewport-relative (that scaling, and the `text-*d` utilities, belong to the legacy `src/` components). Use the classes in `portfolio.css`, or arbitrary values like `w-[44px]`.
- Highlight blue (`--color-highlight`) is for hover states and links only. Every section heading has one italic accent word (`<em>` inside `.display`).
- Layout primitives: `.container` (1440px max), `.grid12` with `.s3/.s6/.c9`-style span/start classes (stacked below 900px), `.section` (128px / 96px mobile).

### Animation

`components/sections/motion.tsx` (mounted once in the site layout) runs GSAP inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`: `[data-hero]` elements fade up with a stagger on load, `[data-reveal]` elements reveal on scroll (`top 85%`, once). Add those attributes to markup rather than writing new timelines. Marquee, availability pulse and the floating caption are CSS keyframes, disabled by a reduced-motion media query.

### Images

`BrowserMockup` and `Portrait` use `next/image` with SVG placeholders in `public/placeholders/` (rendered `unoptimized`). Set a project's `cover`/`screens` in `content/projects.ts` (files under `public/`) to replace them; swap `PORTRAIT` in `components/sections/portrait.tsx` for a real photo.
