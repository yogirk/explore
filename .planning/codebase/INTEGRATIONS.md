# External Integrations

**Analysis Date:** 2026-01-28

## APIs & External Services

**Search Libraries (Client-Side):**
- Fuse.js v6 - Lightweight fuzzy search (default)
  - CDN: `https://cdn.jsdelivr.net/npm/fuse.js@6/dist/fuse.min.js`
  - Integration: `layouts/search.html` line 20, `assets/js/search-fuse.js`
  - Configuration: Set `params.ui.searchEngine = "fuse"` in `config.toml`
  - No API key required - purely client-side

- Pagefind - Static site search indexing (alternative)
  - Installation: `npm install -g pagefind`
  - CLI Usage: `pagefind --site public` (run after Hugo build)
  - UI CSS: `/pagefind/pagefind-ui.css` (served from output directory)
  - UI JS: `/pagefind/pagefind-ui.js` (loaded dynamically)
  - Integration: `layouts/search.html` lines 24-30, `assets/js/search-pagefind.js`
  - Configuration: Set `params.ui.searchEngine = "pagefind"` in `config.toml`
  - No API key required - generates static index

**Analytics (Optional):**
- Google Analytics (optional, not enabled by default)
  - Hook: `layouts/partials/analytics.html` (intentionally empty)
  - Implementation: Add custom analytics by creating `/layouts/partials/analytics.html` in site root
  - Example: `https://www.googletagmanager.com/gtag/js?id=YOUR_ID`
  - No default configuration - user provides their own tracking ID

## Data Storage

**Databases:**
- None - Static site theme with no backend database

**File Storage:**
- Local filesystem only
  - Content stored in `exampleSite/content/` directory
  - Static assets in `static/` directory
  - Theme assets in `assets/` directory (CSS, JS, images)
  - No cloud storage integration required

**Search Index:**
- Hugo-generated JSON index: `layouts/index.json`
  - Generated at build time from site content
  - Includes: title, uri, content, tags, categories
  - Consumed by Fuse.js search via `/index.json` HTTP fetch
  - Pagefind generates its own index: `pagefind/pagefind.js` (build artifact)

**Caching:**
- Browser caching via fingerprinted assets
- No server-side caching layer required
- Static files can be cached indefinitely due to content hash in filenames

## Authentication & Identity

**Auth Provider:**
- None - Static site theme requires no authentication
- No user accounts or login functionality
- Comments/interactions would require external third-party service (not built-in)

**Author Metadata:**
- Defined in `config.toml`: `author = "Your Name"`
- Per-page override possible: `params.author` in front matter
- Used in schema.org JSON-LD output: `layouts/partials/seo/schema.html` line 14

## Monitoring & Observability

**Error Tracking:**
- None - No built-in error tracking
- Client-side errors logged to browser console only
- Search integration includes error logging:
  - Fuse.js: `console.error('Failed to fetch search index:', error)` in `assets/js/search-fuse.js` line 24
  - Pagefind: `console.error("Failed to load Pagefind UI:", e)` in `assets/js/search-pagefind.js` line 20

**Logs:**
- Browser console only (no backend logging)
- Hugo build logs (when running `hugo server` or `hugo`)
- No persistent log storage

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (demonstrated in theme.toml: `demosite = "https://yogirk.github.io/explore/"`)
- Any static file host: Netlify, Vercel, AWS S3, traditional web hosting
- Configuration: `baseURL` in `config.toml` must match deployment URL
- Example: `baseURL = "https://yogirk.github.io/explore/"`

**CI Pipeline:**
- Not built-in - Theme is agnostic to CI/CD system
- Typical workflow:
  1. Commit markdown content
  2. Run Hugo build: `hugo`
  3. Run Pagefind (if enabled): `npx pagefind --site public`
  4. Deploy `public/` or `docs/` directory to hosting

**Build Artifacts:**
- Hugo output directory (configurable): `publishDir = "../docs"` in `exampleSite/config.toml`
- Contains:
  - HTML files from templates
  - CSS from `assets/css/main.scss` (minified, fingerprinted)
  - JS from `assets/js/*` (minified, fingerprinted)
  - Static assets from `static/` directory
  - Search index: `index.json` (if JSON in outputs)
  - Pagefind output: `pagefind/` directory (if using Pagefind)

**Build Commands:**
```bash
# Standard Hugo build
hugo

# Hugo with draft content included
hugo -D

# Hugo development server
hugo server

# Post-build Pagefind indexing (if using Pagefind search)
npx pagefind --site public
```

## SEO Integrations

**Metadata:**
- Schema.org JSON-LD: `layouts/partials/seo/schema.html`
  - Generates BlogPosting or WebSite schema
  - Includes: headline, description, datePublished, dateModified, author, url
  - No external service - embedded in HTML

- OpenGraph meta tags: `layouts/partials/seo/opengraph.html`
  - For social media preview cards
  - Includes: og:title, og:description, og:type, og:image, og:url
  - Article-specific: article:section, article:tag, article:published_time, article:modified_time

- Twitter Cards: `layouts/partials/seo/opengraph.html` lines 22-28
  - `twitter:card = "summary_large_image"`
  - Includes title, description, image

**Sitemap:**
- Generated automatically by Hugo
- Location: `/sitemap.xml` (standard)
- No external service required

**Robots.txt:**
- Template: `layouts/robots.txt`
- Customizable via theme

**RSS/Feeds:**
- Configured: `home = ["HTML", "RSS", "JSON"]` in `config.toml`
- Location: `/index.xml` (RSS feed)
- Location: `/index.json` (JSON feed for Fuse.js search)

## Environment Configuration

**Required env vars:**
- None - Theme requires no environment variables
- All configuration via `config.toml` file

**Recommended config params in config.toml:**
```toml
baseURL = "https://your-domain.com/"
languageCode = "en-us"
title = "Your Site Title"
theme = "explore"

[outputs]
  home = ["HTML", "RSS", "JSON"]  # Required if using Fuse.js

[build]
  writeStats = true  # Required for Hugo Pipes

[params]
  author = "Your Name"
  description = "Your site description"

  [params.ui]
    searchEngine = "fuse"  # or "pagefind"

  [params.style]
    primary = "#6C3DBF"      # Primary color hex
    accent = "#5FA8A3"       # Accent color hex
```

**Optional analytics setup:**
Create `/layouts/partials/analytics.html` in your Hugo site root:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GOOGLE_ANALYTICS_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GOOGLE_ANALYTICS_ID');
</script>
```

**Secrets location:**
- No secrets required (static site, no backend)
- API keys (if using analytics) stored in site configuration
- Recommendation: Use environment variable substitution in CI/CD if needed

## Webhooks & Callbacks

**Incoming:**
- None - Static site theme, no HTTP endpoints
- Content updates via Git commits and Hugo rebuild

**Outgoing:**
- None - No outgoing webhooks or callbacks
- Theme is purely generative (produces static HTML)

---

*Integration audit: 2026-01-28*
