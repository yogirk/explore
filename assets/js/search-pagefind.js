/**
 * Pagefind search integration.
 * This file is loaded only on the /search page when Pagefind is enabled.
 */
document.addEventListener('DOMContentLoaded', async () => {
  const searchContainer = document.getElementById('pagefind-search');
  if (searchContainer) {
    try {
      // The Pagefind UI entrypoint is at /pagefind/pagefind-ui.js
      const { PagefindUI } = await import('/pagefind/pagefind-ui.js');
      if (PagefindUI) {
        new PagefindUI({
          element: "#pagefind-search",
          showSubResults: true,
          // You can customize Pagefind options here
          // See: https://pagefind.app/docs/ui/
        });
      }
    } catch (e) {
      console.error("Failed to load Pagefind UI:", e);
      searchContainer.innerHTML = '<p>Search is currently unavailable.</p>';
    }
  }
});