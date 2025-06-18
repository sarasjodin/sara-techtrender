/**
 * @file search.js
 * @description Listens to the form, sends the query
 * @author Sara Sjödin Scolari
 */

import { searchGitHubRepos } from './github.js';
import { searchHackerNews } from './hackernews.js';
import { renderGitHubResults, renderHackerNewsResults } from './render.js';

/**
 * Sets up the search logic manually.
 */
export function setupSearch() {
  console.log('setupSearch() is running!');
  const input = document.getElementById('searchinput');
  console.log('Found input:', input);
  const button = document.getElementById('searchbutton');
  console.log('Found button:', button);

  if (!(input instanceof HTMLInputElement)) {
    console.error('Input field not found or invalid.');
    return;
  }

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('Search button clicked');
    const query = input.value.trim();
    if (!query) return;

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
