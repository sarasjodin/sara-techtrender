/**
 * Renders GitHub repository results to the page.
 * @param {Array} repos - List of GitHub repo objects.
 */
import { getUserLocation, extractCountryCode } from './github.js';
import { flagMap } from './flags.js';
import globalIcon from '../assets/images/global.svg';
import starIcon from '../assets/images/star.svg';

/* console.log('globalIcon:', globalIcon);
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
        : rawFlag || globalIcon;

    const flag = `<img src="${flagSrc}" alt="Flag of ${
      countryCode || 'Unknown'
    }" class="flag" width="24" height="24" />`;

    const cardHTML = `
      <article class="card repo-card" tabindex="0" aria-labelledby="repo-name-${name}">
        <header>
          <h2 id="repo-name-${name}">${name}</h2>
          <p class="owner">by <span>${owner}</span> Language code: ${
      countryCode || 'N/A'
    } ${flag}</p>
        </header>
        <p class="description">${description}</p>
        <ul class="repo-info">
          <li><img src="${starIcon}" alt="text" class="icon"> Stars: ${
      repo.stargazers_count
    }</li>
          <li><img src="${starIcon}" alt="text" class="icon"> Language: ${
      repo.language || 'N/A'
    }</li>
        </ul>
        <a href="${repoUrl}" class="repo-link" target="_blank" aria-label="View repository on GitHub">View on GitHub</a>
        <img src="${starIcon}" alt="Wikipedia search" class="icon" data-api="wikipedia" data-title="${name}" />
        <img src="${starIcon}" alt="StackOverflow search" class="icon" data-api="stackoverflow" data-title="${name}" />
        <img src="${starIcon}" alt="OpenLibrary search" class="icon" data-api="openlibrary" data-title="${name}" />

      </article>
    `;
    /* console.log('starIcon är:', starIcon); */
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
      <p><a href="${post.url}" target="_blank">${post.title}</a></p>
    `
    )
    .join('');
}
