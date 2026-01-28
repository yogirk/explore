# Architecture

**Analysis Date:** 2026-01-28

## Pattern Overview

**Overall:** Theme-based template architecture (Hugo Static Site Generator)

**Key Characteristics:**
- Server-side rendering of static HTML from content files and templates
- Modular partial-based composition system for page components
- Configuration-driven feature toggling and customization
- Client-side progressive enhancement for interactivity
- Template inheritance via base template and content blocks

## Layers

**Template Layer (Layouts):**
- Purpose: Define page structure and render content at build time
- Location: `layouts/`
- Contains: HTML templates with Hugo template syntax, component composition
- Depends on: Content data from `content/` directory, site configuration
- Used by: Hugo build process to generate static HTML pages

**Partial Components Layer:**
- Purpose: Reusable template fragments for layout composition
- Location: `layouts/partials/`
- Contains: HTML template snippets for header, footer, sidebar, widgets, SEO
- Depends on: Site configuration parameters, content metadata
- Used by: Base templates and other partials via `{{ partial }}` function

**Asset Pipeline Layer:**
- Purpose: Process and minimize CSS and JavaScript
- Location: `assets/css/`, `assets/js/`
- Contains: SCSS stylesheets and JavaScript modules
- Depends on: Hugo Pipes for processing, site parameters for theming
- Used by: `head.html` partial for CSS injection, `baseof.html` for JS inclusion

**Content Definition Layer:**
- Purpose: Define page templates and site structure
- Location: `content/`, `data/`, `i18n/`, `archetypes/`
- Contains: Content files in Markdown, configuration data in YAML, translation strings
- Depends on: Front matter schema defined in archetypes
- Used by: Layout templates for data binding and rendering

**Static Assets Layer:**
- Purpose: Serve unchanging resources directly
- Location: `static/`, `images/`
- Contains: Images, fonts, manifests, favicons
- Depends on: None (served as-is)
- Used by: Partials and CSS for images, head partial for icons

**Configuration Layer:**
- Purpose: Define site-wide settings and feature toggles
- Location: `theme.toml`, `exampleSite/config.toml`, Hugo config
- Contains: Theme metadata, site parameters, output settings, pagination rules, menu definitions
- Depends on: Hugo configuration schema
- Used by: All templates and partials for settings and feature flags

## Data Flow

**Page Rendering Flow:**

1. User requests `/posts/` URL
2. Hugo matches URL to content type (section list page)
3. Template resolver loads `layouts/_default/list.html` or `layouts/section.html`
4. Base template `baseof.html` loads:
   - `partials/head.html` (CSS processing, SEO metadata)
   - `partials/header.html` (navigation, search, theme toggle)
5. List template renders main block:
   - Fetches pages for current section via `.Pages` or `.Paginate`
   - Maps each page through `partials/post/list-item-default.html`
   - Appends pagination via `partials/pagination.html`
6. If sidebar enabled:
   - Renders `partials/sidebar.html` with selected widgets
   - Each widget partial queries site data (recent posts, categories, tags)
7. Footer loads via `partials/footer.html`
8. Defer-loaded JS from `assets/js/minimal.js`
9. Hugo outputs complete HTML to `docs/` directory

**Single Post Rendering Flow:**

1. User requests `/posts/my-post/` URL
2. Hugo matches to post page type
3. `layouts/_default/single.html` loads
4. Baseof template includes head, header, footer as above
5. Single template determines layout:
   - Checks front matter for ToC and sidebar settings
   - Resolves sidebar position (left, right, off, bottom)
   - Resolves ToC position (inline, left, right, off)
6. Renders article with:
   - Breadcrumbs via `partials/breadcrumbs.html`
   - Post metadata (date, author) from front matter
   - Table of contents if enabled and position allows
   - Content from Markdown processing
   - Tags as links at bottom
7. Renders sidebar with combined ToC and widgets
8. Previous/next navigation via `partials/post/prevnext.html`
9. Related posts via `partials/post/related.html` (uses Hugo related content feature)
10. JavaScript initializes theme toggle and mobile menu

**State Management:**

- Theme state: Stored in `localStorage` as `theme` key (light/dark)
- Navigation state: Managed via DOM classes on menu button and nav element
- Responsive state: Media queries and CSS grid handle layout changes
- Search index: Generated at build time as JSON output format

## Key Abstractions

**Page Template Abstraction:**
- Purpose: Provide consistent interface for content pages
- Examples: `layouts/_default/list.html`, `layouts/_default/single.html`, `layouts/section.html`
- Pattern: Template blocks with fallback inheritance chain - specific type templates override generic defaults

**Partial Components:**
- Purpose: Composable, reusable UI fragments
- Examples: `partials/header.html`, `partials/sidebar.html`, `partials/post/list-item-default.html`
- Pattern: Context-aware partials accept `.` or named parameters via dicts, read site config for settings

**Widget System:**
- Purpose: Pluggable sidebar content via configuration
- Examples: `partials/widgets/recent.html`, `partials/widgets/categories.html`, `partials/widgets/tags.html`
- Pattern: Widgets registered in config `params.sidebar.widgets` array, loaded dynamically in sidebar partial

**Layout Grid System:**
- Purpose: Flexible responsive layout supporting sidebar on left/right or bottom
- Pattern: CSS Grid with configurable grid areas, sidebar position toggled via CSS classes and template conditionals
- Files: `assets/css/main.scss` defines `.layout-grid` and `.layout-grid--sidebar-{position}` classes

**Sidebar Positioning System:**
- Purpose: Configure placement of ToC and widget sidebars per-page or globally
- Pattern: Settings cascade: page front matter → global config → defaults
- Files: `layouts/_default/single.html` and `layouts/_default/list.html` implement cascade logic

**Search Index Generation:**
- Purpose: Provide data for client-side search
- Pattern: Hugo outputs JSON format from `layouts/index.json` at site root
- Files: `layouts/index.json` for JSON search index, `assets/js/search-fuse.js` and `assets/js/search-pagefind.js` for runtime search

## Entry Points

**Homepage:**
- Location: `layouts/index.html`
- Triggers: Request to site root `/`
- Responsibilities: Render hero section if enabled, paginated post list with configurable view style (default/compact), widgets

**Post List (Section/Category/Tag):**
- Location: `layouts/_default/list.html`, `layouts/section.html`, `layouts/taxonomy.html`, `layouts/terms.html`
- Triggers: Requests to `/posts/`, `/categories/`, `/tags/`, etc.
- Responsibilities: Render collection of pages with pagination, sidebar support, breadcrumbs

**Single Post:**
- Location: `layouts/_default/single.html`
- Triggers: Request to individual post `/posts/my-post/`
- Responsibilities: Render full content with metadata, configurable ToC, sidebar, prev/next navigation, related posts

**Search Page:**
- Location: `layouts/search.html`, `layouts/search/list.html`
- Triggers: Request to `/search/`
- Responsibilities: Render search interface, load JSON index, initialize search JavaScript

**404 Page:**
- Location: `layouts/404.html`
- Triggers: Non-existent page request
- Responsibilities: Display not found message with helpful navigation

**Base Template:**
- Location: `layouts/_default/baseof.html`
- Triggers: Inherited by all page templates
- Responsibilities: Wrap all content with `<html>`, `<head>`, `<body>`, load analytics, defer-load minimal.js

## Error Handling

**Strategy:** Defensive templating with fallback defaults

**Patterns:**
- `{{ with }}` blocks for optional content (author, description, tags)
- `{{ if isset }}` checks before accessing nested parameters
- `| default` filters to provide fallback values when variables are empty
- Graceful degradation: sidebar, ToC, widgets disable when settings are off
- Missing images: Placeholder image path defined, alt text always provided

## Cross-Cutting Concerns

**Logging:** Not applicable (static generation, no runtime logs)

**Validation:** Configuration validation happens at theme definition; front matter defaults in archetypes

**Authentication:** Not applicable (static site, no user authentication)

**SEO:** Implemented via:
- `partials/seo/opengraph.html`: OpenGraph meta tags for social sharing
- `partials/seo/schema.html`: JSON-LD structured data for search engines
- Canonical URLs in all pages
- XML sitemap generation (Hugo built-in)
- RSS feed output (Hugo built-in)

**Accessibility:** Implemented via:
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`)
- ARIA attributes on interactive elements (buttons, toggle states)
- Keyboard navigation support via HTML form controls
- Color contrast compliance via CSS variables and theming
- Alt text for all images
- Proper heading hierarchy

**Responsive Design:** CSS Grid and media queries:
- Sidebar positioning adapts based on viewport
- Navigation menu collapses to hamburger on mobile
- Container queries or viewport-relative sizing for readability

---

*Architecture analysis: 2026-01-28*
