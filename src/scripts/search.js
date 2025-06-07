/**
 * @file search.js
 * @description Listens to the form, sends the query
 * @author Sara Sjödin Scolari
 */

import { fetchGitHub } from './github';
import { fetchHackerNews } from './hackernews';

fetchGitHub();
fetchHackerNews();

export function setupSearch() {
  // kod här
}
