/**
 * Renders GitHub repository results to the page.
 * @param {Array} repos - List of GitHub repo objects.
 */
import { getUserLocation, extractCountryCode } from './github.js';
import { flagMap } from './flags.js';
import codeIcon from '../assets/images/code_icon.svg';
import geoCodeIcon from '../assets/images/geo_code_icon.svg';
import starIcon from '../assets/images/star.svg';
import repoIcon from '../assets/images/repo_icon.svg';
import userProfileIcon from '../assets/images/user_profile_icon.svg';
import externalIcon from '../assets/images/external_icon.svg';

/* console.log('geoCodeIcon:', geoCodeIcon);
 */
export async function renderGitHubResults(repos) {
  const container = document.getElementById('githubdata');
  const heading = document.getElementById('githubheading');
  container.innerHTML = '';

  if (!repos.length) {
    console.warn('Inga GitHub-repos att visa.');
    heading.classList.add('hidden');
    container.setAttribute('aria-hidden', 'true');
    return;
  }

  /* console.log(`Börjar rendera ${repos.length} GitHub-repos`); */
  heading.classList.remove('hidden');
  container.setAttribute('aria-hidden', 'false');

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
      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
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

export function renderHackerNewsResults(posts) {
  const container = document.getElementById('hackernewsdata');
  const heading = document.getElementById('hackerheading');

  if (!posts.length) {
    heading.classList.add('hidden');
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML = '';
    return;
  }

  heading.classList.remove('hidden');
  container.setAttribute('aria-hidden', 'false');
  container.innerHTML = posts
    .map(
      (post) => `
      <p><a href="${post.url}" target="_blank" rel="noopener noreferrer">${post.title}</a></p>
    `
    )
    .join('');
}
