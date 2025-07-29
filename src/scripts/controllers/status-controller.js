/**
 * @file controllers/status-controller.js
 * @description UI controller for showing and managing loading, error, and result status messages per data source.
 * Intended for use when fetching data from APIs like GitHub or Hacker News.
 * Word cloud source is excluded from this kind of status messages.
 * @author Sara Sjödin Scolari
 */

/**
 * Displays the status message section in the UI for a specific data source,
 * except for the "wordcloud" source which does not use status indicators.
 *
 * @function showStatusMessage
 * @param {'loading'|'error'|'result'} type - Type of message to show
 * @param {string} source - The source identifier, github or hackernews.
 */
export function showStatusMessage(type, source) {
  if (source === 'wordcloud') return;
  // Hide other status types for sources
  showStatusMessage('loading', 'github');
  showStatusMessage('loading', 'hackernews');

  const section = document.getElementById('status-section');
  section?.classList.remove('hidden');
  section?.setAttribute('aria-hidden', 'false');
}

/**
 * Hides all status messages (loading, error, result) and then
 * shows the "loading" message for each specified source.
 *
 * Used when starting a new fetch operation from start
 *
 * @function showInitialStatusForSources
 * @param {string[]} [sources=[]] - Array of source IDs to update status
 */
export function showInitialStatusForSources(sources = []) {
  sources.forEach((source) => {
    ['loading', 'result', 'error'].forEach((type) => {
      document
        .getElementById(`status-message-${type}-${source}`)
        ?.classList.add('hidden');
    });

    document
      .getElementById(`status-message-loading-${source}`)
      ?.classList.remove('hidden');
  });
}
