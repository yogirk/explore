# Coding Conventions

**Analysis Date:** 2026-01-28

## Naming Patterns

**Files:**
- Hugo layout files: kebab-case (e.g., `baseof.html`, `list.html`, `single.html`)
- Partials directory: descriptive grouping by feature (e.g., `post/`, `seo/`, `widgets/`)
- JavaScript files: kebab-case with feature names (e.g., `minimal.js`, `search-fuse.js`, `search-pagefind.js`)
- Stylesheet: `main.scss` compiled to `style.css`
- Configuration: `config.toml` for Hugo site config, `theme.toml` for theme metadata

**CSS/SCSS Classes:**
- BEM-inspired but flexible approach: `kebab-case` selectors
- Layout utilities: prefix with layout role (e.g., `.layout-grid`, `.main-content`, `.post-single`)
- Component blocks: descriptive names (e.g., `.post-list-item`, `.site-header`, `.theme-toggle`)
- State classes: prefix with `is-` for dynamic states (e.g., `.is-active`, `.is-sticky`, `.is-menu-open`, `.has-shadow`)
- Modifier classes: suffix with `--` notation for variants (e.g., `.layout-grid--sidebar-left`, `.post-list-item--compact`)

**JavaScript Variables:**
- camelCase for variables and functions (e.g., `searchInput`, `displayResults`, `fuse`)
- Descriptive element IDs in kebab-case (e.g., `fuse-search-input`, `fuse-search-results`, `nav-toggle`, `theme-toggle`)
- Constants in UPPER_SNAKE_CASE (not observed in current codebase, but following convention)

**Hugo Template Variables:**
- PascalCase for context/scope variables: `.Site`, `.Page`, `.Params`, `.Content`, `.Title`
- camelCase for computed variables: `$searchInput`, `$searchResults`, `$tocEnabled`, `$widgetSidebarPosition`
- Prefixed with `$` for template scope (Hugo-specific convention)

## Code Style

**Formatting:**
- No automated formatter detected (no .prettierrc, no eslintrc)
- Manual indentation: 2 spaces consistently across HTML, JS, and SCSS
- Line length: no strict limit observed (some lines exceed 100 characters)
- HTML attributes: one per line when multiple, or inline when few

**Linting:**
- No linting configuration detected (no .eslintrc, eslint.config.js, or biome.json)
- Code follows implicit conventions without automated enforcement

**SCSS Structure:**
- Organization into numbered sections with comment headers:
  - `# 1.0 ABSTRACTS` - CSS variables and tokens
  - `# 2.0 BASE` - Global element styles
  - `# 3.0 LAYOUT` - Layout components
  - `# 4.0 COMPONENTS` - Specific components
- CSS custom properties (variables) defined in `:root` and `[data-theme="dark"]` blocks
- Responsive design: mobile-first with `@media (min-width: 960px)` breakpoint

**JavaScript Structure:**
- Immediately Invoked Function Expression (IIFE) pattern via `DOMContentLoaded` listeners
- Event delegation approach: select element ID, attach listeners
- Functional decomposition: helper functions defined inline (e.g., `displayResults()`, `setTheme()`)
- Error handling with try/catch (seen in `search-pagefind.js`)

## Import Organization

**Not applicable:** This is a Hugo theme without module imports or build tooling. Code is:
- Inline HTML (`<script>` tags in templates)
- External files loaded via `<link>` tags for CSS
- JS bundled via Hugo's `resources` pipes (minification in `head.html`: `resources.Get "js/minimal.js" | resources.Minify`)

**Resource Loading Pattern in Hugo:**
```
{{ $js := resources.Get "js/minimal.js" | resources.Minify }}
<script src="{{ $js.RelPermalink }}" defer></script>
```

Located in: `layouts/partials/baseof.html`

## Error Handling

**Pattern:**
- Minimal error handling in JavaScript
- `try/catch` block used in `search-pagefind.js` for async imports:
  ```javascript
  try {
    const { PagefindUI } = await import('/pagefind/pagefind-ui.js');
    // ...
  } catch (e) {
    console.error("Failed to load Pagefind UI:", e);
    searchContainer.innerHTML = '<p>Search is currently unavailable.</p>';
  }
  ```
- Fallback messages rendered to DOM on failure
- `console.error()` for logging errors

**Fetch Errors:**
- `.catch(error => console.error(...))` pattern in `search-fuse.js`
- No retry logic implemented

## Logging

**Framework:** `console` (native browser API only)

**Patterns:**
- `console.error()` for error logging in JavaScript files
- Located in: `assets/js/search-fuse.js` (line 24), `assets/js/search-pagefind.js` (line 20)
- No structured logging or external logger integration

## Comments

**When to Comment:**
- Section headers for CSS: numbered sections (`# 1.0 ABSTRACTS`, etc.)
- Inline comments explain intent or non-obvious behavior
- Hugo template comments for explanatory context (e.g., "Determine sidebar position from front matter, then site config" in `layouts/_default/single.html`)
- JavaScript comments describe implementation steps (numbered comments 1-4 in `search-fuse.js`)

**JSDoc/TSDoc:**
- Not used; no TypeScript in codebase
- JavaScript functions lack formal documentation blocks
- Comments are single-line or inline explanations

**Example from codebase:**
```javascript
// 1. Fetch the search index
// 2. Initialize Fuse.js
// 3. Add event listener for search input
// 4. Function to display results
```

## Function Design

**Size:** Functions are generally small and focused:
- `displayResults()` in `search-fuse.js`: 18 lines (with markup)
- `setTheme()` in `minimal.js`: 5 lines
- Event handlers: 5-15 lines each

**Parameters:**
- Most functions accept single parameter or context (e.g., `displayResults(results)`)
- Hugo partials pass context via dot-notation: `{{ partial "sidebar.html" (dict "context" . "showToc" $showToc ...) }}`

**Return Values:**
- Side effects pattern: functions manipulate DOM directly, minimal explicit returns
- Hugo templates use implicit data flow (variables available in scope)

## Module Design

**Exports:**
- No explicit module exports; code is loaded via `<script>` tags with global scope
- Hugo partials included via `{{ partial "path/name.html" . }}` with context passing

**Barrel Files:**
- Not used; Hugo doesn't have barrel file pattern

**Partial Organization by Feature:**
- `layouts/partials/post/` - Post-specific partials (list items, navigation)
- `layouts/partials/seo/` - SEO metadata (schema, opengraph)
- `layouts/partials/widgets/` - Sidebar widgets
- Root partials for shared layouts: `header.html`, `footer.html`, `head.html`, etc.

**Hugo Template Scope:**
- Context (`.`) passed through template chain
- Sidebar partial example: `{{ partial "sidebar.html" (dict "context" . "showToc" $showToc "tocPosition" $tocPosition ...) }}`
- Located in: `layouts/_default/single.html` line 78

---

*Convention analysis: 2026-01-28*
