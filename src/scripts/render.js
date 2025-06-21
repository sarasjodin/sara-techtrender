/**
 * Renders GitHub repository results to the page.
 * @param {Array} repos - List of GitHub repo objects.
 */
import { getUserLocation, extractCountryCode } from './github.js';
import { flagMap } from './flags.js';
import { showDataSource } from './ui.js';
import codeIcon from '../assets/images/code_icon.svg';
import geoCodeIcon from '../assets/images/geo_code_icon.svg';
import starIcon from '../assets/images/star.svg';
import repoIcon from '../assets/images/repo_icon.svg';
import userProfileIcon from '../assets/images/user_profile_icon.svg';
import externalIcon from '../assets/images/external_icon.svg';
import hackerNewsIcon from '../assets/images/hacker-news_black.svg';
import gitHubBlackIcon from '../assets/images/github-mark_black.svg';
import { generateWordCloud } from './wordcloud.js';

/* console.log('geoCodeIcon:', geoCodeIcon);
 */

generateWordCloud();

export async function renderGitHubResults(repos) {
  const container = document.getElementById('githubdata');
  const headingGitHub = document.getElementById('githubheading');
  const dataGitHub = document.getElementById('githubdata');
  container.innerHTML = '';

  showDataSource('github');

  if (!repos.length) {
    console.warn('Inga GitHub-repos att visa.');
    container.setAttribute('aria-hidden', 'true');
    headingGitHub.classList.add('hidden');
    dataGitHub.classList.add('hidden');
    headingGitHub.setAttribute('aria-hidden', 'true');
    dataGitHub.setAttribute('aria-hidden', 'true');
    dataGitHub.innerHTML = '';
    return;
  }

  /* console.log(`Börjar rendera ${repos.length} GitHub-repos`); */
  document.getElementById('sourcetoggle')?.classList.remove('hidden');
  headingGitHub.classList.remove('hidden');
  dataGitHub.classList.remove('hidden');
  headingGitHub.setAttribute('aria-hidden', 'false');
  dataGitHub.setAttribute('aria-hidden', 'false');

  for (const repo of repos) {
    const name = repo.name;
    const owner = repo.owner.login;
    const avatar = repo.owner.avatar_url;
    const description = repo.description || 'No description provided.';
    const repoUrl = repo.html_url;

    /* console.log(`Repo: ${name} av ${owner}`); */

    let location = null;
    try {
      location = await getUserLocation(repo.owner.url);
    } catch (err) {
      /* console.warn(`Kunde inte hämta plats för ${owner}`, err); */
    }

    const countryCode = extractCountryCode(location);
    /* console.log(`Landskod för ${owner}:`, countryCode || 'Ingen'); */

    const rawFlag = flagMap[countryCode?.toLowerCase()];
    const flagSrc =
      rawFlag && typeof rawFlag === 'object' && rawFlag.default
        ? rawFlag.default
        : rawFlag || geoCodeIcon;

    const flag = `<img src="${flagSrc}" alt="Flag of ${
      countryCode || 'Unknown'
    }" class="flag" width="24" height="24" />`;

    const cardHTML = `<article class="repo-card">
  <div class="repo-header">
    <img
      src="${gitHubBlackIcon}"
      alt="GitHub logo"
      width="32"
    />
    ${repo.name}
  </div>

  <div class="repo-sections">
    <section class="repo-section">
      <h3>Owner</h3>
      <div class="info-row">
        <img src="${repo.owner.avatar_url}" alt="Avatar of ${
      repo.owner.login
    }" class="avatar" width="24"/>
        <span><strong>User name:</strong> ${repo.owner.login}</span>
      </div>
      <div class="info-row">
        <img src="${geoCodeIcon || ''}" alt="" aria-hidden="true" width="24"/>
        <span><strong>Geographic location:</strong> ${location || 'N/A'}</span>
      </div>
    </section>

    <section class="repo-section">
      <h3>Repository</h3>
      <div class="info-row">
        <img src="${starIcon}" alt="" aria-hidden="true" width="24"/>
        <span><strong>Stars:</strong> ${repo.stargazers_count}</span>
      </div>
      <div class="info-row">
        <img src="${codeIcon}" alt="" aria-hidden="true" width="24"/>
        <span><strong>Primary language:</strong> ${
          repo.language || 'N/A'
        }</span>
      </div>
    </section>
  </div>

  <div class="action-buttons profile">
    <a
      href="${repo.owner.html_url}"
      class="action-button profile"
      target="_blank"
      aria-label="View GitHub profile of ${repo.owner.login}"
    >
      <img src="${userProfileIcon}" alt="" class="avatar" width="24"/> GitHub Profile page
    <img src="${externalIcon}" alt="" width="24" /></a>
    <a
      href="${repo.html_url}"
      class="action-button"
      target="_blank"
      aria-label="View repository ${repo.name} on GitHub"
    >
      <img src="${repoIcon}" alt="" width="24" /> GitHub Repository
    <img src="${externalIcon}" alt="" width="24" /></a>
  </div>
</article>`;
    container.insertAdjacentHTML('beforeend', cardHTML);
  }

  /* console.log('Klar med renderGitHubResults'); */
}

export function renderHackerNewsResults(hits) {
  const container = document.getElementById('hackernewsdata');
  const headingHacker = document.getElementById('hackerheading');
  const dataHacker = document.getElementById('hackernewsdata');

  if (!hits.length) {
    console.warn('Inga GitHub-repos att visa.');
    container.setAttribute('aria-hidden', 'true');
    headingHacker.classList.add('hidden');
    dataHacker.classList.add('hidden');
    headingHacker.setAttribute('aria-hidden', 'true');
    dataHacker.setAttribute('aria-hidden', 'true');
    dataHacker.innerHTML = '';
    return;
  }

  /* console.log(`Börjar rendera ${repos.length} GitHub-repos`); */
  document.getElementById('sourcetoggle')?.classList.remove('hidden');
  headingHacker.classList.remove('hidden');
  dataHacker.classList.remove('hidden');
  headingHacker.setAttribute('aria-hidden', 'false');
  dataHacker.setAttribute('aria-hidden', 'false');

  container.innerHTML = hits
    .map((hit) => {
      const rawHtml = hit._highlightResult?.story_text?.value || '';
      const truncatedText = truncateHtmlText(rawHtml, 120);

      return `
<article class="repo-card">
  <div class="repo-header">
    <img src="${hackerNewsIcon}" alt="HackerNews logo" width="32" />
    ${hit.title || 'No Title'}
  </div>

  <div class="repo-sections">
    <section class="repo-section">
      <h3>Author</h3>
      <div class="info-row">
        <img src="${hackerNewsIcon}" alt="" width="20" />
        <span><strong>Name:</strong> ${hit.author}</span>
      </div>
    </section>

    <section class="repo-section">
      <h3>Article</h3>
      <div class="info-row">
        <img src="${hackerNewsIcon}" alt="" width="20" />
        <span><strong>Created:</strong> ${formatDate(hit.created_at)}</span>
      </div>
      <div class="info-row">
        <img src="${hackerNewsIcon}" alt="" width="20" />
        <span><strong>Updated:</strong> ${formatDate(hit.updated_at)}</span>
      </div>
      <div class="info-row">
        <img src="${hackerNewsIcon}" alt="" width="20" />
        <span><strong>Text:</strong></span>
      </div>
      <div class="story-text-preview">${truncatedText}</div>
    </section>
  </div>

  <div class="action-buttons">
    <a
      href="${hit.url || '#'}"
      class="action-button"
      target="_blank"
      aria-label="View article ${hit.title} on Hacker News"
    >
      <img src="${repoIcon}" alt="" width="24" /> Hacker News article
      <img src="${externalIcon}" alt="" width="24" />
    </a>
  </div>
</article>
`;
    })
    .join('');
}

// Strips HTML and limits to X characters
function truncateHtmlText(htmlString, maxChars) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  const text = div.textContent || div.innerText || '';
  return text.length > maxChars ? text.slice(0, maxChars) + '…' : text;
}

function formatDate(isoDateStr) {
  const date = new Date(isoDateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // månader 0–11
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hour}:${minute}`;
}
