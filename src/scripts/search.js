/**
 * @file search.js
 * @description Listens to the form, sends the query
 * @author Sara Sjödin Scolari
 */

// search.js

import { searchGitHubRepos } from './github.js';
import { searchHackerNews } from './hackernews.js';
import { renderGitHubResults, renderHackerNewsResults } from './render.js';

/**
 * Sets up the search logic manually.
 */
export function setupSearch() {
  /* console.log('setupSearch() is running!'); */
  const input = document.getElementById('searchinput');
  /* console.log('Found input:', input); */
  const button = document.getElementById('searchbutton');
  /* console.log('Found button:', button); */

  if (!(input instanceof HTMLInputElement)) {
    /* console.error('Input field not found or invalid.'); */
    return;
  }

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    /* console.log('Search button clicked'); */

    const raw = input.value;
    const query = raw
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ''); // tar bort allt utom a–z, 0–9 och mellanslag

    if (!query) return;

    /* button.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('Search button clicked');
    const query = normalizeQuery(input.value);
    if (!query) return; */

    try {
      const [repos, posts] = await Promise.all([
        searchGitHubRepos(query),
        searchHackerNews(query)
      ]);

      renderGitHubResults(repos);
      renderHackerNewsResults(posts);
    } catch (error) {
      console.error('Search failed:', error);
    }
  });
}

/* function normalizeQuery(raw) {
  const trimmed = raw.trim();
  const map = {
    'c#': 'C Sharp',
    'f#': 'F Sharp',
    'c++': 'C Plus Plus'
  };
  const lower = trimmed.toLowerCase();
  return map[lower] || trimmed;
} */
