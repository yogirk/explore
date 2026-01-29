/**
 * Pagefind search integration.
 * This file is loaded only on the /search page when Pagefind is enabled.
 */
document.addEventListener('DOMContentLoaded', async () => {
  const searchContainer = document.getElementById('pagefind-search');
  if (searchContainer) {
    try {
      const baseUrl = searchContainer.dataset.baseUrl || '/';
      const pagefindPath = baseUrl + 'pagefind/pagefind-ui.js';
      const { PagefindUI } = await import(pagefindPath);
      if (PagefindUI) {
        new PagefindUI({
          element: "#pagefind-search",
          showSubResults: true,
        });
      }
    } catch (e) {
      console.error("Failed to load Pagefind UI:", e);
      searchContainer.replaceChildren();
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Search is currently unavailable.';
      searchContainer.appendChild(errorMsg);
    }
  }
});
