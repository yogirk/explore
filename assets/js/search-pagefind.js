/**
 * Pagefind search integration.
 * This file is loaded only on the /search page when Pagefind is enabled.
 * pagefind-ui.js is an IIFE that sets window.PagefindUI, so we load it
 * via a script tag rather than a dynamic import().
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.getElementById('pagefind-search');
  if (!searchContainer) return;

  const baseUrl = searchContainer.dataset.baseUrl || '/';
  const script = document.createElement('script');
  script.src = baseUrl + 'pagefind/pagefind-ui.js';
  script.onload = () => {
    if (window.PagefindUI) {
      new window.PagefindUI({
        element: "#pagefind-search",
        showSubResults: true,
        bundlePath: baseUrl + 'pagefind/',
      });

      // Pre-fill from ?q= URL parameter (used by search forms on list/section pages)
      const urlQuery = new URLSearchParams(window.location.search).get('q');
      if (urlQuery) {
        const input = searchContainer.querySelector('.pagefind-ui__search-input');
        if (input) {
          input.value = urlQuery;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  };
  script.onerror = () => {
    searchContainer.innerHTML = '<p>Search is currently unavailable.</p>';
  };
  document.head.appendChild(script);
});
