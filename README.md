# Explore - A Hugo Theme

**Explore** is a minimal, text-heavy theme for [Hugo](https://gohugo.io/). It is designed for academic sites, personal blogs, and essays, and prioritizes readability, performance, accessibility, and maintainability.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://yogirk.github.io/explore/)


<p align="center">
  <img src="explore-light-mode.png" alt="Explore Theme Light Mode" width="49%">
  <img src="explore-dark-mode.png" alt="Explore Theme Dark Mode" width="49%">
</p>

## Features

### Performance & Security

- **Subresource Integrity (SRI):** All generated CSS and JS include integrity hashes.
- **IIFE JavaScript:** All scripts are wrapped in immediately-invoked function expressions to avoid global scope pollution.
- **Self-Hosted Fonts:** Two font presets (Inter, Google Sans) are bundled locally — no external requests.
- **Hugo Pipes:** CSS is processed, minified, and fingerprinted through Hugo's asset pipeline.

### Design System

- **Design Tokens:** Three-tier CSS custom property architecture (primitive, semantic, component).
- **Font Presets:** Switch between `inter` and `google-sans` with a single config line.
- **Color Palettes:** Four built-in palettes (`default`, `ocean`, `forest`, `slate`) with independent light/dark values.
- **Fluid Spacing:** Clamp-based spacing scale that adapts between mobile and desktop.
- **Type Scale:** Minor Third (1.2x) typographic scale from body to display sizes.

### Accessibility & UX

- **WCAG 2.1 AA:** Semantic HTML, ARIA landmarks, keyboard navigation, and sufficient contrast ratios.
- **Dark Mode:** Automatic detection via `prefers-color-scheme` with manual toggle and localStorage persistence.
- **Independent Dark Palettes:** Each color palette defines its own dark-mode overrides for optimal contrast.
- **Smooth Toggle Transitions:** Theme switch applies CSS transitions to avoid flash of unstyled content.

### Interactive Features

- **Reading Progress Bar:** A thin progress indicator at the top of the viewport on single posts.
- **Code Copy Button:** One-click copy with language label and "Copied!" confirmation on all code blocks.
- **Card Hover Effects:** Post cards lift with shadow elevation and title color change on hover.
- **ScrollSpy Table of Contents:** Active heading is highlighted in the sidebar ToC as you scroll.
- **Breadcrumb Navigation:** Hierarchical breadcrumbs on all inner pages.

### Content & SEO

- **Client-Side Search:** Choose between Fuse.js (zero-config) or Pagefind (for large sites).
- **Server-Rendered Widgets:** Sidebar widgets for recent posts, categories, and tags.
- **Responsive Figure Shortcode:** Generates WebP with LQIP blur-up placeholders and `srcset` for responsive images.
- **SEO Metadata:** JSON-LD structured data, OpenGraph, and Twitter Card tags on every page.
- **Centralized Config Defaults:** Every parameter has a documented default in a single partial — override only what you need.

## Quickstart

For a detailed walkthrough, see the [Getting Started Guide](exampleSite/content/posts/hello-world.md). Here's the short version:

1.  **Add the theme as a submodule:**
    From the root of your Hugo site, run:
    ```bash
    git submodule add https://github.com/yogirk/explore.git themes/explore
    ```

2.  **Use the example configuration:**
    Copy the example configuration file from the theme to your site's root directory. This is the fastest way to see all features in action.
    ```bash
    cp themes/explore/exampleSite/config.toml .
    ```
    The example `config.toml` already has `theme = "explore"` set.

3.  **Run the Hugo server:**
    ```bash
    hugo server
    ```
    Your site is now available at `http://localhost:1313/`.

## Configuration

All theme options are configured in your site's `config.toml` file under the `[params]` section.

```toml
# --- Site-level settings ---
baseURL = "https://example.org/"
languageCode = "en-us"
title = "Explore Theme"
theme = "explore"
summaryLength = 70 # Default length of auto-generated summaries

[outputs]
  home = ["HTML", "RSS", "JSON"] # Required for Fuse.js search

[build]
  writeStats = true # Required for Hugo Pipes

[pagination]
  pagerSize = 5

# --- Theme Parameters ---
[params]
  author = "Your Name"
  description = "A description of your site."
  logo = "images/logo.svg" # Path to logo in /static. Leave empty for text.
  tagline = "Your site's tagline."

  # --- UI Settings ---
  [params.ui]
    stickyHeader = true
    showSearch = true
    searchEngine = "fuse" # "fuse" or "pagefind"
    homeView = "default"  # "default" or "compact"

  # --- Style Settings ---
  [params.style]
    fontPreset = "inter"          # "inter" or "google-sans"
    palette = "default"           # "default", "ocean", "forest", or "slate"
    primary = "#6C3DBF"           # Custom primary (used when palette = "default")
    accent  = "#5FA8A3"           # Custom accent (used when palette = "default")
    containerMaxWidth = "1280px"
    maxWidthCh = 75

  # --- Widgets & Sidebar ---
  [params.sidebar]
    globalPosition = "right" # "left", "right", "bottom", or "off"
    widgets = ["recent", "categories", "tags"]
    recentCount = 5

  # --- Homepage Hero ---
  [params.hero]
    show = false
    title = "Explore Theme"
    tagline = "A minimal, text-heavy theme for Hugo."
    buttonText = "Learn More"
    buttonURL = "/pages/about/"

  # --- List Page Settings ---
  [params.list]
    showExcerpt = true

  # --- Single Page Settings ---
  [params.single]
    showPrevNext = true
    showRelated = true
    relatedCount = 4
    [params.single.toc]
      enable = true
      position = "right" # "inline", "left", "right", or "off"
```

## Font & Color Customization

### Font Presets

| Preset | Sans-Serif | Monospace | Character |
|--------|-----------|-----------|-----------|
| `inter` (default) | Inter | JetBrains Mono | Clean, neutral, highly legible |
| `google-sans` | Google Sans Flex | Google Sans Code | Friendly, geometric, modern |

Set via `params.style.fontPreset` in your `config.toml`. Both presets are self-hosted — no external font requests are made.

### Color Palettes

| Palette | Light Primary | Light Accent | Character |
|---------|--------------|-------------|-----------|
| `default` | `#1a73e8` | `#1e8e3e` | Familiar blue/green — works everywhere |
| `ocean` | `#0077b6` | `#00838f` | Deep teal — calm, professional |
| `forest` | `#2d6a4f` | `#52b788` | Natural green — warm, organic |
| `slate` | `#475569` | `#64748b` | Understated gray — minimal, editorial |

Each palette defines independent dark-mode overrides to maintain contrast and readability. When `palette` is set to anything other than `default`, the `primary` and `accent` values in your config are ignored in favor of the palette's built-in values.

## Interactive Features

The following features are enabled automatically with no configuration required:

- **Reading progress bar** — visible on single post pages as you scroll
- **Code copy button** — appears on every fenced code block with language detection
- **Card hover effects** — post cards on list pages lift with shadow and title highlight
- **ScrollSpy ToC** — active heading tracked in sidebar table of contents (when `toc.position` is `left` or `right`)
- **Breadcrumbs** — hierarchical navigation shown on inner pages
- **Smooth theme toggle** — light/dark switch with CSS transitions (no flash)

## Search Setup

The theme supports two client-side search engines, configured via `params.ui.searchEngine`.

### 1. Fuse.js (Default & Easiest)

Fuse.js is a lightweight fuzzy search library that works out of the box with zero extra build steps. It's ideal for small to medium-sized sites.

**Setup:**
1.  Set `searchEngine = "fuse"` in `config.toml`.
2.  Ensure `JSON` is in your homepage's `outputs` in `config.toml`.

### 2. Pagefind

Pagefind is a powerful static search solution suitable for larger sites. It requires an extra command-line step after building.

**Setup:**
1.  Set `searchEngine = "pagefind"` in `config.toml`.
2.  Install the Pagefind CLI: `npm install -g pagefind`.
3.  After building your site with `hugo`, run Pagefind to index the output:
    ```bash
    hugo
    npx pagefind --site public
    ```

## Shortcodes

### Figure

A shortcode for responsive, optimized images. It generates WebP format with LQIP (Low-Quality Image Placeholder) blur-up effect and `srcset` for responsive sizing.

```go-html-template
{{</* figure
  src="my-image.jpg"
  alt="An accessible description"
  caption="A **Markdown** caption."
*/>}}
```

### Callout

A shortcode to create styled boxes to draw attention to important information.

```go-html-template
{{</* callout type="info" */>}}
**Info:** This is an informational callout. It's useful for tips and notes.
{{</* /callout */>}}

{{</* callout type="warning" */>}}
**Warning:** This is a warning callout. Use it for important caveats.
{{</* /callout */>}}
```

## License

The Explore theme is licensed under the **MIT** license. See `LICENSE` for more details.
