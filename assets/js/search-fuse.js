/**
 * Fuse.js search integration.
 * This file is loaded only on the /search page when Fuse.js is enabled.
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('fuse-search-input');
  const searchResults = document.getElementById('fuse-search-results');
  let fuse;
  let data;

  // 1. Fetch the search index
  fetch('/index.json')
    .then(response => response.json())
    .then(json => {
      data = json;
      // 2. Initialize Fuse.js
      fuse = new Fuse(data, {
        keys: ['title', 'content', 'tags', 'categories'],
        includeScore: true,
        threshold: 0.3,
        minMatchCharLength: 2,
      });
    })
    .catch(error => console.error('Failed to fetch search index:', error));

  // 3. Add event listener for search input
  searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    const results = fuse.search(query);
    displayResults(results);
  });

  // 4. Function to display results
  function displayResults(results) {
    searchResults.innerHTML = '';
    if (results.length > 0) {
      results.forEach(({ item }) => {
        const resultItem = document.createElement('article');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
          <h3 class="result-title">
            <a href="${item.uri}">${item.title}</a>
          </h3>
          <p class="result-snippet">${item.content.substring(0, 150)}...</p>
        `;
        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.innerHTML = '<p>No results found.</p>';
    }
  }
});