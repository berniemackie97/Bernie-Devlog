# Content Authoring Guide

## Prerequisites
- Ensure dependencies are installed (`pnpm install`).
- Use the MDX collections defined in `src/content/config.ts` for schema validation.

## Creating an Issue
1. Add a new file under `src/content/issues/` (e.g., `my-topic.mdx`).
2. Include frontmatter: `title`, `description`, `issue_number`, `layout: "../../layouts/Issue.astro"`.
3. Import supporting articles with `getEntry` and render them via `ArticleTeaser` or other components.
4. List the issue in navigation helpers if it needs a canonical path (`src/utils/paths.ts`).
5. Optional: update featured issues (`featured.mdx` / `featured-issues.mdx`) if the new issue should surface on the home page.

## Creating an Article
1. Place the file under `src/content/articles/`.
2. Frontmatter requirements: `title`, `description`, `issue_number`, and optional `layout` override.
3. Use MDX to compose content. Import shared components like:
   - `FancyParagraph` for styled intros
   - `ArticleTeaser` for nested references
   - `More` to wrap expandable guidance
4. Articles automatically become routable via `/articles/[slug]` thanks to `src/pages/articles/[...slug].astro`.
5. Add the article to its issue overview and any relevant cards.

## Creating a Card
1. Add an MDX file under `src/content/cards/` with fields defined in `config.ts` (name, tagline, art, optional `card_path`/`issue_path`, `type`, `featured`, `priority`).
2. Compose the MDX using the card subcomponents (`<Card>`, `<ArtSection>`, `<Body>`, `<Button>`, etc.).
3. Set `featured: true` and `priority` to control ordering in `featured-issues.mdx`.
4. Register canonical routes in `src/utils/paths.ts` so links remain consistent.

## Linking Content Together
- Use `issue_number` to associate articles and cards with their parent issue.
- Issue overviews typically `getEntry` the headline articles/cards.
- Cards often embed an `ArticleTeaser` with the detailed overview for quick navigation.
- Update `featured-issues.mdx` and `featured-issues-sidebar.mdx` when promoting new work on the landing page.

## Updating Navigation Paths
- `src/utils/paths.ts` centralizes human-friendly URLs for cards and issues.
- Add new keys when introducing permanent routes. Components that read `paths` will pick up the update automatically.

## Drafting Roadmaps or TODOs
- Issue MDX files include "Roadmap" or "Signals" sections. Keep them current so readers know what is coming next.
- `docs/roadmap.md` holds higher-level backlog items for the site.

## Previewing Changes
- Run `pnpm dev` to see live updates.
- Visit `/issues/page/1` to review the magazine stack layout; `/issues` and `/issues/page` redirect there automatically.
- Run `pnpm run build` before release to ensure type-safe content and valid routes.
- Unit tests live under `tests/unit`; run `pnpm test` to execute them.
- End-to-end smoke: `pnpm test:e2e` (requires a prior `pnpm run build`; the Playwright config boots `pnpm preview`).
