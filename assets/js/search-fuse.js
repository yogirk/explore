/**
 * Fuse.js search integration.
 * This file is loaded only on the /search page when Fuse.js is enabled.
 *
 * Security: All DOM rendering uses createElement + textContent (no innerHTML).
 * UX: Loading indicator shown until index is ready; error state on fetch failure.
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('fuse-search-input');
  const searchResults = document.getElementById('fuse-search-results');
  let fuse = null;

  // Derive search index URL from the data attribute set by Hugo template.
  // This supports both root and subdirectory deployments (e.g., /blog/index.json).
  const baseUrl = searchInput.dataset.baseUrl || '/';
  const indexUrl = baseUrl + 'index.json';

  // 1. Show loading state
  searchInput.disabled = true;
  searchInput.placeholder = 'Loading search...';
  const loadingMsg = document.createElement('p');
  loadingMsg.className = 'search-loading';
  loadingMsg.textContent = 'Loading search index...';
  searchResults.appendChild(loadingMsg);

  // 2. Fetch the search index
  fetch(indexUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.json();
    })
    .then(json => {
      // 3. Initialize Fuse.js
      fuse = new Fuse(json, {
        keys: ['title', 'content', 'tags', 'categories'],
        includeScore: true,
        threshold: 0.3,
        minMatchCharLength: 2,
      });

      // Remove loading indicator and enable input
      if (loadingMsg.parentNode) {
        loadingMsg.parentNode.removeChild(loadingMsg);
      }
      searchInput.disabled = false;
      searchInput.placeholder = 'Search for articles...';
      searchInput.focus();
    })
    .catch(error => {
      // Show error state
      clearResults();
      const errorMsg = document.createElement('p');
      errorMsg.className = 'search-error';
      errorMsg.textContent = 'Search is currently unavailable. Please try again later.';
      searchResults.appendChild(errorMsg);
      searchInput.disabled = true;
      searchInput.placeholder = 'Search unavailable';
      console.error('Failed to load search index:', error);
    });

  // 4. Add event listener for search input
  searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (query.length < 2) {
      clearResults();
      return;
    }

    // Guard against searching before index is ready
    if (!fuse) {
      clearResults();
      const waitMsg = document.createElement('p');
      waitMsg.className = 'search-loading';
      waitMsg.textContent = 'Still loading...';
      searchResults.appendChild(waitMsg);
      return;
    }

    const results = fuse.search(query);
    displayResults(results);
  });

  // 5. Clear results safely (no innerHTML)
  function clearResults() {
    while (searchResults.firstChild) {
      searchResults.removeChild(searchResults.firstChild);
    }
  }

  // 6. Display results using safe DOM construction (no innerHTML)
  function displayResults(results) {
    clearResults();

    if (results.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = 'No results found.';
      searchResults.appendChild(noResults);
      return;
    }

    results.forEach(({ item }) => {
      const article = document.createElement('article');
      article.className = 'result-item';

      const heading = document.createElement('h3');
      heading.className = 'result-title';

      const link = document.createElement('a');
      link.href = item.uri;
      link.textContent = item.title;
      heading.appendChild(link);

      const snippet = document.createElement('p');
      snippet.className = 'result-snippet';
      snippet.textContent = item.content.substring(0, 150) + '...';

      article.appendChild(heading);
      article.appendChild(snippet);
      searchResults.appendChild(article);
    });
  }
});
