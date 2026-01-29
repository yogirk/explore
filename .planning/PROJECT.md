# Explore Theme Enhancement

## What This Is

Explore is a Hugo theme for technical blogs and academic writing. It emphasizes typography, code samples, long-form content with quotes, bold, italics, footnotes, and table of contents. This milestone is a comprehensive refinement pass — modernizing the visual design, fixing accumulated proportion and configuration debt, cleaning up code quality, and polishing interactions to match modern documentation site standards.

## Core Value

A typography-focused, content-first reading experience that feels modern and well-crafted — the kind of theme where visitors notice the quality within three seconds.

## Requirements

### Validated

- ✓ Hugo static site theme with template inheritance (baseof → page templates) — existing
- ✓ Homepage with optional hero section and paginated post list (default/compact views) — existing
- ✓ Single post pages with configurable ToC and sidebar positioning — existing
- ✓ Dark/light theme toggle with localStorage persistence — existing
- ✓ Client-side search via Fuse.js and Pagefind — existing
- ✓ Responsive layout with CSS Grid — existing
- ✓ SEO metadata: OpenGraph, JSON-LD schema, sitemap, RSS — existing
- ✓ Breadcrumb navigation on post pages — existing
- ✓ Sidebar with pluggable widgets (recent posts, categories, tags) — existing
- ✓ Previous/next post navigation — existing
- ✓ Related posts section below content — existing
- ✓ Figure shortcode with responsive image processing — existing
- ✓ Callout shortcode — existing
- ✓ Pagination — existing
- ✓ Sticky header — existing
- ✓ Mobile hamburger menu — existing
- ✓ i18n support structure — existing

### Active

**Typography & Visual Design**
- [ ] Adopt a clean geometric sans-serif font evoking Google Sans (e.g., Inter, Plus Jakarta Sans, or similar)
- [ ] Establish a coherent type scale for headings, body, code, captions, and UI elements
- [ ] Refine typographic details for technical writing: blockquotes, inline code, code blocks, footnotes, bold/italic
- [ ] Shift color palette to Google-inspired muted blues/greens with configurable accent colors
- [ ] Ensure dark mode palette is equally refined (not just inverted)

**Proportions & Layout**
- [ ] Reduce sidebar width — content area should clearly dominate
- [ ] Audit and fix spacing/whitespace across all page types (home, list, single, taxonomy)
- [ ] Ensure consistent vertical rhythm across typography and components

**Interactions & Polish**
- [ ] Add subtle card-lift hover effect on article list items (whole item clickable)
- [ ] Improve "Posts" list view — less dull, better visual hierarchy
- [ ] Make excerpt and "Read More" mechanism consistent across all list contexts (home, section, taxonomy)
- [ ] Show category and tags in article view metadata (alongside breadcrumbs)
- [ ] Modernize header/navigation styling for both desktop and mobile
- [ ] Improve mobile menu interaction and appearance

**Code Quality & Bugs**
- [ ] Fix XSS vulnerability in Fuse.js search results (innerHTML with user content)
- [ ] Fix inconsistent search engine defaults between search.html and search/list.html
- [ ] Resolve incomplete Algolia implementation (implement or remove)
- [ ] Add SRI integrity hash to Fuse.js CDN script or self-host
- [ ] Add error handling and loading states for search
- [ ] Remove dead/unused code paths

**CSS & JS Modernization**
- [ ] Modernize CSS: better use of custom properties, container queries, modern layout patterns
- [ ] Clean up SCSS structure — remove accumulated iteration debt
- [ ] Improve JS: clean up search modules, theme toggle, event handling
- [ ] Consider critical CSS extraction or stylesheet splitting

**Configuration Cleanup**
- [ ] Audit all config parameters — remove redundant/unused options
- [ ] Organize remaining config into logical groups with clear naming
- [ ] Set sensible defaults so the theme works well with minimal configuration
- [ ] Document configuration options clearly

### Out of Scope

- Real-time features or SPA behavior — this is a static site theme
- Adding new search engines — focus on making Fuse.js and Pagefind work well (remove Algolia stub or implement minimally)
- Major structural changes to Hugo template hierarchy — enhance within current architecture
- Custom JavaScript framework adoption — stay with vanilla JS
- Blog comment systems — not part of the theme's core value
- E-commerce or membership features — wrong scope for a blog theme
- Automated testing infrastructure — manual testing via exampleSite is sufficient for a Hugo theme

## Context

- The theme has gone through many iterations, accumulating proportion drift (sidebar too wide), configuration sprawl, and inconsistent patterns
- The codebase map at `.planning/codebase/` documents the current architecture, stack, conventions, and known concerns in detail
- Reference aesthetic: Google ADK docs site (https://google.github.io/adk-docs/) — clean, spacious, typography-driven
- The theme targets technical bloggers writing about code, academic topics, and long-form content
- Hugo Pipes handles the asset pipeline (SCSS compilation, JS minification, fingerprinting)
- The theme already uses CSS custom properties for theming, but they need refinement
- Current SCSS follows numbered section organization (Abstracts, Base, Layout, Components)
- No automated tests — testing happens via the exampleSite

## Constraints

- **Tech stack**: Hugo static site generator — all changes must work within Hugo's template system and Pipes asset pipeline
- **No build tools**: No npm/webpack/vite — Hugo Pipes is the only asset processor
- **Browser support**: Modern browsers with ES6, CSS Grid, CSS Custom Properties (progressive enhancement for older browsers)
- **Vanilla JS**: No JavaScript frameworks — keep client-side code minimal and framework-free
- **Backward compatibility**: Existing users' config.toml files should continue to work after config cleanup (deprecate gracefully where needed)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Google Sans-inspired font, not exact Google Sans | Flexibility and licensing simplicity; similar aesthetic achievable with open alternatives | -- Pending |
| Google-inspired palette with configurable accents | Ships with good defaults but respects user customization needs | -- Pending |
| Keep sidebar widgets, fix proportions | Widgets aid content navigation; the problem is width, not existence | -- Pending |
| Subtle card-lift hover for article items | Adds interaction affordance without being heavy-handed | -- Pending |
| Remove Algolia stub unless trivially implementable | Incomplete implementation is worse than no implementation | -- Pending |
| Stay vanilla JS | Keeps the theme lightweight and dependency-free; Hugo themes should be simple | -- Pending |

---
*Last updated: 2026-01-29 after initialization*
