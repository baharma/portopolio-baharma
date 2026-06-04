# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Turbopack) at http://localhost:3000
npm run build    # production build
npm run lint     # run ESLint (eslint-config-next core-web-vitals + typescript)
```

No test runner is configured.

## Architecture

This is a **Next.js 16 App Router** portfolio site using React 19, Tailwind CSS v4, and `clsx`.

**Routing — two layout layers:**
- [app/layout.tsx](app/layout.tsx) — root HTML shell, loads all fonts, applies global CSS
- [app/(main)/layout.tsx](app/(main)/layout.tsx) — route group wrapping all visible pages; injects `<ComponentsNavbar>`
- [app/(main)/page.tsx](app/(main)/page.tsx) — the only route so far; renders the home section component

**Source code lives under `src/`**, not inside `app/`:
- `src/sections/` — full-page section components (one folder per route concept, e.g. `home/`)
- `src/component/` — reusable UI pieces (`navbar/`, `footer/`, `swite/`)
- `src/layout/` — shared layout wrappers

> **Important:** Do NOT name any folder under `src/` as `pages/` — Next.js would misdetect it as a Pages Router directory and throw a conflict error with the App Router.

**Path alias:** `@/` maps to the repo root, so `src/` files are imported as `@/src/…`.

## Styling

Tailwind CSS v4 — imported via `@import "tailwindcss"` in [app/globals.css](app/globals.css).

Custom design tokens in `@theme inline`:

| Token | Value |
|---|---|
| `--color-primary` | `#c2410d` |
| `--color-secondary` | `#f4f1ec` |

Viewport-relative sizing uses `--bw` as the base width divisor. Pattern: `calc(N / var(--bw) * 100vw)`. Available as `text-<n>d` and `radius-<n>d` Tailwind utilities (e.g. `text-16d`, `radius-8d`).

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
