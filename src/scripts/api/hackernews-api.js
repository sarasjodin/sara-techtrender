/**
 * @file hackernews.js
 * @description Fetches and renders Hacker News data thorugh algolia api
 * @author Sara Sjödin Scolari
 */

import { spinner } from '../components/spinner.js';

/**
 * Fetches Hacker News articles matching a query.
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function fetchHackerNewsArticles(query) {
  if (!query.trim()) {
    console.warn('Ingen query angiven till HackerNews-sökning.');
    console.warn('[HN] query tom, avbryter...');
    return [];
  }

  spinner.loading('hackernews');

  try {
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
      query
    )}&hitsPerPage=3`;
    console.log('[HN] startar fetch');
    const response = await fetch(url);
    const data = await response.json();
    spinner.result('hackernews', data.hits?.length || 0);
    console.log('[HN] fetch klart, antal artiklar:', data.hits.length);
    return data.hits || [];
  } catch (error) {
    spinner.error('hackernews'); // Om fel, spinner dold + felmeddelande
    return [];
  }
}
