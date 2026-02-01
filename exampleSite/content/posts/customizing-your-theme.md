---
title: "Customizing Your Theme"
date: 2025-08-17T10:00:00+05:30
draft: false
description: "A guide to font presets, color palettes, custom colors, container width, and the design token architecture in the Explore theme."
author: "Rain Doctor"
categories: ["Theme Guide", "Getting Started"]
tags: ["guide", "style", "typography", "features"]
toc: true
summary: "Everything you need to personalize the look and feel of Explore — font presets, color palettes, custom primary and accent colors, container width, and a brief tour of the design token system underneath."
---

One of the quiet pleasures of setting up a new site is choosing how it looks. Not the content — that comes later, and is a different kind of pleasure — but the typeface, the colors, the width of the column. The small decisions that determine whether a page feels like a well-set book or a photocopied handout.

> "The details are not the details. They make the design."
>
> -- Charles Eames

Explore gives you a few deliberate knobs to turn. This guide covers each one.

## Font Presets

The theme ships with two self-hosted font presets. No external requests are made — all font files live in the theme's `static/fonts/` directory.

### Inter (Default)

| Role | Typeface | Weights |
|------|----------|---------|
| Sans-serif | Inter | 400, 700 |
| Monospace | JetBrains Mono | 400 |

Inter is a clean, neutral typeface designed for screens. If you have no strong preference, this is a solid default.

### Google Sans

| Role | Typeface | Weights |
|------|----------|---------|
| Sans-serif | Google Sans Flex | 400, 700 |
| Monospace | Google Sans Code | 400 |

Google Sans Flex is a friendlier, more geometric face. It gives the site a slightly warmer, more modern feel.

To switch presets, set a single line in your `config.toml`:

```toml
[params.style]
  fontPreset = "google-sans"
```

That's it. The entire site — body text, headings, code blocks — updates to use the new preset's families.

## Color Palettes

Explore includes four named color palettes. Each palette defines its own primary and accent colors for both light and dark modes, so contrast is maintained regardless of the user's preference.

| Palette | Light Primary | Light Accent | Feel |
|---------|--------------|-------------|------|
| `default` | `#1a73e8` | `#1e8e3e` | Familiar blue and green. Dependable. |
| `ocean` | `#0077b6` | `#00838f` | Deep teal tones. Calm and professional. |
| `forest` | `#2d6a4f` | `#52b788` | Rich greens. Warm and organic. |
| `slate` | `#475569` | `#64748b` | Muted grays. Understated, editorial. |

To apply a palette:

```toml
[params.style]
  palette = "forest"
```

When a named palette is active, it overrides any `primary` or `accent` values you may have set. The palette owns the colors.

## Custom Colors

If none of the built-in palettes suit you, set `palette = "default"` and define your own primary and accent colors:

```toml
[params.style]
  palette = "default"
  primary = "#6C3DBF"
  accent  = "#5FA8A3"
```

These values are injected as CSS custom properties (`--color-primary` and `--color-accent`) and propagate throughout the theme — links, buttons, hover states, the reading progress bar, and more.

A few things to keep in mind when choosing custom colors:

- **Contrast:** Ensure your primary color has at least a 4.5:1 contrast ratio against the background for WCAG AA compliance.
- **Dark mode:** Custom colors are used in both light and dark modes. The theme brightens them slightly in dark mode, but very dark primaries may not look right. Test in both modes.
- **Accent usage:** The accent color is used sparingly — hover states, highlights, a few decorative elements. It doesn't need to be bold.

## Container Width & Typography

Two settings control how wide the content spreads:

```toml
[params.style]
  containerMaxWidth = "1280px"
  maxWidthCh = 75
```

- **`containerMaxWidth`** is the overall page width (header, footer, sidebar grid). Any valid CSS value works: `"1280px"`, `"80rem"`, `"90vw"`.
- **`maxWidthCh`** is the max width of the readable content column, measured in `ch` units (roughly the width of the character "0"). 75 characters is a comfortable reading measure for most typefaces.

The type scale uses a Minor Third ratio (1.2x), producing a harmonious progression from small labels to large headings. This isn't configurable — it's baked into the design tokens — but the fluid spacing system ensures it looks right at any viewport width.

## Design Token Architecture

Under the hood, all visual values are expressed as CSS custom properties organized into three tiers:

1. **Primitive tokens** — raw values: color scales, spacing values, font stacks, shadow definitions. These are the building blocks and are never used directly in component styles.

2. **Semantic tokens** — purpose-based aliases: `--color-primary`, `--color-text`, `--space-m`, `--font-body`. These are what components reference. In dark mode, semantic tokens are remapped to different primitives.

3. **Component tokens** — scoped overrides: `--header-bg`, `--card-border`, `--callout-info-bg`. These let individual components diverge from the semantic defaults without breaking the system.

You don't need to understand this architecture to use the theme — `fontPreset`, `palette`, `primary`, and `accent` in your `config.toml` are enough. But if you ever want to extend or override styles in a custom stylesheet, knowing the token layers makes it straightforward to do so without fighting the cascade.

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
>
> -- Antoine de Saint-Exupery
