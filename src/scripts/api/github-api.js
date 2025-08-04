/**
 * @file github-api.js
 * @description Fetches GitHub repos and renders repos from Github into "cards"
 * @author Sara Sjödin Scolari
 */

import { images } from '../../assets/images.js';
import { fetchWikipediaSummary } from './wikipedia-api.js';
import { spinner } from '../components/spinner.js';
import { showModal } from '../components/modal.js';
import { showAfterFetch } from '../controllers/ui-controller.js';

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
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query
    )}+in:name&sort=updated&order=desc&per_page=20`;
    const response = await fetch(url);
    const data = await response.json();

    spinner.result('github', data.items.length);

    return data.items || [];
  } catch (error) {
    spinner.error('github');
    return [];
  }
}

/**
 * Gets the GitHub user's location by API url.
 * @param {string} query
 * @returns {Promise<string|null>}
 */
export async function getUserLocation(query) {
  try {
    const response = await fetch(query); // No token = no CORS problem

    if (!response.ok) {
      console.error('GitHub API error:', response.status);
      return null;
    }

    const data = await response.json();
    return data.location || null;
  } catch (error) {
    console.error('Error fetching user location:', error);
    return null;
  }
}

/**
 * Each card shows repo and owner info, including stars, language, and location.
 * @function renderGithubCards
 * @param {GitHubRepo[]} cards - Array of GitHub repository objects.
 * @returns {Promise<void>}
 * @typedef {Object} GitHubRepo
 * @property {string} name - Repository name
 * @property {string} html_url - Repository URL
 * @property {string} description - Repository description
 * @property {number} stargazers_count - Number of stars.
 * @property {string} language - Primary language
 * @property {Object} owner - The user or org that owns the repo.
 * @property {string} owner.login - GitHub username.
 * @property {string} owner.avatar_url - Link to avatar image
 * @property {string} owner.url - API URL to fetch user info.
 * @property {string} owner.html_url - Public profile URL
 */
export async function renderGithubCards(cards) {
  const githubcontainer = document.getElementById('github-data-section');
  githubcontainer.innerHTML = '';

  for (const card of cards) {
    const name = card.name || 'No name provided.';
    const owner = card.owner.login;
    const avatar = card.owner.avatar_url;
    /* const description = card.description || 'No description provided.'; */
    const repoUrl = card.html_url;

    let location;

    try {
      location = await getUserLocation(card.owner.url);
    } catch (error) {
      // Try to read the HTTP status if possible
      const status = error?.response?.status || error?.status;

      // Optional: handle different scenarios if needed
      if (status === 403) {
        // Rate limit exceeded
        // Optionally, show "Limited" or just fallback silently
        location = null;
      } else if (status === 404) {
        // User not found
        location = null;
      } else if (status >= 500) {
        // Server error
        location = null;
      } else {
        location = null; // All other unknown errors
      }
    }

    showAfterFetch();

    const cardHTML = `
    <article class="repo-card">
      <div class="repo-header">
        <img src="${
          images.gitHubInvertedIcon
        }" alt="" aria-hidden="true" width="32" height="32" />
        <h3 class="repo-title">${name}</h3>
      </div>

      <div class="repo-sections">
        <div class="repo-owner-section">
          <h4>Owner</h4>
          <div class="info-row">
            <img src="${avatar}" alt="" aria-hidden="true" class="avatar" width="24"  height="24" />
            <span><strong>User name:</strong> ${owner}</span>
          </div>
          <div class="info-row">
          <img src="${
            images.geoCodeIcon
          }" alt="" aria-hidden="true" class="avatar" width="24"  height="24" />
          <span><strong>Geographic location:</strong> ${
            location || 'N/A'
          }</span>
          </div>
        </div>
        <div class="repo-repository-section">
          <h4>Repository</h4>
          <div class="info-row">
            <img src="${
              images.starIcon
            }" alt="" aria-hidden="true" width="24" height="24"/>
            <span><strong>Stars:</strong> ${card.stargazers_count}</span>
          </div>
          <div class="info-row">
            <img src="${
              images.codeIcon
            }" alt="" aria-hidden="true" width="24" height="24" />
            <div class="language-info">
              <strong>Primary language:</strong>
            ${
              card.language
                ? `<button
                      type="button"
                      class="language-button"
                      data-language="${card.language}"
                      aria-label="View details about ${card.language}">
                      ${card.language}
                  </button>`
                : 'N/A'
            }
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons profile">
        <a href="${
          card.owner.html_url
        }" class="action-button profile" target="_blank" rel="noopener noreferrer" aria-label="View GitHub profile of ${owner} (opens in new tab)">
          <span class="icon-left">
            <img src="${
              images.userProfileIcon
            }" alt="" aria-hidden="true" class="avatar" width="24" height="24" />
          </span>
          <span class="button-text">View GitHub Profile page</span>
          <span class="icon-right">
                <img src="${
                  images.externalIcon
                }" alt="" aria-hidden="true" width="24" height="24" />
          </span>
        </a>
        <a href="${repoUrl}" class="action-button" target="_blank" rel="noopener noreferrer" aria-label="View repository ${name} on GitHub">
          <span class="icon-left">
          <img src="${
            images.repoIcon
          }" alt="" aria-hidden="true" class="repoikon" width="24" height="24" /></span>
          <span class="button-text">View GitHub Repository</span>
          <span class="icon-right"><img src="${
            images.externalIcon
          }" alt="" aria-hidden="true" width="24" height="24" /></span>
        </a>
      </div>
    </article>
    `;

    githubcontainer.insertAdjacentHTML('beforeend', cardHTML);
  }
}

/**
 * Handles clicks on language buttons and shows a Wikipedia summary modal.
 * Triggered when a button with class "language-button" is clicked.
 */
document.addEventListener('click', async (e) => {
  const target = e.target.closest('.language-button');

  if (target) {
    const language = target.dataset.language;

    // Fetch data from Wikipedia API
    const data = await fetchWikipediaSummary(language);

    // Show modal with fetched data or fallback message
    if (data) {
      showModal(data.title, data.extract, data.image);
    } else {
      showModal(
        'Not Found',
        'No information found on Wikipedia for this term.',
        null
      );
    }
  }
});
