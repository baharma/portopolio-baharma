# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run lint     # run ESLint (eslint-config-next core-web-vitals + typescript)
```

No test runner is configured.

## Architecture

This is a **Next.js 16 App Router** portfolio site using React 19, Tailwind CSS v4, and `clsx`.

**Routing — two layout layers:**
- [app/layout.tsx](app/layout.tsx) — root HTML shell, loads all fonts, applies global CSS
- [app/(main)/layout.tsx](app/(main)/layout.tsx) — route group wrapping all visible pages; injects `<ComponentsNavbar>` and `<ComponentsFooter>`
- [app/(main)/page.tsx](app/(main)/page.tsx) — the only route so far; renders the home section component

**Source code lives under `src/`**, not inside `app/`:
- `src/sections/` — full-page section components (one folder per route concept, e.g. `home/`)
- `src/component/` — reusable UI pieces (`navbar/`, `footer/`, etc.)
- `src/layout/` — shared layout wrappers
- `src/uitls/` — utilities (note: intentional typo in folder name; keep it as-is)
- `src/service/api/` — API layer: `http.ts` creates an axios instance using `NEXT_PUBLIC_API_URL` and optionally adds `Authorization: Bearer` from `API_SECRET_KEY`; `server.ts` is for server-side fetching

> **Important:** Do NOT name any folder under `src/` as `pages/` — Next.js would misdetect it as a Pages Router directory and throw a conflict error with the App Router.

**Path alias:** `@/` maps to the repo root, so `src/` files are imported as `@/src/…`.

**Component naming convention:** PascalCase prefixed by location — `ComponentsNavbar`, `SectionsHomeMainHero`, `SectionsHomeCardProject`. Follow this pattern when adding new components.

## Styling

Tailwind CSS v4 — imported via `@import "tailwindcss"` in [app/globals.css](app/globals.css).

Custom design tokens in `@theme inline`:

| Token | Value |
|---|---|
| `--color-primary` | `#c2410d` |
| `--color-secondary` | `#f4f1ec` |
| `--color-tertiary` | `#ece7df` |
| `--color-quaternary` | `#16140f` |

Container tokens: `--container-8xl` (88rem), `--container-9xl` (96rem), `--container-10xl` (104rem).

Animation: `animate-marquee` — infinite horizontal scroll at 25s, used for the `text-move` section.

**Viewport-relative sizing** uses `--bw` as the base width divisor with three breakpoints:

| Breakpoint | `--bw` |
|---|---|
| `≥768px landscape` (desktop) | `1280` |
| `768px portrait` (tablet) | `480` |
| `<768px` (mobile) | `375` |

Pattern: `calc(N / var(--bw) * 100vw)`. Available as `text-<n>d` and `radius-<n>d` Tailwind utilities (e.g. `text-16d`, `radius-8d`). `--spacing` is set to `calc(100vw / var(--bw))` for use in manual `calc()` expressions.

Dark mode uses `prefers-color-scheme` media query, not a class toggle.

## Fonts

All fonts loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx) and exposed as CSS variables on `<html>`:

| Font | CSS variable | Tailwind class | Notes |
|---|---|---|---|
| Geist | `--font-geist-sans` | `font-sans` | variable weight 100–900 |
| Geist Mono | `--font-geist-mono` | `font-mono` | variable weight 100–900 |
| Instrument Serif | `--font-instrument-serif` | `font-instrument-serif` | weight 400 only, normal + italic |
| Pacifico | `--font-pacifico` | `font-pacifico` | weight 400 only, normal only |

Usage: `<h1 className="font-instrument-serif italic">…</h1>`

## Animations

GSAP (`gsap` + `@gsap/react`) with `ScrollTrigger` is the animation system. Utility functions live in [src/uitls/gsapUtils.ts](src/uitls/gsapUtils.ts) and work by selecting CSS class names:

| Class | Effect |
|---|---|
| `.show-text-on-top` | fade in + slide up 50px |
| `.show-text-on-right` | fade in + slide from right 50px |
| `.show-text-on-left` | fade in + slide from left 50px |

All three trigger at `start: "top 85%"` with `once: true`. Call the relevant utility inside a `useGSAP` hook (from `@gsap/react`) — never call GSAP imperatively outside of it or `useEffect`, since SSR will break.

## Data Fetching

TanStack Query v5 (`@tanstack/react-query`) is the data-fetching layer. Axios is used for HTTP via the factory in `src/service/api/http.ts`. There is no QueryClient provider set up in the app shell yet — add one before creating any `useQuery` hooks.
