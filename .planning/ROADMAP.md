# Roadmap: Explore Theme Enhancement

## Overview

This roadmap takes the Explore Hugo theme from its current state -- functional but carrying accumulated debt in code quality, visual consistency, and configuration sprawl -- to a modern, typography-focused reading experience that feels crafted within three seconds. The six phases progress from foundational cleanup through visual systems, layout, interactions, and polish, ending with configuration consolidation so existing users are never broken mid-journey.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Code Quality** - Fix security bugs, consolidate search, extract reusable partials
- [x] **Phase 2: CSS & JS Modernization** - Design token system, SCSS restructuring, JS module cleanup
- [x] **Phase 3: Typography & Color** - Font system, type scale, color palette, refined dark mode
- [x] **Phase 3.1: Font & Color Presets** - Google Sans bundle, named color palettes, config.toml preset selection (INSERTED)
- [x] **Phase 4: Layout & Proportions** - Sidebar ratios, spacing system, vertical rhythm, smooth scroll
- [x] **Phase 5: Interactions & Navigation** - Card hover, excerpt standardization, nav polish, ToC features
- [ ] **Phase 6: Polish & Configuration** - Code copy, reading progress, theme transitions, config consolidation

## Phase Details

### Phase 1: Code Quality
**Goal**: The codebase is secure, DRY, and free of broken or dead paths -- a clean foundation for all subsequent visual and structural changes
**Depends on**: Nothing (first phase)
**Requirements**: CODE-01, CODE-02, CODE-03, CODE-04, CODE-05, CODE-06
**Success Criteria** (what must be TRUE):
  1. Search results render without innerHTML -- pasting `<img src=x onerror=alert(1)>` as a search term produces no script execution
  2. A single search template handles all search functionality, with no Algolia remnants in the codebase
  3. SVG icons used across templates come from partials/icons/*.html, not inline SVG blocks
  4. The theme deploys correctly in a subdirectory (e.g., /blog/) with search and all paths working
  5. Fuse.js loads with SRI integrity verification or from a self-hosted copy, and search shows loading/error states
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md -- Fix XSS, self-host Fuse.js with SRI, add search loading/error states
- [x] 01-02-PLAN.md -- Consolidate search templates, remove Algolia, fix subdirectory paths
- [x] 01-03-PLAN.md -- Extract inline SVG icons into reusable partials

### Phase 2: CSS & JS Modernization
**Goal**: A systematic design token architecture and clean SCSS/JS structure that makes visual changes in later phases safe, predictable, and maintainable
**Depends on**: Phase 1
**Requirements**: MODZ-01, MODZ-02, MODZ-03
**Success Criteria** (what must be TRUE):
  1. CSS custom properties follow a 3-tier system (primitive -> semantic -> component) and changing a primitive token cascades correctly through semantic and component layers
  2. SCSS file has clear section organization with no dead/unreachable CSS rules remaining
  3. JavaScript uses IIFE module pattern with no global variable pollution, and JS assets are fingerprinted
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md -- Implement 3-tier CSS design token system and wire component tokens
- [x] 02-02-PLAN.md -- Clean up SCSS section organization, remove dead code, migrate toCSS to css.Sass
- [x] 02-03-PLAN.md -- IIFE-wrap JS, replace scroll with IntersectionObserver, add fingerprint + SRI

### Phase 3: Typography & Color
**Goal**: The theme has a distinctive, cohesive visual identity -- clean geometric sans-serif type, a modular scale, and a refined color system that looks equally good in light and dark modes
**Depends on**: Phase 2 (token system must exist before defining visual tokens)
**Requirements**: TYPO-01, TYPO-02, TYPO-03, TYPO-04, TYPO-05
**Success Criteria** (what must be TRUE):
  1. Inter renders for all body/heading text and JetBrains Mono for all code, self-hosted with no layout shift on load (font-display: swap, preloaded WOFF2)
  2. Heading sizes follow a visible 1.2 ratio scale from h6 to h1, and captions/UI elements have their own distinct sizes
  3. Light mode uses the muted blue/green palette, and a user can override the accent color via params.style configuration
  4. Dark mode has its own designed palette (not CSS invert) with proper contrast ratios, and switching modes shows both palettes are intentionally designed
  5. Blockquotes, inline code, code blocks, footnotes, and bold/italic all have refined, consistent styling that feels purposeful for technical writing
**Plans**: 3 plans

Plans:
- [x] 03-01-PLAN.md -- Self-host Inter + JetBrains Mono fonts with preload, implement 1.2 ratio modular type scale
- [x] 03-02-PLAN.md -- Redesign color palette (muted blue/cool gray light mode, soft charcoal dark mode with surface layering)
- [x] 03-03-PLAN.md -- Refine typography for technical writing (blockquotes, code, footnotes, tables, bold/italic)

### Phase 3.1: Font & Color Presets (INSERTED)
**Goal**: Users can select between font bundles (Inter or Google Sans) and named color palettes via config.toml -- the theme ships with tested presets rather than arbitrary hex overrides
**Depends on**: Phase 3 (font system and color palette must exist before adding preset switching)
**Requirements**: TYPO-01, TYPO-04 (font configurability and palette presets decided in Phase 3 context but not implemented)
**Success Criteria** (what must be TRUE):
  1. Setting `params.style.fontPreset = "google-sans"` in config.toml switches all body/heading text to Google Sans and code text to Google Sans Code, self-hosted with preload (same loading strategy as Inter)
  2. The default preset (`inter`) works identically to current behavior -- no breaking change for existing users
  3. Named color palettes (e.g., ocean, forest, slate) are selectable via `params.style.palette`, each with tested light and dark mode variants
  4. The current muted blue/green palette is the default -- selecting no palette preserves current appearance
**Plans**: 2 plans

Plans:
- [x] 03.1-01-PLAN.md -- Download Google Sans font bundle, add conditional @font-face + preload + font stack switching via fontPreset param
- [x] 03.1-02-PLAN.md -- Add named color palette presets (ocean, forest, slate) with tested light + dark mode variants via palette param

### Phase 4: Layout & Proportions
**Goal**: Content clearly dominates the layout with generous, responsive spacing that compresses gracefully from desktop to mobile -- every page type feels spacious and balanced
**Depends on**: Phase 3 (typography sizing affects layout calculations)
**Requirements**: LAYO-01, LAYO-02, LAYO-03, LAYO-04
**Success Criteria** (what must be TRUE):
  1. On a 1440px viewport, the content area is visibly wider than the sidebar (content dominates the layout ratio)
  2. Spacing scales smoothly between 768px and 1440px using clamp() -- no jarring breakpoint jumps, generous on desktop, compact on mobile
  3. Heading margins, paragraph spacing, and component gaps follow a unified rem-based scale -- scrolling a long post shows consistent vertical rhythm
  4. Clicking an anchor link (e.g., from ToC) scrolls smoothly and lands with the heading visible below the sticky header, not hidden under it
**Plans**: 2 plans

Plans:
- [x] 04-01-PLAN.md -- Fluid clamp() spacing tokens and smooth scroll behavior with sticky header offset
- [x] 04-02-PLAN.md -- Content-dominant grid proportions and unified heading vertical rhythm

### Phase 5: Interactions & Navigation
**Goal**: The theme responds to user actions with purposeful feedback -- article lists invite clicking, navigation feels alive, and the ToC actively guides readers through long posts
**Depends on**: Phase 4 (layout must be stable before adding interaction layers)
**Requirements**: INTR-01, INTR-02, INTR-03, INTR-04, INTR-05, ADVN-01, ADVN-02
**Success Criteria** (what must be TRUE):
  1. Hovering an article list item triggers a visible lift animation (translateY + shadow), and clicking anywhere on the card navigates to the post
  2. Excerpts and "Read More" links appear consistently on homepage, section, and taxonomy list pages -- same length, same style
  3. Article metadata displays category and tags on both list items and single post views
  4. Desktop nav links show animated underlines on hover, and the mobile menu slides open/closed with a polished transition
  5. Scrolling a long post highlights the current section in the sidebar ToC, and the ToC remains visible (sticky) as content scrolls
**Plans**: 3 plans

Plans:
- [x] 05-01-PLAN.md -- Article Cards & Standardization
- [x] 05-02-PLAN.md -- Navigation Animations
- [x] 05-03-PLAN.md -- Table of Contents Features

### Phase 6: Polish & Configuration
**Goal**: Final premium touches and a clean, well-organized configuration surface -- the theme feels finished and is easy for new users to configure
**Depends on**: Phase 5 (all features must be stable before config consolidation)
**Requirements**: ADVN-03, READ-01, READ-02, MODZ-04
**Success Criteria** (what must be TRUE):
  1. Fenced code blocks display a language label and a copy button that copies code content to clipboard with visual feedback
  2. Single post pages show a reading progress bar that fills as the user scrolls through the article
  3. Toggling between light and dark mode transitions all colored elements smoothly (no flash of unstyled colors)
  4. Configuration parameters are organized into logical groups, with sensible defaults so the theme works well with a minimal config.toml, and any renamed keys emit Hugo warnings pointing to the new key name
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD
- [ ] 06-03: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 3.1 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Code Quality | 3/3 | Complete | 2026-01-29 |
| 2. CSS & JS Modernization | 3/3 | Complete | 2026-01-29 |
| 3. Typography & Color | 3/3 | Complete | 2026-01-30 |
| 3.1 Font & Color Presets | 2/2 | Complete | 2026-01-30 |
| 4. Layout & Proportions | 2/2 | Complete | 2026-01-30 |
| 5. Interactions & Navigation | 3/3 | Complete | 2026-01-30 |
| 6. Polish & Configuration | 0/3 | Not started | - |

---
*Roadmap created: 2026-01-29*
