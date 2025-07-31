/**
 * @file spinner.js
 * @description Utility functions to control the loading spinner and status text
 * for GitHub, HackerNews, and WordCloud content on the website.
 *
 * These functions update the UI by showing, hiding, or changing
 * the spinner and related text based on the loading state.
 *
 * @author Sara Sjödin Scolari
 */

/**
 * Show the loading spinner and optional loading message
 * based on the data source.
 *
 * @function setSpinnerLoading
 * @param {string} source - The data source name (github, hackernews or wordcloud)
 */
function setSpinnerLoading(source) {
  const spinner = document.querySelector(`.${source}-spinner`);
  const wrapper = spinner?.closest('.spinner-wrapper');
  const textSpan = wrapper?.querySelector('.spinner-text');

  if (spinner && wrapper) {
    wrapper.classList.remove('hidden');
    spinner.style.display = 'inline-block';

    if (textSpan && source !== 'wordcloud') {
      textSpan.textContent =
        source === 'github'
          ? 'GitHub repos loading...'
          : 'Hacker News articles loading...';
    }
  }
}

/**
 * Hide the spinner and show a message about how many items were loaded
 *
 * @function setSpinnerResult
 * @param {string} source - The data source name (github, hackernews or wordcloud)
 * @param {number} hits - Number of results that were loaded
 */
function setSpinnerResult(source, hits) {
  const spinner = document.querySelector(`.${source}-spinner`);
  if (spinner) spinner.style.display = 'none';

  const githubText = document.querySelector('#spinner-github .spinner-text');
  const hnText = document.querySelector('#spinner-hackernews .spinner-text');

  if (source === 'github' && githubText) {
    githubText.innerHTML = `<span class="status-label">GitHub repos loaded:</span> ${hits}`;
  }

  if (source === 'hackernews' && hnText) {
    hnText.innerHTML = `<span class="status-label">Hacker News articles loaded:</span> ${hits}`;
  }

  // For Wordcloud – different setup
  if (source === 'wordcloud') {
    const wordcloudText = document.querySelector(
      '#spinner-wordcloud .spinner-text'
    );
    if (wordcloudText) {
      wordcloudText.textContent = '';
    }
  }
}

/**
 * Hide the spinner and show an error message when data loading fails.
 *
 * @function setSpinnerError
 * @param {string} source - The data source name that caused the error.
 */
function setSpinnerError(source) {
  const spinnerWrapper = document
    .querySelector(`.${source}-spinner`)
    .closest('.spinner-wrapper');
  const spinner = document.querySelector(`.${source}-spinner`);
  const label = document.getElementById(`${source}-result`);
  const errorMessage = document.getElementById(
    `status-message-error-${source}`
  );

  if (spinner instanceof HTMLElement) {
    spinner.style.display = 'none';
  }

  if (label) {
    label.textContent = `Error fetching ${source} results`;
  }

  // Spinner-wrapper hides
  if (spinnerWrapper) {
    spinnerWrapper.classList.add('hidden');
  }

  if (errorMessage) {
    errorMessage.classList.remove('hidden');
    errorMessage.setAttribute('aria-hidden', 'false');
  }
}

/**
 * Exported spinner controller with loading, result and error states.
 * All three functions exported "together"
 *
 * @constant
 * @type {Object}
 * @property {Function} loading - Start loading spinner for a source
 * @property {Function} result - Show result and hide spinner for a source
 * @property {Function} error - Show error message and hide spinner for a source
 */
export const spinner = {
  loading: setSpinnerLoading,
  result: setSpinnerResult,
  error: setSpinnerError
};
