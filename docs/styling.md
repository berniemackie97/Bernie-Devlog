# Styling Reference

## Palette & Tokens
- Core colors are defined as CSS custom properties per theme in `Layout.astro`.
- Tailwind exposes matching aliases (`text-plum`, `bg-lavender`, etc.). Update both the CSS variables and `tailwind.config.mjs` if new tones are introduced.
- DaisyUI themes (`country`, `nightpress`, `retro`, `newsprint`) mirror the theme picker and power buttons and form elements.

## Typography
- Google Fonts `Playfair Display`, `Newsreader`, `Cormorant Garamond`, and `IBM Plex Sans` are available. Theme selection swaps between them.
- Tailwind font families map to the current theme via CSS variables: `.font-display` and `.font-serif` automatically follow the active palette.

## Theme Picker
- `src/components/ThemePicker.astro` renders a palette switcher with localStorage persistence.
- Themes are declared in `src/utils/themes.ts`; add new palettes (id, label, swatch, optional `isDark`) there.
- Root `<html>` receives `data-theme`, which tailwind/daisyui listen to. Dark-mode variants rely on the `isDark` flag to set `color-scheme`.

## Layout Spacing
- Global padding lives on `Layout.astro` (`px-3 sm:px-6 lg:px-10`). Adjust once to affect every page.
- Issue and article grids use responsive `gap` classes (`layouts/Issue.astro`, `pages/articles/[...slug].astro`).

## Navigation & Masthead
- `components/Navigation.astro` houses the headline, issue badge, and theme picker. Edit gradient/borders here for masthead tweaks.

## Table of Contents
- `components/TableOfContents/TableOfContents.astro` supports `variant="minimal"` for collapsible mobile view. Typography classes live in this component and `TOCHeading.astro`.

## Cards
- Normal/Holo/Tip cards live under `components/Cards`. Shared design changes propagate automatically.
- Card proportions default to `aspect-[63/88]`; adjust for new formats.

## Magazine Issue Stack
- `pages/issues/page/[page].astro` controls gradients (`coverPalette`), spines, and shadows. Update the arrays to adjust the look while keeping layout intact.

## Responsiveness Patterns
- Flex and grid utilities with responsive gaps keep content breathable. Sticky sidebars use `lg:sticky lg:top-28`—tune if header height changes.

## Adding Utilities
- Extend Tailwind via `theme.extend` for bespoke spacing, shadows, etc.
- Use scoped `<style>` blocks in Astro components for component-specific customizations.
