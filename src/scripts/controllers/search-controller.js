/**
 * @file search-controller.js
 * @description
 * @author Sara Sjödin Scolari
 */

import { spinner } from '../components/spinner.js';
import { generateQuote } from '../components/quotes.js';
import { fetchGithubRepos, renderGithubCards } from '../api/github-api.js';
import {
  fetchHackerNewsArticles,
  renderHackerNewsList
} from '../api/hackernews-api.js';
import {
  prepareForSearch,
  showAfterFetch,
  toggleDataSource
} from './ui-controller.js';
import { getSearchQuery } from '../utils.js';

/**
 * Initializes the search UI by updating placeholder
 * and adding a resize listener
 *
 * @function initSearchUI
 * @returns {void}
 */
export function initSearchUI() {
  updatePlaceholder();
  window.addEventListener('resize', updatePlaceholder);
}

/**
 * Sets up the search functionality by handling user input and search button actions.
 *
 * @function setupSearch
 * @returns {void}
 */
export function setupSearch() {
  const input = document.getElementById('searchinput');
  const button = document.getElementById('searchbutton');

  if (!(input instanceof HTMLInputElement)) return;

  // Search triger with Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      button.click(); // Triggar klick-eventet
    }
  });

  button.addEventListener('click', async (e) => {
    e.preventDefault();

    const query = getSearchQuery(input);
    if (!query) return;

    // Prepare UI before rendering
    prepareForSearch();

    try {
      const [ghData, hnData] = await Promise.all([
        fetchGithubRepos(query),
        fetchHackerNewsArticles(query)
      ]);

      showAfterFetch(); // Show toggle/data
      renderGithubCards(ghData);
      renderHackerNewsList(hnData);

      input.value = ''; // Clear input

      generateQuote();
    } catch (error) {
      console.error('Search failed:', error);
      spinner.error('github');
      spinner.error('hackernews');
    }

    // Add eventlisteners for buttons
    document.getElementById('radio-github').addEventListener('change', () => {
      toggleDataSource('github');
    });
    document
      .getElementById('radio-hackernews')
      .addEventListener('change', () => {
        toggleDataSource('hackernews');
      });
  });
}

/**
 * Updates the search input's placeholder depending on screen size.,
 * @function updatePlaceholder
 * @returns {void}
 */
function updatePlaceholder() {
  const input = document.getElementById('searchinput');
  if (!input) return;
  if (window.innerWidth < 600) {
    input.placeholder = 'Search...';
  } else {
    input.placeholder = 'Search tech words like Python, React, or AI';
  }
}
