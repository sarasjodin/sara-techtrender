/**
 * @file spinner-controller.js
 * @description Controls loading spinners, fetches data, and triggers rendering
 * for GitHub repositories, HackerNews articles, and a Word Cloud.
 * This controller coordinates between API functions and visual components.
 *
 * @author Sara Sjödin
 */

import { spinner } from '../components/spinner.js';
import { fetchWordCloudData } from '../api/wordcloud-api.js';
import { renderWordCloud } from '../api/wordcloud-api.js';
import { fetchGithubRepos, renderGithubCards } from '../api/github-api.js';
import {
  fetchHackerNewsArticles,
  renderHackerNewsList
} from '../api/hackernews-api.js';

/**
 * Handles spinner + data fetch + render for a specific data source.
 *
 * @async
 * @function showSpinnerSource
 * @param {'wordcloud' | 'github' | 'hackernews'} source - The data source to load
 * @param {string} [query=''] - Optional search term used by GitHub and Hacker News
 * @returns {Promise<void>} A Promise that resolves when loading and rendering is complete
 */
export async function showSpinnerSource(source, query = '') {
  try {
    spinner.loading(source);

    switch (source) {
      case 'wordcloud': {
        const text = await fetchWordCloudData();
        document
          .getElementById('spinner-wordcloud')
          ?.querySelector('p')
          ?.remove();

        const wordCount = renderWordCloud(text);
        spinner.result(source, wordCount);
        console.log(`Spinner result laddas – textlängd: ${wordCount}`);
        console.trace();
        showFigcaption(wordCount);
        break;
      }

      case 'github': {
        showStatusSection();
        const repos = await fetchGithubRepos(query);
        await renderGithubCards(repos);
        spinner.result(source, repos.length);
        break;
      }

      case 'hackernews': {
        showStatusSection();
        const articles = await fetchHackerNewsArticles(query);
        await renderHackerNewsList(articles);
        spinner.result(source, articles.length);
        break;
      }

      default:
        console.warn(`Unknown source: ${source}`);
    }
  } catch (error) {
    console.error(`Fel vid laddning från ${source}:`, error);
    spinner.error(source);
  }
}


/**
 * Shows the status section where result info and errors are shown.
 * @function showStatusSection
 * @returns {void}
 */
function showStatusSection() {
  const section = document.getElementById('status-section');
  section?.classList.remove('hidden');
  section?.setAttribute('aria-hidden', 'false');
}

/**
 * Displays a caption below the word cloud based on how many words were rendered.
 *
 * @function showFigcaption
 * @param {number} wordCount - Number of words rendered in the word cloud
 * @returns {void}
 */
function showFigcaption(wordCount) {
  const caption = document.getElementById('wordcloud-caption');
  if (caption) {
    const count = typeof wordCount === 'number' ? wordCount : '?';
    caption.textContent = `${count} popular tech terms collected in real time from GitHub & Hacker News`;
    caption.classList.remove('hidden');
  }
}

/**
 * Loads both GitHub and Hacker News data in parallel and shows their spinners and content
 *
 * @async
 * @function showAllSources
 * @param {string} query - Search query for both sources
 * @returns {Promise<void>}
 */
export async function showAllSources(query) {
  await Promise.all([
    showSpinnerSource('github', query),
    showSpinnerSource('hackernews', query)
  ]);
}
