# Architecture Overview

## Stack
- Astro 5 with MDX collections for content
- Tailwind CSS and DaisyUI for design tokens and component primitives
- TypeScript for type-aware server and component code
- Astro View Transitions (ClientRouter) enabled globally in `Layout.astro`

## Directory Layout
- `src/pages/` - route-level components (`index.astro`, dynamic article/issue/card pages, pagination under `issues/page/`)
- `src/layouts/` - shared shells (`Layout`, `Article`, `Issue`)
- `src/components/` - reusable UI (navigation, teasers, cards, content helpers, table of contents)
- `src/content/` - MDX collections (`articles`, `issues`, `cards`) managed by `src/content/config.ts`
- `src/utils/` - helpers (`romanize`, `paths`, markdown hierarchy utilities)
- `docs/` - this documentation bundle

## Rendering Flow
1. A route loads content via `getCollection`/`getEntry`.
2. Pages pass frontmatter to `Layout.astro`, which wires global font loading, navigation, and transitions.
3. Issue and article layouts provide grid defaults; MDX slots render through `ArticleTeaser`, card components, or direct `Content`.
4. Tailwind utilities (including custom gradients) provide responsive behavior; DaisyUI supplies button styling via the configured theme.

## Content Model
- Issues, articles, and cards share a numeric `issue_number` to relate entries.
- Cards reference canonical routes through optional `card_path`/`issue_path` and helpers in `src/utils/paths.ts`.
- MDX files can import Astro components (e.g., `ArticleTeaser`, `FancyParagraph`) to compose structured rich content.

## Key Components
- `Navigation.astro` - responsive header with date stamp and active issue badge.
- `ArticleTeaser.astro` - shared teaser that renders MDX snippets with CTA.
- `TableOfContents` - builds nested menus from markdown headings with minimal and full variants.
- `Cards/*` - Normal, Holo, and Tip cards share subcomponents to keep MDX declarative.
- `Layout.astro` - sets global padding (`px-3 sm:px-6 lg:px-10`), fonts, and injects navigation.

## Issue Archive Experience
- `/issues/page/[page].astro` renders a “magazine stack” layout with layered covers, coloured spines, and CTA ribbons.
- Accent colours, drop shadows, and rotations are calculated from palettes at render-time for variety across the stack.
- The sidebar explains how to browse issues; pagination stays in the header to mimic a physical index.
- `/issues` and `/issues/page` redirect to `/issues/page/1` for clean linking.

## Responsiveness Strategy
- Layout containers cap at `max-w-screen-2xl` while applying progressive padding.
- Flexbox and CSS grid are used throughout (`Issue.astro`, card pages) with `gap` utilities tuned for mobile vs. desktop.
- Sticky regions (TOC, sidebars) apply `top-24` offsets to clear the navigation bar on large screens.

## Testing & Quality
- Unit tests: `pnpm test` (Vitest + happy-dom targeting `/tests/unit`).
- End-to-end/integration tests: `pnpm test:e2e` (Playwright; run `pnpm run build` first, then `pnpm exec playwright install` once to fetch browsers).
- Coverage is generated alongside Vitest in `coverage/`.

## Build & Tooling
- Install dependencies: `pnpm install`.
- Validate types/build: `pnpm run build` (runs `astro check` then `astro build`).
- Local dev: `pnpm dev`.
