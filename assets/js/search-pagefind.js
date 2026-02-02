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
      });
    }
  };
  script.onerror = () => {
    searchContainer.innerHTML = '<p>Search is currently unavailable.</p>';
  };
  document.head.appendChild(script);
});
