/**
 * @file github-api.js
 * @description Fetches GitHub repos and renders repos from Github into "cards"
 * @author Sara Sjödin Scolari
 */

import { images } from '../../assets/images.js';
import { getFlagHtml } from '../data/flags.js';
import { spinner } from '../components/spinner.js';
import { showAfterFetch } from '../controllers/ui-controller.js';
import { extractCountryCode } from '../utils.js';

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
  return data.location || null;
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

  githubcontainer.innerHTML = '';

  for (const card of cards) {
    const name = card.name || 'No name provided.';
    const owner = card.owner.login;
    const avatar = card.owner.avatar_url;
    const description = card.description || 'No description provided.';
    const repoUrl = card.html_url;

    let location = null;
    try {
      location = await getUserLocation(card.owner.url);
    } catch (err) {
      /* console.warn(Kunde inte hämta plats för ${owner}, err); */
    }

    showAfterFetch();

    getFlagHtml(location, extractCountryCode);

    const cardHTML = `
  <article class="repo-card">
    <div class="repo-header">
      <img src="${images.gitHubBlackIcon}" alt="GitHub logo" width="32" />
      <h3 class="repo-title">${card.name}</h3>
    </div>

    <div class="repo-sections">
      <div class="repo-owner-section">
        <h4>Owner</h4>
        <div class="info-row">
          <img src="${
            card.owner.avatar_url
          }" alt="" aria-hidden="true" class="avatar" width="24" />
          <span><strong>User name:</strong> ${card.owner.login}</span>
        </div>
        <div class="info-row">
          <img src="${
            images.geoCodeIcon || ''
          }" alt="" aria-hidden="true" width="24"/>
          <span><strong>Geographic location:</strong> ${
            location || 'N/A'
          }</span>
        </div>
      </div>

      <div class="repo-repository-section">
        <h4>Repository</h4>
        <div class="info-row">
          <img src="${images.starIcon}" alt="" aria-hidden="true" width="24"/>
          <span><strong>Stars:</strong> ${card.stargazers_count}</span>
        </div>
        <div class="info-row">
          <img src="${images.codeIcon}" alt="" aria-hidden="true" width="24"/>
          <span><strong>Primary language:</strong> ${
            card.language || 'N/A'
          }</span>
        </div>
      </div>
    </div>

    <div class="action-buttons profile">
      <a href="${
        card.owner.html_url
      }" class="action-button profile" target="_blank" rel="noopener noreferrer" aria-label="View GitHub profile of ${
      card.owner.login
    }">
        <span class="icon-left">
          <img src="${
            images.userProfileIcon
          }" alt="" aria-hidden="true" class="avatar" width="24" />
        </span>
        <span class="button-text">GitHub Profile page</span>
        <span class="icon-right">
              <img src="${
                images.externalIcon
              }" alt="External link, opens in new tab" width="24" />
        </span>
      </a>
      <a href="${
        card.html_url
      }" class="action-button" target="_blank" rel="noopener noreferrer" aria-label="View repository ${
      card.name
    } on GitHub">
    <span class="icon-left">
        <img src="${
          images.repoIcon
        }" alt="" aria-hidden="true" class="repoikon" width="24" /></span>
        <span class="button-text">GitHub Repository</span>
        <span class="icon-right"><img src="${
          images.externalIcon
        }" alt="External link, opens in new tab" width="24" /></span>
      </a>
    </div>
  </article>
`;

    githubcontainer.insertAdjacentHTML('beforeend', cardHTML);
  }
}
