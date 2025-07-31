/**
 * @file controllers/ui-controller.js
 * @description handles show/hide/toggle for the UI
 *
 * @author Sara SjödinUI Controller
 */

/**
 * Hides a page element by adding the hidden attribute.
 * @function hideElement
 * @param {string} id - The ID of the element to hide.
 * @returns {void}
 */
export function hideElement(id) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('hidden', '');
}

/**
 * Hides the error message element for a given source.
 * @function hideErrorMessage
 * @param {string} source - github or hackernews.
 * @returns {void}
 */
export function hideErrorMessage(source) {
  const errorEl = document.getElementById(`status-message--error--${source}`);
  if (errorEl) {
    errorEl.setAttribute('aria-hidden', 'true');
    errorEl.innerHTML = '';
  }
}

/**
 * Shows a hidden page element by removing the hidden attribute.
 * @function showElement
 * @param {string} id - The ID of the element to show.
 * @returns {void}
 */
export function showElement(id) {
  const el = document.getElementById(id);
  if (el) el.removeAttribute('hidden');
}

/**
 * Hides all data and status sections, to be used on startup / when the page loads.
 * @function resetUIOnLoad
 * @returns {void}
 */
export function resetUIOnLoad() {
  hideElement('source-data-section');
  hideElement('status-section');
  hideErrorMessage('github');
  hideErrorMessage('hackernews');
  hideElement('selected-github-data');
  hideElement('selected-hackernews-data');
  hideElement('sourcetoggle');
}

/**
 * Toggles GitHub and Hacker News data visibility.
 * Shows one data section and hides the other based on the selected source.
 * @function toggleDataSource
 * @param {string} source - github or hackernews
 * @returns {void}
 */
export function toggleDataSource(source) {
  const ghDiv = document.getElementById('selected-github-data');
  const hnDiv = document.getElementById('selected-hackernews-data');

  if (!ghDiv || !hnDiv) {
    console.warn('toggleDataSource: UI-element missing in DOM.');
    return;
  }
  console.trace('toggleDataSource triggered');
  if (source === 'github') {
    ghDiv.removeAttribute('hidden');
    hnDiv.setAttribute('hidden', '');
    document.getElementById('github-heading')?.focus();
  } else {
    hnDiv.removeAttribute('hidden');
    ghDiv.setAttribute('hidden', '');
    document.getElementById('hackernews-heading')?.focus();
  }
}

/**
 * Resets parts of the UI before starting a new search.
 * @function prepareForSearch
 * @returns {void}
 */
export function prepareForSearch() {
  showElement('status-section');
  hideErrorMessage('github');
  hideErrorMessage('hackernews');
  hideElement('selected-github-data');
  hideElement('selected-hackernews-data');
  hideElement('sourcetoggle');
}

/**
 * Shows data and toggle sections after data is loaded
 * @function showAfterFetch
 * @returns {void}
 */
export function showAfterFetch() {
  showElement('source-data-section');
  showElement('sourcetoggle');
  showElement('selected-github-data');
}

/**
 * Shows the status section and sets a default message
 * @function showStatusSection
 * @returns {void}
 */
export function showStatusSection() {
  const section = document.getElementById('status-section');
  if (section) section.removeAttribute('hidden');

  const defaultMsg = document.getElementById('status-message--default');
  if (defaultMsg) defaultMsg.textContent = 'Searching...';
}

/**
 * Updates the GitHub or HackerNews error message in the UI.
 * @function showErrorMessage
 * @param {string} source - github or hackernews.
 * @param {string} message - The error message to display.
 * @returns {void}
 */
export function showErrorMessage(source, message) {
  const errorEl = document.getElementById(`status-message--error--${source}`);
  if (errorEl) {
    errorEl.innerHTML = `${
      source === 'github' ? 'GitHub repos' : 'Hacker News articles'
    } error: <span>${message}</span>`;
    errorEl.removeAttribute('hidden');
  }
}

/**
 * Sets the aria-hidden attribute on a page element.
 * @function updateAriaHidden
 * @param {string} id - The ID of the element.
 * @param {boolean} isHidden - Set to true to hide from screen readers.
 * @returns {void}
 */
export function updateAriaHidden(id, isHidden) {
  const element = document.getElementById(id);
  if (element) {
    element.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
  }
}
