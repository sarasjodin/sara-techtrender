/**
 * @file github-api.js
 * @description Fetches and renders GitHub repos
 * @author Sara Sjödin Scolari
 */

import { spinner } from '../components/spinner.js';

const GITHUB_TOKEN = process.env.GITHUB_KEY_1;

/**
 * Fetches GitHub repositories by search term.
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function fetchGithubRepos(query) {
  if (!query.trim()) {
    console.warn('Ingen query angiven till GitHub-sökning.');
    return [];
  }

  try {
    /* console.log('Query sent to github'); */
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query
    )}+in:name&sort=updated&order=desc&per_page=2`;
    const response = await fetch(url);
    const data = await response.json();

    spinner.result('github', data.items.length); // Döljer spinnern och visar träffarna

    return data.items || [];
  } catch (error) {
    spinner.error('github'); // Om fel, dòljs spinner och felmeddelande visas
    return [];
  }
}

/**
 * Gets the GitHub user's location by API url.
 * @param {string} query
 * @returns {Promise<string|null>}
 */
export async function getUserLocation(query) {
  const response = await fetch(query, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`
    }
  });

  if (!response.ok) {
    console.error('GitHub API error:', response.status);
    return null;
  }

  const data = await response.json();
  /* console.log('Fetched UserLocation:', data.location); */
  return data.location || null;
}
