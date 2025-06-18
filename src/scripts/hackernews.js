/**
 * @file hackernews.js
 * @description Fetches and renders Hacker News data thorugh algolia api
 * @author Sara Sjödin Scolari
 */

/**
 * Searches Hacker News for articles matching the query.
 * @param {string} query - The search term.
 * @returns {Promise<Array>} A list of article objects.
 */
export async function searchHackerNews(query) {
  console.log('Query sent to algolia');
  const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log('Fetched HackerNews data:', data.hits);
  return data.hits || [];
}
