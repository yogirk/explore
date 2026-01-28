# Codebase Concerns

**Analysis Date:** 2026-01-28

## Security Concerns

**XSS Vulnerability in Fuse.js Search Results:**
- Issue: Direct HTML injection using `innerHTML` with user-controlled content (search results)
- Files: `assets/js/search-fuse.js` (lines 45-50)
- Risk: User content from `item.title` and `item.content` are directly interpolated into template literals and set via `innerHTML`
- Current impact: While the index comes from trusted Hugo-generated JSON, if content contains user submissions or syndicated feeds, XSS is possible
- Recommendation: Use `textContent` for title and content, or properly escape HTML before using `innerHTML`. Use DOM methods like `createElement` and `textContent` instead of template literal HTML injection

**Unvalidated External CDN Dependency:**
- Issue: Fuse.js loaded from CDN without SRI integrity check
- Files: `layouts/search.html` (line 20)
- Risk: `https://cdn.jsdelivr.net/npm/fuse.js@6/dist/fuse.min.js` lacks integrity attribute; CDN compromise could inject malicious code
- Current impact: Affects search functionality security
- Recommendation: Add SRI integrity hash to Fuse.js CDN script tag, or self-host the library

**Hardcoded Analytics Placeholder:**
- Issue: Analytics partial intentionally empty with instructions to add Google Analytics
- Files: `layouts/partials/analytics.html`
- Risk: Users following the example template may accidentally expose Google Analytics ID or other tracking configuration in public repositories
- Recommendation: Add warning comment about not committing credentials to version control

## Potential XSS in Dynamic Schema Generation:

**JSON-LD Schema Injection Risk:**
- Issue: User-provided data (title, description, author) inserted into JSON-LD structured data
- Files: `layouts/partials/seo/schema.html` (lines 5-14)
- Risk: While Hugo's template escaping helps, malicious title or description fields could break JSON structure
- Current impact: Low risk with Hugo's default escaping, but could be problematic with user-supplied metadata
- Recommendation: Add validation/sanitization for all user-provided fields in schema generation, or ensure Hugo's escaping is sufficient

## Performance Concerns

**Large Search Index on Client:**
- Issue: Full page content indexed and loaded into client-side search (Fuse.js approach)
- Files: `layouts/index.json`, `assets/js/search-fuse.js`
- Problem: For large sites, the JSON index containing all `.Plain` content becomes very large (no size limits set)
- Impact: Slow initial page load on search page, high bandwidth usage
- Scaling limit: Becomes problematic with >500 posts or very long content
- Improvement path: Implement pagination of search results, compress the index, or switch to Pagefind/Algolia for larger sites

**Synchronous Search Index Fetch:**
- Issue: Search functionality waits for fetch to complete before enabling input handling
- Files: `assets/js/search-fuse.js` (lines 12-24)
- Problem: No timeout or error recovery; if `/index.json` fetch fails, search is silently broken
- Impact: Users see an input field but get no results with no error message
- Recommendation: Add fetch timeout, implement error recovery, show error message to user if index fails to load

**Stylesheet Size Not Monitored:**
- Issue: SCSS compiled to CSS with no size constraints or splitting
- Files: `assets/css/main.scss`
- Problem: Single monolithic stylesheet loaded on every page; no critical CSS extraction
- Impact: All pages wait for full stylesheet to load
- Recommendation: Split CSS into critical (above-fold) and deferred, or implement lazy loading for non-critical styles

## Testing & QA Gaps

**No Test Coverage for Search Functionality:**
- Issue: Search implementations (Fuse.js, Pagefind, Algolia) have no test cases
- Files: `assets/js/search-fuse.js`, `assets/js/search-pagefind.js`
- Risk: Breaking changes undetected; search could fail silently
- Missing tests: Search input handling, result rendering, empty state handling, error states

**No Tests for Dark Mode Toggle:**
- Issue: localStorage-dependent theme switching has no automated tests
- Files: `assets/js/minimal.js` (lines 6-32)
- Risk: Theme toggle logic could break with edge cases (invalid theme values, corrupted localStorage)
- Missing tests: Theme persistence, preference-based defaults, manual override persistence

**No Accessibility Tests:**
- Issue: Theme claims WCAG 2.1 AA compliance but no automated or manual testing documented
- Files: Multiple layout partials
- Risk: Accessibility regressions undetected
- Examples to test: Keyboard navigation (mobile menu, theme toggle), ARIA labels, color contrast

## Fragile Areas

**Complex Sidebar/ToC Layout Logic:**
- Issue: Multi-condition layout determination in single.html
- Files: `layouts/_default/single.html` (lines 2-33)
- Why fragile: Overlapping conditions for ToC position, widget sidebar position, and layout grid classes. Difficult to reason about all edge cases
- Safe modification: Add explicit test cases for each sidebar/ToC combination before modifying layout logic
- Test gaps: No test coverage for layout combinations (ToC left + widgets right, off + off, etc.)

**Figure Shortcode with Image Processing:**
- Issue: Hardcoded image resize breakpoints with no configuration
- Files: `layouts/shortcodes/figure.html` (lines 21-25)
- Why fragile: Breakpoints (640, 960, 1280, 1920) are hardcoded; changing responsive design requires modifying template logic
- Safe modification: Extract breakpoints to Hugo config parameters before changing responsive behavior
- Problem: No fallback if Hugo's image processing fails; will show build error instead of graceful degradation

**Search Engine Switching Logic:**
- Issue: Three search engines (Fuse, Pagefind, Algolia) with different requirements
- Files: `layouts/search.html`, `layouts/search/list.html`
- Why fragile: Configuration inconsistency - `search.html` defaults to "fuse" while `search/list.html` defaults to "pagefind"
- Safe modification: Consolidate search engine selection into single configuration location
- Problem: No validation of `searchEngine` config value; invalid value silently uses wrong template branch

## Configuration Issues

**Inconsistent Search Engine Defaults:**
- Issue: Different default search engines in different templates
- Files: `layouts/search.html` (line 13) vs `layouts/search/list.html` (line 7)
- Problem: `search.html` defaults to "fuse", but `search/list.html` defaults to "pagefind"
- Impact: Confusing behavior if users don't explicitly set `params.ui.searchEngine`
- Recommendation: Consolidate to single default, document clearly in README

**Missing Validation for Configuration:**
- Issue: No validation of required config parameters
- Files: Multiple templates
- Problems:
  - Empty `params.author` silently renders "No author"
  - Invalid `searchEngine` value causes silent fallthrough
  - Missing `params.style.primary` uses hardcoded default with no indication of override failure
- Recommendation: Add startup checks or clearer documentation of required config

**Algolia Implementation is Incomplete:**
- Issue: Algolia search option exists in `search/list.html` but no corresponding implementation file
- Files: `layouts/search/list.html` (lines 16-25), but `assets/js/search-algolia.js` doesn't exist
- Problem: If user enables Algolia search, they get no functional search results
- Impact: Silent failure with no error message
- Recommendation: Either implement Algolia search or remove the option from templates

## Documentation Gaps

**Search Configuration Not Well Documented:**
- Issue: README shows search setup but doesn't explain differences between search engines well
- Impact: Users may choose wrong search option for their site size
- Missing: Comparison of search engines (Fuse for <500 posts, Pagefind for medium sites, Algolia for large)

**Image Processing Shortcode Not Fully Documented:**
- Issue: Figure shortcode uses Hugo image processing but requirements unclear
- Impact: Users may not realize images must be page bundle assets or in /assets/images/
- Missing: Troubleshooting guide for "Image not found" errors

## Dependencies at Risk

**Fuse.js from Unpinned CDN:**
- Risk: Fuse.js loaded from `@6` version range (could be any 6.x), no specific version pinning
- Impact: Minor updates could introduce breaking changes to search behavior
- Migration: Pin exact version (e.g., `@6.6.2`) or self-host the library

**Hard Dependency on Hugo 0.100+:**
- Issue: Uses Hugo Pipes and advanced templating features
- Risk: Users on older Hugo versions get cryptic build errors
- Recommendation: Add explicit Hugo version requirement to theme.toml

## Performance Issues

**Search Results Rendering Performance:**
- Issue: Fuse.js search with large result sets renders all at once
- Files: `assets/js/search-fuse.js` (lines 39-56)
- Problem: No pagination or virtualization; 100+ results create slow DOM insertion
- Impact: Perceived lag when typing with large result sets
- Improvement: Implement result pagination or limit results to first N matches

**Missing Loading States:**
- Issue: No visual feedback while Fuse.js index loads
- Files: `assets/js/search-fuse.js` (lines 12-24)
- Problem: User may think search is broken if typing before index loads
- Improvement: Show loading indicator until fetch completes

## Minor Code Quality Issues

**Event Listener Memory Leaks Risk:**
- Issue: Scroll event listener added without cleanup
- Files: `assets/js/minimal.js` (line 61)
- Problem: If page transitions happen (SPA-like), listeners accumulate
- Current impact: Low (theme assumes full page reloads)
- Recommendation: Add listener cleanup if implementing partial page updates

**Unused Code Path in search/list.html:**
- Issue: File has fallback for invalid search engine but default differs from main search.html
- Files: `layouts/search/list.html` (line 27)
- Problem: Inconsistent error messaging
- Recommendation: Remove or consolidate

---

*Concerns audit: 2026-01-28*
