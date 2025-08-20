# Explore - A Hugo Theme

**Explore** is a minimal, text-heavy theme for [Hugo](https://gohugo.io/), designed for academic sites, personal blogs, and essays. It prioritizes readability, performance, accessibility, and maintainability.

![Explore Theme Light Mode](exampleSite/static/screenshots/light.png)
![Explore Theme Dark Mode](exampleSite/static/screenshots/dark.png)

## Features

- **High Performance:** Minimal CSS and JS, with performance budgets in mind.
- **Accessible:** WCAG 2.1 AA compliant, with full keyboard navigation and screen-reader support.
- **Responsive & Modern:** Looks great on all devices, with a clean, modern aesthetic.
- **Dark Mode:** Automatic and manual dark mode switching.
- **Configurable Search:** Choose between client-side search with Fuse.js or Pagefind.
- **Widgets:** Server-rendered widgets for recent posts, categories, and tags.
- **SEO Optimized:** Includes JSON-LD, OpenGraph, and Twitter Card metadata.
- **Hugo Pipes:** Uses Hugo's asset pipeline for CSS processing.

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
    primary = "#6C3DBF"
    accent  = "#5FA8A3"
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

A powerful shortcode for responsive, optimized images with a "blur-up" placeholder effect.

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