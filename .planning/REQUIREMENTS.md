# Requirements: Explore Theme Enhancement

**Defined:** 2026-01-29
**Core Value:** A typography-focused, content-first reading experience that feels modern and well-crafted

## v1 Requirements

### Code Quality

- [x] **CODE-01**: Fix XSS vulnerability in Fuse.js search results — replace innerHTML with DOM APIs
- [x] **CODE-02**: Consolidate search templates — merge search.html and search/list.html, remove incomplete Algolia stub
- [x] **CODE-03**: Extract inline SVG icons into reusable partials (partials/icons/*.html)
- [x] **CODE-04**: Fix hardcoded /index.json path that breaks subdirectory deployments
- [x] **CODE-05**: Add SRI integrity hash to Fuse.js CDN script or self-host the library
- [x] **CODE-06**: Add error handling and loading states for search

### Typography & Visual Design

- [x] **TYPO-01**: Adopt Inter (sans-serif) and JetBrains Mono (code) fonts, self-hosted with preloading
- [x] **TYPO-02**: Establish modular type scale (1.25 ratio) for headings, body, code, captions, UI elements
- [x] **TYPO-03**: Implement Google-inspired color palette (muted blues/greens) with configurable accent colors
- [x] **TYPO-04**: Design refined dark mode palette (not just inverted light mode)
- [x] **TYPO-05**: Refine typography for technical writing — blockquotes, inline code, code blocks, footnotes, bold/italic

### Layout & Proportions

- [x] **LAYO-01**: Reduce sidebar width so content area clearly dominates the layout
- [x] **LAYO-02**: Implement responsive spacing with clamp() — generous on desktop, tighter on mobile
- [x] **LAYO-03**: Establish consistent vertical rhythm — rem-based heading margins, unified spacing scale
- [x] **LAYO-04**: Add smooth scrolling with scroll-margin-top for sticky header offset on anchor links

### Interactions & Polish

- [x] **INTR-01**: Add card hover + lift animation on article list items (whole item clickable, translateY + shadow)
- [x] **INTR-02**: Standardize excerpt and "Read More" mechanism across all list contexts (home, section, taxonomy)
- [x] **INTR-03**: Show category and tags in article view metadata and list items
- [x] **INTR-04**: Modernize header/navigation styling with animated underlines on nav links
- [x] **INTR-05**: Improve mobile menu interaction and appearance

### Advanced Features

- [x] **ADVN-01**: Active ToC section highlighting via IntersectionObserver scroll-spy
- [x] **ADVN-02**: Sticky sidebar ToC that stays visible while scrolling long posts
- [ ] **ADVN-03**: Code block copy button with language label on fenced code blocks

### Reading Experience

- [ ] **READ-01**: Reading progress indicator bar on single post pages
- [ ] **READ-02**: Smooth theme toggle transition — all colored elements transition between light/dark modes

### CSS & JS Modernization

- [x] **MODZ-01**: Implement 3-tier CSS design token system (primitive → semantic → component)
- [x] **MODZ-02**: Clean up SCSS structure — remove dead CSS, improve section organization
- [x] **MODZ-03**: Modernize JS — IIFE module pattern, IntersectionObserver for scroll, fingerprinting + SRI
- [ ] **MODZ-04**: Consolidate config — centralize defaults partial, reduce redundancy, backward-compatible key migration

## v2 Requirements

### Navigation Enhancements

- **NAV-01**: Heading anchor links — subtle # link on heading hover for section-level sharing
- **NAV-02**: Reading time display in post metadata
- **NAV-03**: Back-to-top floating button after scroll threshold

### Visual Enhancements

- **VISN-01**: Date group dividers in post lists (group by year)
- **VISN-02**: Optional featured image thumbnails in article list items
- **VISN-03**: Print stylesheet — @media print optimized for paper

## Out of Scope

| Feature | Reason |
|---------|--------|
| SPA/animated page transitions | Fights static site model, adds complexity |
| Scroll-triggered fade-in effects | Distracting for reading-focused content |
| Social media share buttons | Clutter, rarely used on technical blogs |
| Per-category color coding | Rainbow effect fights typography focus |
| Infinite scroll | Breaks footer, back button, bookmarking |
| Toast notifications | Unnecessary framework complexity |
| Algolia search | Remove incomplete stub; Fuse.js + Pagefind cover all use cases |
| JavaScript frameworks | Vanilla JS constraint; theme should be lightweight |
| npm/webpack build tools | Hugo Pipes only constraint |
| Comment systems | Not part of theme's core value |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CODE-01 | Phase 1 | Complete |
| CODE-02 | Phase 1 | Complete |
| CODE-03 | Phase 1 | Complete |
| CODE-04 | Phase 1 | Complete |
| CODE-05 | Phase 1 | Complete |
| CODE-06 | Phase 1 | Complete |
| TYPO-01 | Phase 3 | Complete |
| TYPO-02 | Phase 3 | Complete |
| TYPO-03 | Phase 3 | Complete |
| TYPO-04 | Phase 3 | Complete |
| TYPO-05 | Phase 3 | Complete |
| LAYO-01 | Phase 4 | Complete |
| LAYO-02 | Phase 4 | Complete |
| LAYO-03 | Phase 4 | Complete |
| LAYO-04 | Phase 4 | Complete |
| INTR-01 | Phase 5 | Complete |
| INTR-02 | Phase 5 | Complete |
| INTR-03 | Phase 5 | Complete |
| INTR-04 | Phase 5 | Complete |
| INTR-05 | Phase 5 | Complete |
| ADVN-01 | Phase 5 | Complete |
| ADVN-02 | Phase 5 | Complete |
| ADVN-03 | Phase 6 | Pending |
| READ-01 | Phase 6 | Pending |
| READ-02 | Phase 6 | Pending |
| MODZ-01 | Phase 2 | Complete |
| MODZ-02 | Phase 2 | Complete |
| MODZ-03 | Phase 2 | Complete |
| MODZ-04 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 29 total
- Mapped to phases: 29
- Unmapped: 0

---
*Requirements defined: 2026-01-29*
*Last updated: 2026-01-29 after roadmap creation*
