/**
 * @file github.js
 * @description Renders repos from Github into "cards"
 * @author Sara Sjödin Scolari
 */

import { images } from '../../assets/images.js';
import { extractCountryCode } from '../utils.js';
import { getUserLocation } from '../api/github-api.js';
import { getFlagHtml } from '../data/flags.js';
import { showDataSource } from '../controllers/view-controller.js';

/**
 * Each card shows repo and owner info, including stars, language, and location.
 * @function renderGithubCards
 * @param {GitHubRepo[]} repos - Array of GitHub repository objects.
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
export async function renderGithubCards(repos) {
  const githubcontainer = document.getElementById('githubdata');
  const headingGitHub = document.getElementById('githubheading');
  const dataGitHub = document.getElementById('githubdata');
  const hackercontainer = document.getElementById('hackernewsdata');
  const headingHacker = document.getElementById('hackerheading');
  const dataHacker = document.getElementById('hackernewsdata');
  githubcontainer.innerHTML = '';

  showDataSource('github');
  console.log('[renderGithubCards] startar');
  console.log('[renderGithubCards] repos att rendera:', repos.length);

  if (!repos.length) {
    console.warn('Tomt sökfält');
    githubcontainer.setAttribute('aria-hidden', 'true');
    headingGitHub.classList.add('hidden');
    dataGitHub.classList.add('hidden');
    headingGitHub.setAttribute('aria-hidden', 'true');
    dataGitHub.setAttribute('aria-hidden', 'true');

    headingHacker.classList.add('hidden');
    hackercontainer.setAttribute('aria-hidden', 'true');
    dataHacker.classList.add('hidden');
    headingHacker.setAttribute('aria-hidden', 'true');
    dataHacker.setAttribute('aria-hidden', 'true');

    dataGitHub.innerHTML = '';
    return;
  }

  document.getElementById('sourcetoggle')?.classList.remove('hidden');
  headingGitHub.classList.remove('hidden');
  dataGitHub.classList.remove('hidden');
  headingGitHub.setAttribute('aria-hidden', 'false');
  dataGitHub.setAttribute('aria-hidden', 'false');

  headingHacker.classList.add('hidden');
  dataHacker.classList.add('hidden');
  headingHacker.setAttribute('aria-hidden', 'true');
  dataHacker.setAttribute('aria-hidden', 'true');

  for (const repo of repos) {
    const name = repo.name;
    const owner = repo.owner.login;
    const avatar = repo.owner.avatar_url;
    const description = repo.description || 'No description provided.';
    const repoUrl = repo.html_url;

    /* console.log(Repo: ${name} av ${owner}); */

    let location = null;
    try {
      location = await getUserLocation(repo.owner.url);
    } catch (err) {
      /* console.warn(Kunde inte hämta plats för ${owner}, err); */
    }

    getFlagHtml(location, extractCountryCode);

    const cardHTML = `
  <article class="repo-card">
    <div class="repo-header">
      <img src="${images.gitHubBlackIcon}" alt="GitHub logo" width="32" />
      <h3 class="repo-title">${repo.name}</h3>
    </div>

    <div class="repo-sections">
      <div class="repo-owner-section">
        <h4>Owner</h4>
        <div class="info-row">
          <img src="${repo.owner.avatar_url}" alt="Avatar of ${
      repo.owner.login
    }" class="avatar" width="24" />
          <span><strong>User name:</strong> ${repo.owner.login}</span>
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
          <span><strong>Stars:</strong> ${repo.stargazers_count}</span>
        </div>
        <div class="info-row">
          <img src="${images.codeIcon}" alt="" aria-hidden="true" width="24"/>
          <span><strong>Primary language:</strong> ${
            repo.language || 'N/A'
          }</span>
        </div>
      </div>
    </div>

    <div class="action-buttons profile">
      <a href="${
        repo.owner.html_url
      }" class="action-button profile" target="_blank" aria-label="View GitHub profile of ${
      repo.owner.login
    }">
        <img src="${
          images.userProfileIcon
        }" alt="" class="avatar" width="24" /> GitHub Profile page
        <img src="${images.externalIcon}" alt="" width="24" />
      </a>
      <a href="${
        repo.html_url
      }" class="action-button" target="_blank" aria-label="View repository ${
      repo.name
    } on GitHub">
        <img src="${
          images.repoIcon
        }" alt="" class="repoikon" width="24" /> GitHub Repository
        <img src="${images.externalIcon}" alt="" width="24" />
      </a>
    </div>
  </article>
`;

    githubcontainer.insertAdjacentHTML('beforeend', cardHTML);
  }

  console.log('Klar med renderGitHubResults');
}
