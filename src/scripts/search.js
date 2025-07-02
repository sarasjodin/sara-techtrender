/**
 * @file search.js
 * @description Listens to the form, sends the query
 * @author Sara Sjödin Scolari
 */

// search.js

import { searchGitHubRepos } from './github.js';
import { searchHackerNews } from './hackernews.js';
import { renderGitHubResults, renderHackerNewsResults } from './render.js';
import {
  setSpinnerLoading,
  setSpinnerResult,
  setSpinnerError,
  setSpinnerStop
} from './spinner.js';

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

    const checkedInput = document.querySelector('input[name="source"]:checked');
    const source =
      checkedInput instanceof HTMLInputElement ? checkedInput.value : null;

    /* button.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('Search button clicked');
    const query = normalizeQuery(input.value);
    if (!query) return; */

    try {
      const [repos, hits] = await Promise.all([
        searchGitHubRepos(query),
        searchHackerNews(query)
      ]);

      // Always render both repos and hits
      renderGitHubResults(repos);
      renderHackerNewsResults(hits);
      setSpinnerLoading('github');
      setSpinnerLoading('hackernews');

      // Afterwards hide the non active source
      if (source === 'github') {
        document.getElementById('githubdata')?.classList.remove('hidden');
        document.getElementById('githubheading')?.classList.remove('hidden');
        document.getElementById('hackernewsdata')?.classList.add('hidden');
        document.getElementById('hackerheading')?.classList.add('hidden');
      } else {
        document.getElementById('githubdata')?.classList.add('hidden');
        document.getElementById('githubheading')?.classList.add('hidden');
        document.getElementById('hackernewsdata')?.classList.remove('hidden');
        document.getElementById('hackerheading')?.classList.remove('hidden');
      }
      setSpinnerResult('github', 12);
      setSpinnerResult('hackernews', 5);
      setSpinnerStop('github');
      setSpinnerStop('hackernews');
    } catch (error) {
      console.error('Search failed:', error);
      setSpinnerError('github');
      setSpinnerError('hackernews');
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
