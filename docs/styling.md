# Styling Reference

## Design Tokens
- Tailwind config (`tailwind.config.mjs`) extends fonts, gradient animation, and registers DaisyUI themes.
- Primary fonts are loaded in `Layout.astro`; update font-face declarations there when swapping typography.

## Layout Spacing
- Global padding lives on `Layout.astro` (`px-3 sm:px-6 lg:px-10`). Adjust once to affect every page.
- Issue grids (`layouts/Issue.astro`) and article grids (`pages/articles/[...slug].astro`) use Tailwind gap utilities. Modify the gap classes to change density.

## Navigation
- `components/Navigation.astro` is fully responsive. Update gradient, font sizes, or CTA behavior here. Buttons inherit DaisyUI variants.

## Table of Contents
- `components/TableOfContents/TableOfContents.astro` supports a `variant` prop (`default` or `minimal`). Modify the class strings in this file to restyle the container or typography.
- Nested list styling lives in `TOCHeading.astro`.

## Cards
- Normal, Holo, and Tip cards share subcomponents under `components/Cards`. Update colors or layout in those files and MDX cards will inherit the changes.
- Card aspect ratios are controlled via `aspect-[63/88]` utilities; change here if a new format is required.

## Magazine Issue Stack
- The issue archive layers gradients, spines, and drop shadows using palettes defined at the top of `issues/page/[page].astro`.
- Adjust `coverPalette`, `spinePalette`, or `shadowPalette` to refresh the look.
- Rotations (`lg:-rotate-1` / `lg:rotate-1`) and hover transforms create the physical stack effect; tweak these classes for subtler or louder motion.

## Buttons and Links
- DaisyUI `btn`, `btn-outline`, and `btn-primary` classes are used across teasers and navigation. Adjust DaisyUI theme tokens in `tailwind.config.mjs` to rebrand globally.

## Responsiveness Patterns
- Prefer `flex` or `grid` with responsive `gap` classes (`gap-4`, `sm:gap-6`, `lg:gap-8`).
- Sticky sidebars use `lg:sticky lg:top-24`; adjust the offset if the header height changes.
- Use utility stacks like `space-y-*` for vertical rhythm on mobile.

## Adding New Utilities
- Extend Tailwind via `theme.extend` (e.g., custom colors, spacing) in `tailwind.config.mjs`.
- For complex styles, create a component-specific CSS module or add scoped `<style>` blocks in Astro components.
