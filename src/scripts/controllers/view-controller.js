/**
 * @file view-controller.js
 * @description Controls toggling between GitHub and HackerNews views in the UI.
 * Shows or hides sections and updates buttons based on selected data source.
 * Meant to improve accessibility and user feedback when switching between APIs.
 *
 * Should be used together with UI radio buttons that control which API data is shown.
 *
 * @author Sara Sjödin Scolari
 */

/**
 * Shows the selected data source (GitHub or HackerNews) in the UI,
 * hides the other, and updates the toggle button states.
 *
 * @function showDataSource
 * @param {'github' | 'hn'} view - The selected source to show in the interface.
 * @returns {void}
 */
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
      console.log(view);
    }
  });
}

/**
 * Adds event listeners to radio buttons for source selection.
 * When a radio button is changed, it calls showDataSource() to update the view.
 *
 * The function targets all radio inputs with the name "source".
 *
 * @function setupToggleButtons
 * @returns {void}
 */
export function setupToggleButtons() {
  const radios = document.querySelectorAll('input[name="source"]');

  radios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      const value = e.target.value;
      if (value === 'github' || value === 'hn') {
        showDataSource(value);
      }
    });
  });
}
