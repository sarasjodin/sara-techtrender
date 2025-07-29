/**
 * @file search-controller.js
 * @description
 * @author Sara Sjödin Scolari
 */

import { spinner } from '../components/spinner.js';
import { showAllSources } from './spinner-controller.js';
import { generateQuote } from '../components/quotes.js';
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
  console.log('Search placeholder updated när devicestorlek ändras');
}

/**
 * Updates the search input's placeholder depending on screen size.
 * @returns {void}
 */
function updatePlaceholder() {
  const input = document.getElementById('searchinput');
  if (!input) return;
  console.log('Search placeholder updated depending on device size');
  if (window.innerWidth < 600) {
    input.placeholder = 'Search...';
  } else {
    input.placeholder = 'Search tech words like Python, React, or AI';
  }
}

/**
 * Returns the value of the selected source radio button.
 * @returns {'github' | 'hn' | null}
 */
function getSelectedSource() {
  const checked = document.querySelector('input[name="source"]:checked');
  return checked instanceof HTMLInputElement ? checked.value : null;
}

/**
 * Updates the UI to show or hide sections based on the selected source.
 *
 * @param {'github' | 'hn'} source - The data source selected by the user.
 * @returns {void}
 */
function updateUIAfterSearch(source) {
  const githubData = document.getElementById('githubdata');
  const githubHeading = document.getElementById('githubheading');
  const hnData = document.getElementById('hackernewsdata');
  const hnHeading = document.getElementById('hackerheading');
  const toggle = document.getElementById('sourcetoggle');
  const buttonGithub = document.getElementById('button-github');
  const buttonHN = document.getElementById('button-hn');

  toggle?.classList.remove('hidden');

  if (source === 'github') {
    githubData?.classList.remove('hidden');
    githubHeading?.classList.remove('hidden');
    hnData?.classList.add('hidden');
    hnHeading?.classList.add('hidden');
  } else {
    buttonGithub?.classList.remove('hidden');
    buttonHN?.classList.remove('hidden');
    githubData?.classList.remove('hidden');
    githubHeading?.classList.add('hidden');
    hnData?.classList.remove('hidden');
    hnHeading?.classList.remove('hidden');
  }
}

/**
 * Sets up the search input and button functionality.
 * Cleans the input, fetches data, updates UI and shows a new quote.
 *
 * @returns {void}
 */
export function setupSearch() {
  const input = document.getElementById('searchinput');
  const button = document.getElementById('searchbutton');

  if (!(input instanceof HTMLInputElement)) return;

  button.addEventListener('click', async (e) => {
    e.preventDefault();

    const query = getSearchQuery(input);
    if (!query) return;

    const source = getSelectedSource();

    try {
      await showAllSources(query);
      generateQuote();
      updateUIAfterSearch(source);

      input.value = ''; // Serach input cleared
    } catch (error) {
      console.error('Search failed:', error);
      spinner.error('github');
      spinner.error('hackernews');
    }
  });
}
