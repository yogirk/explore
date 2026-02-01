# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-29)

**Core value:** A typography-focused, content-first reading experience that feels modern and well-crafted
**Current focus:** Phase 5 - Interactions & Navigation (COMPLETE)

## Current Position

Phase: 5 of 6 (Interactions & Navigation)
Plan: 3 of 3 in current phase
Status: Phase complete
Last activity: 2026-01-30 -- Completed Phase 5 execution

Progress: [████████░░] 75% (15/20 plans)

## Performance Metrics

**Velocity:**
- Total plans completed: 15
- Average duration: ~2.1 min
- Total execution time: ~33 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Code Quality | 3/3 | ~6 min | ~2 min |
| 2. CSS & JS Modernization | 3/3 | ~5 min | ~1.7 min |
| 3. Typography & Color | 3/3 | ~8 min | ~2.7 min |
| 3.1. Font & Color Presets | 2/2 | ~6 min | ~3 min |
| 4. Layout & Proportions | 2/2 | ~4 min | ~2 min |
| 5. Interactions & Navigation | 3/3 | ~6 min | ~2 min |

**Recent Trend:**
- Last 5 plans: 04-01 (2 min), 04-02 (2 min), 05-01 (2 min), 05-02 (2 min), 05-03 (2 min)
- Trend: Consistent fast execution

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Roadmap: Config cleanup goes last (Phase 6) to avoid breaking existing users mid-enhancement
- Roadmap: ToC features grouped with interactions (Phase 5) since they share navigation context
- Roadmap: CSS token system (Phase 2) precedes typography (Phase 3) so visual tokens have a home
- 01-01: Used Fuse.js v6.6.2 (pinned) instead of v7.x to minimize upgrade risk
- 01-01: Self-hosted Fuse.js via committed local file (not resources.GetRemote) for offline build safety
- 01-01: SRI integrity on both Fuse.js library and search-fuse.js script tags
- 01-02: Pagefind CSS uses relURL without leading slash to avoid Hugo subdirectory duplication pitfall
- 01-02: replaceChildren + createElement for error DOM construction (consistent with Plan 01 DOM API pattern)
- 01-03: Icon partials contain only raw SVG markup -- no Hugo logic or wrapper elements
- 02-03: Used var/function inside IIFE for browser compatibility; IIFE provides scope safety
- 02-03: IntersectionObserver sentinel replaces scrollY > 10 threshold -- any-scroll trigger is acceptable UX
- 02-03: crossorigin=anonymous on same-origin JS for CDN/proxy deployment consistency
- 02-01: Primitive spacing uses numeric scale (--space-1/2/4/8/16) aliased to semantic names (--space-xs through --space-xl)
- 02-01: All var(--font-sans) in component rules replaced with var(--font-heading) for single-point heading font changes
- 02-01: Hugo template expressions confined to :root sections 1.1 and 1.2 only
- 02-02: Kept -webkit-text-size-adjust (iOS Safari), removed -moz-tab-size (unprefixed supported)
- 02-02: No actual duplicate CSS properties found; false positives were separate selectors in same media query
- 03-01: Inter served as Google Fonts variable font (one WOFF2 covers 400+700, 48KB)
- 03-01: Body text switched from serif to sans-serif (Inter) via --font-body -> --font-sans
- 03-01: Base font size changed from 1.125rem to 1rem (16px scale base)
- 03-01: Line-height adjusted from 1.7 to 1.6 for Inter (sans-serif needs less line-height)
- 03-01: All component font-sizes tokenized via modular scale -- no hardcoded values remain
- 03-01: @font-face src uses Hugo relURL for subdirectory deployment compatibility
- 03-02: Primary changed from #3451FF to #1a73e8 (Google muted blue)
- 03-02: Accent changed from orange (#FF6A3D) to muted green (#1e8e3e)
- 03-02: Warning callouts use dedicated amber #f9ab00 instead of accent color
- 03-02: Dark mode independently designed with soft charcoal (#171717), not inverted from light
- 03-02: 3 dark surface layers: page (#171717) < cards (#202124) < code (#282a2d)
- 03-02: Dark mode brightens primary to #8ab4f8 and accent to #81c995 for contrast
- 03-02: Renamed --color-teal-500 to --color-green-600 for semantic accuracy
- 03-03: Blockquote font-style normal (not italic) -- border+background already signal quotation
- 03-03: HR uses centered short rule (max-width 5rem) instead of full-width divider
- 03-03: Tables use bottom-border-only design (no row backgrounds)
- 03-03: Inline code gets border + background for GitHub-like distinction
- 03-03: pre code reset prevents double-styling inside fenced blocks
- 03.1-01: fontPreset param gates @font-face, font stacks, and preload tags via Go template conditionals
- 03.1-01: Config uses 'google-sans' but @font-face declares 'Google Sans Flex' (SIL OFL reserved name)
- 03.1-01: Google Sans Flex uses static 400+700 weight files (variable WOFF2 not available on CDN)
- 03.1-01: Google Sans Code uses variable weight WOFF2 (34KB, covers 300-800 range)
- 03.1-02: palette param selects named color scheme; overrides primary/accent params when set
- 03.1-02: Ocean accent adjusted from research #00b4d8 (2.8:1) to #00838f (4.51:1) for AA compliance
- 03.1-02: Each palette has independently designed dark mode colors (not lightened from light mode)
- 03.1-02: Warning color #fdd663 stays unconditional -- all palettes use same amber
- 04-01: Used clamp() for spacing (768px-1440px) to ensure fluid scaling of primitives
- 04-01: Added scroll-padding-top: 4rem to html to clear sticky header on anchor navigation
- 04-02: Fixed sidebar width to minmax(220px, 280px) (fixed range) instead of proportional
- 04-02: Unified heading margins to var(--space-l) (h3-h6) and var(--space-xl) (h1-h2) for rhythm
- 05-01: Used a.card-link absolute overlay for full-card clickability while maintaining accessibility
- 05-02: Renamed site-nav state class to is-open to distinguish it from the toggle button's is-active state
- 05-02: Switched from display toggle to opacity/visibility pattern to enable CSS transitions
- 05-03: Used rootMargin of -100px 0px -70% 0px for ScrollSpy to trigger highlights accurately

### Roadmap Evolution

- Phase 3.1 inserted after Phase 3: Font & Color Presets -- Google Sans font bundle + named color palettes decided during Phase 3 context gathering (03-CONTEXT.md) but not implemented in Phase 3 plans

### Pending Todos

None yet.

### Blockers/Concerns

- (RESOLVED) SCSS Hugo template expressions isolated in :root sections 1.1 and 1.2 per 02-01
- (RESOLVED) Font loading flash -- self-host + preload + font-display:swap implemented in 03-01
- (RESOLVED) Sidebar proportions need testing at 50px increments 768-1400px -- Fixed via minmax(220px, 280px) and fluid content

## Session Continuity

Last session: 2026-01-30
Stopped at: Completed Phase 5 - Interactions & Navigation. Ready for Phase 6.
Resume file: None
