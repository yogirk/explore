---
title: "Explore Theme Features"
date: 2025-08-19T10:00:00+05:30
draft: false
description: "A detailed overview of the features and configuration options of the Explore theme for Hugo."
author: "Rain Doctor"
categories: ["Theme Guide"]
tags: ["features", "documentation", "hugo"]
toc: true
summary: "Explore is a minimal, text-heavy theme for Hugo, designed for academic sites, personal blogs, and essays. This post provides a detailed overview of its features and configuration."
---

**Explore** is a minimal, text-heavy theme for Hugo, designed for academic sites, personal blogs, and essays. It prioritizes readability, performance, accessibility, and maintainability.

> "Have nothing in your houses that you do not know to be useful or believe to be beautiful."
>
> -- William Morris

## Features

### Performance & Security

- **Subresource Integrity (SRI):** All generated CSS and JS include integrity hashes to prevent tampering.
- **IIFE JavaScript:** Scripts are wrapped to avoid global scope pollution.
- **Self-Hosted Fonts:** Both font presets are bundled locally — zero external requests.
- **Hugo Pipes:** CSS is processed, minified, and fingerprinted through Hugo's asset pipeline.

### Design System

- **Design Tokens:** Three-tier CSS custom property architecture (primitive, semantic, component).
- **Font Presets:** Switch between `inter` and `google-sans` with a single config line.
- **Color Palettes:** Four built-in palettes with independent light and dark values.
- **Fluid Spacing:** Clamp-based spacing scale that adapts between viewport sizes.
- **Type Scale:** Minor Third (1.2x) typographic scale.

### Accessibility & UX

- **WCAG 2.1 AA:** Semantic HTML, ARIA landmarks, keyboard navigation, and sufficient contrast.
- **Dark Mode:** Automatic detection via `prefers-color-scheme` with manual toggle and persistence.
- **Smooth Toggle Transitions:** No flash of unstyled content when switching themes.

### Interactive Features

- **Reading Progress Bar:** Thin indicator at the top of the viewport on single posts.
- **Code Copy Button:** One-click copy on all code blocks with language label.
- **Card Hover Effects:** Post cards lift with shadow and title color change.
- **ScrollSpy ToC:** Active heading highlighted in the sidebar table of contents.
- **Breadcrumb Navigation:** Hierarchical breadcrumbs on all inner pages.

### Content & SEO

- **Client-Side Search:** Fuse.js (zero-config) or Pagefind (for large sites).
- **Server-Rendered Widgets:** Sidebar widgets for recent posts, categories, and tags.
- **Responsive Figure Shortcode:** WebP with LQIP blur-up and `srcset`.
- **SEO Metadata:** JSON-LD, OpenGraph, and Twitter Card tags.
- **Centralized Config Defaults:** Override only what you need.

## Font Presets

The theme ships with two self-hosted font presets. Set `params.style.fontPreset` in your `config.toml`:

| Preset | Sans-Serif | Monospace | Character |
|--------|-----------|-----------|-----------|
| `inter` (default) | Inter | JetBrains Mono | Clean, neutral, highly legible |
| `google-sans` | Google Sans Flex | Google Sans Code | Friendly, geometric, modern |

```toml
[params.style]
  fontPreset = "google-sans"
```

No external font requests are made — both presets are bundled in the theme's `static/fonts/` directory.

## Color Palettes

Four named palettes are available. Each defines its own light and dark mode values:

| Palette | Light Primary | Light Accent | Character |
|---------|--------------|-------------|-----------|
| `default` | `#1a73e8` | `#1e8e3e` | Familiar blue/green — works everywhere |
| `ocean` | `#0077b6` | `#00838f` | Deep teal — calm, professional |
| `forest` | `#2d6a4f` | `#52b788` | Natural green — warm, organic |
| `slate` | `#475569` | `#64748b` | Understated gray — minimal, editorial |

```toml
[params.style]
  palette = "ocean"
```

When using a named palette, the `primary` and `accent` fields in your config are ignored. To use custom colors instead, set `palette = "default"` and specify your own values:

```toml
[params.style]
  palette = "default"
  primary = "#6C3DBF"
  accent  = "#5FA8A3"
```

## Interactive Features

All interactive features are enabled automatically. No configuration is needed.

- **Reading progress bar** — visible as you scroll through any single post
- **Code copy button** — appears on every fenced code block (try the examples on this page)
- **Card hover effects** — post cards on list pages lift with shadow and title highlight
- **ScrollSpy ToC** — the active heading is tracked in the sidebar table of contents
- **Breadcrumbs** — hierarchical navigation at the top of inner pages
- **Smooth theme toggle** — the light/dark switch transitions without a flash

For a hands-on demonstration of each feature, see [Interactive Features]({{< relref "interactive-features.md" >}}).

## Configuration

All theme options live in your site's `config.toml` under `[params]`. Below is a breakdown of the available sections.

### UI Parameters

```toml
[params.ui]
  stickyHeader = true
  showSearch = true       # Show search icon in header
  searchEngine = "fuse"   # Options: "fuse", "pagefind"
  homeView = "default"    # Options: "default", "compact"
```

### Style Parameters

```toml
[params.style]
  fontPreset = "inter"           # "inter" or "google-sans"
  palette = "default"            # "default", "ocean", "forest", "slate"
  primary = "#6C3DBF"            # Custom primary (when palette = "default")
  accent  = "#5FA8A3"            # Custom accent (when palette = "default")
  containerMaxWidth = "1280px"   # Max width of the site container
  maxWidthCh = 75                # Max width of readable content in 'ch' units
```

### Sidebar & Widgets

```toml
[params.sidebar]
  globalPosition = "right"  # Options: "left", "right", "bottom", "off"
  widgets = ["recent", "categories", "tags"]
  recentCount = 5
```

### Homepage Hero

```toml
[params.hero]
  show = false
  title = "Explore Theme"
  tagline = "A minimal, text-heavy theme for Hugo."
  buttonText = "Learn More"
  buttonURL = "/pages/about/"
```

### Single Page & ToC Parameters

```toml
[params.single]
  showPrevNext = true    # Previous/next post navigation
  showRelated = true     # Related posts section
  relatedCount = 4       # Number of related posts

[params.single.toc]
  enable = true          # Can be disabled per-page with `toc: false`
  position = "right"     # Options: "inline", "left", "right", "off"
```

For a deeper guide on visual customization, see [Customizing Your Theme]({{< relref "customizing-your-theme.md" >}}).
