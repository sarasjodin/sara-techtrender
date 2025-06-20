export function showDataSource(view) {
  const isGitHub = view === 'github';
  const isHackerNews = view === 'hn';

  const dataGitHub = document.getElementById('githubdata');
  const headingGitHub = document.getElementById('githubheading');
  const dataHacker = document.getElementById('hackernewsdata');
  const headingHacker = document.getElementById('hackerheading');
  const labels = document.querySelectorAll('.button-api');

  dataGitHub.classList.toggle('hidden', !isGitHub);
  headingGitHub.classList.toggle('hidden', !isGitHub);
  dataGitHub.setAttribute('aria-hidden', String(!isGitHub));
  headingGitHub.setAttribute('aria-hidden', String(!isGitHub));

  dataHacker.classList.toggle('hidden', !isHackerNews);
  headingHacker.classList.toggle('hidden', !isHackerNews);
  dataHacker.setAttribute('aria-hidden', String(!isHackerNews));
  headingHacker.setAttribute('aria-hidden', String(!isHackerNews));

  labels.forEach((label) => {
    const input = label.querySelector('input[type="radio"]');
    if (input instanceof HTMLInputElement) {
      const isActive = input.value === view;
      input.checked = isActive;
      label.classList.toggle('active', isActive);
    }
  });
}
