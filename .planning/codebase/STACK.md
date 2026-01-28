# Technology Stack

**Analysis Date:** 2026-01-28

## Languages

**Primary:**
- Go (Template Language) - Hugo templates for static site generation and layout definitions
- SCSS - Stylesheet preprocessing for CSS generation in `assets/css/main.scss`
- HTML - Template markup in `layouts/` directory
- JavaScript - Client-side interactivity and search functionality in `assets/js/`
- TOML - Configuration files (`config.toml`, `theme.toml`)
- YAML - Data files in `data/navigation.yaml`

## Runtime

**Environment:**
- Hugo (Static Site Generator) - Core runtime for building the theme

**Build System:**
- Hugo Pipes - Asset pipeline for CSS processing and minification
- Hugo Resources API - Handles asset compilation and fingerprinting

## Frameworks

**Core:**
- Hugo - Static site generator framework (version not explicitly pinned)

**Search (Optional - Configurable):**
- Fuse.js v6 - Client-side fuzzy search library (default option)
- Pagefind - Powered search solution for larger sites (alternative option)

**Frontend Utilities:**
- Vanilla JavaScript - No framework, plain DOM manipulation and event handling

## Key Dependencies

**Critical:**
- Fuse.js (npm/CDN) - Lightweight fuzzy search: `https://cdn.jsdelivr.net/npm/fuse.js@6/dist/fuse.min.js`
  - Why: Powers client-side search functionality when `searchEngine: "fuse"` is configured
  - Located at: `assets/js/search-fuse.js`

- Pagefind (CLI tool + npm package) - Static search solution for large sites
  - Why: Alternative search engine for better performance on content-heavy sites
  - Installation: `npm install -g pagefind`
  - Usage: Post-build step after Hugo generates public directory
  - Located at: `assets/js/search-pagefind.js`

**Frontend:**
- None required - Theme uses native browser APIs and vanilla JavaScript

## Configuration

**Environment:**
- Configuration in `config.toml` or site's root configuration file
- Theme parameters under `[params]` section in TOML format
- No environment variables required for core functionality

**Build Configuration:**
- Hugo build settings in `config.toml`:
  - `[build]` section with `writeStats = true` (required for Hugo Pipes)
  - `[outputs]` section with `home = ["HTML", "RSS", "JSON"]` (required for Fuse.js search)
  - `publishDir = "../docs"` (customizable output directory)

**Theme Configuration:**
```toml
[params]
  author = "Your Name"
  description = "Site description"
  logo = "images/logo.svg"
  tagline = "Site tagline"

  [params.ui]
    stickyHeader = true
    showSearch = true
    searchEngine = "fuse"  # or "pagefind"
    homeView = "default"

  [params.style]
    primary = "#6C3DBF"
    accent = "#5FA8A3"
    containerMaxWidth = "1280px"
    maxWidthCh = 75

  [params.sidebar]
    globalPosition = "right"
    widgets = ["recent", "categories", "tags"]
    recentCount = 5
```

**CSS Variables:**
- Dynamically injected via Hugo's `resources.ExecuteAsTemplate` in `layouts/partials/head.html`
- All color and spacing values are customizable through `config.toml` parameters

## Platform Requirements

**Development:**
- Hugo (static site generator) - Required to build and serve the theme
  - No specific version constraint documented
  - Version should be compatible with Hugo Pipes and Resources API
- Node.js + npm (if using Pagefind as search engine)
  - Pagefind CLI: Install globally with `npm install -g pagefind`
- Git (for using theme as submodule): `git submodule add https://github.com/yogirk/explore.git themes/explore`

**Production:**
- Hugo build output (static HTML, CSS, JS files)
- Web server capable of serving static files (any HTTP server: Nginx, Apache, GitHub Pages, Netlify, Vercel, etc.)
- No server-side runtime required
- Browser support: Modern browsers with ES6 support
  - Theme uses native CSS Grid, CSS Custom Properties, localStorage API
  - Graceful degradation for older browsers (progressive enhancement)

## Asset Pipeline

**CSS Processing:**
- SCSS source: `assets/css/main.scss`
- Hugo Pipes: `resources.ExecuteAsTemplate` for template processing, `toCSS` for compilation, `fingerprint` for cache-busting
- Output: Minified, fingerprinted CSS file
- Execution: `layouts/partials/head.html` line 26

**JavaScript:**
- Minification: `resources.Minify` for all JS files
- Bundling: No bundler required - theme loads individual scripts with `defer` attribute
- Scripts minified and fingerprinted at build time
- Main script: `assets/js/minimal.js` (theme toggle, navigation, sticky header)
- Search scripts: `assets/js/search-fuse.js` or `assets/js/search-pagefind.js` (conditional load)

**Image Optimization:**
- Built-in shortcode: `figure` shortcode with responsive image handling
- Located at: `layouts/shortcodes/figure.html`
- Uses Hugo's image processing: `Resize`, `Fill`, `Fit` for multiple variants
- Lazy loading: `loading="lazy"` on images
- Blur-up placeholder effect support

---

*Stack analysis: 2026-01-28*
