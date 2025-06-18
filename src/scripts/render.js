/**
 * Renders GitHub repository results to the page.
 * @param {Array} repos - List of GitHub repo objects.
 */
export function renderGitHubResults(repos) {
  const container = document.getElementById('githubdata');
  const heading = document.getElementById('githubheading');

  if (!repos.length) {
    heading.classList.add('hidden');
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML = '';
    return;
  }

  heading.classList.remove('hidden');
  container.setAttribute('aria-hidden', 'false');
  container.innerHTML = repos
    .map(
      (repo) => `
      <p><a href="${repo.html_url}" target="_blank">${repo.full_name}</a></p>
    `
    )
    .join('');
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
