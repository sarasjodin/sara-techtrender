/**
 * @file hackernews.js
 * @description Fetches Hacker News data thorugh algolia api
 * and renders articles from Hacker News into "article-cards"
 * @author Sara Sjödin Scolari
 */

import { images } from '../../assets/images.js';
import { spinner } from '../components/spinner.js';
import { showAfterFetch } from '../controllers/ui-controller.js';
import { formatDate, truncateHtmlText } from '../utils.js';

/**
 * Fetches Hacker News articles matching a query.
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function fetchHackerNewsArticles(query) {
  if (!query.trim()) {
    console.warn('Ingen query angiven till Hacker News-sökning.');
    console.warn('[HN] query tom, avbryter...');
    return [];
  }

  spinner.loading('hackernews');

  try {
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
      query
    )}&hitsPerPage=20`;
    const response = await fetch(url);
    const data = await response.json();
    spinner.result('hackernews', data.hits?.length || 0);
    return data.hits || [];
  } catch (error) {
    spinner.error('hackernews');
    return [];
  }
}

/**
 * @param {HackerNewsArticle[]} articles - Array of Hacker News article objects.
 * @returns {void}
 * @typedef {Object} HackerNewsArticle
 * @property {string} title - The title of the article
 * @property {string} author - The author of the article.
 * @property {string} created_at - When the article was created
 * @property {string} updated_at - When the article was last updated (optional).
 * @property {string} [url] - A link to the full article
 */

/**
 * Render the Hacker News article list to the DOM.
 * Updates heading, aria attributes and visibility.
 * @param {Array} articles
 */
export async function renderHackerNewsList(articles) {
  const hackernewscontainer = document.getElementById(
    'hackernews-data-section'
  );
  hackernewscontainer.innerHTML = '';

  showAfterFetch();

  hackernewscontainer.innerHTML = articles
    .map((article) => {
      // No html tags, max 120 characters, if none leave blank
      // Truncated text = shortening a longer piece of text to fit a specific length, often ending with "..."
      const rawHtml = article._highlightResult?.story_text?.value || '';
      const truncatedText = truncateHtmlText(rawHtml, 120);

      return `
        <article class="article-card">
          <div class="article-header">
            <img src="${
              images.hackerNewsIcon
            }" alt="" aria-hidden="true" width="32" />
            <h3>${article.title || 'No Title'}</h3>
          </div>
          <div class="article-sections">
            <div class="info-section">
              <h4>Author</h4>
              <div class="info-row">
                <img src="${
                  images.userProfileIconBlack
                }" alt="" aria-hidden="true" width="24" height="24" />
                <div>
                  <h5>Name:</h5>
                  <p>${article.author}</p>
                </div>
              </div>
            </div>
            <div class="info-section">
              <h4>Article Info</h4>
              <div class="info-row">
                <img src="${
                  images.dateCreated
                }" alt="" aria-hidden="true" width="24" height="24" />
                <div>
                  <h5 class="article-title">Created:</h5>
                  <p>${formatDate(article.created_at)}</p>
                </div>
              </div>
              <div class="info-row">
                <img src="${
                  images.dateUpdated
                }" alt="" aria-hidden="true" width="24" height="24" />
                <div>
                  <h5 class="updated">Updated:</h5>
                  <p>${formatDate(article.updated_at)}</p>
                </div>
              </div>
            </div>

            ${
              truncatedText
                ? `
            <div class="info-row">
              <img src="${images.articles}" alt="" aria-hidden="true" width="24" height="24" />
              <div>
                <h3 class="preview">Preview:</h3>
                <div class="story-text-preview">
                  <p>${truncatedText}</p>
                </div>
              </div>
            </div>
            `
                : ''
            }
          </div>
          <div class="action-buttons">
            <a
              href="${article.url || '#'}"
              class="action-button"
              target="_blank" rel="noopener noreferrer"
              aria-label="View article ${
                article.title
              } on Hacker News (opens in new tab)"
            >
            <span class="icon-left"><img src="${
              images.repoIcon
            }" class="hackerikon" alt="" aria-hidden="true" width="24" height="24" /></span>
              <span class="button-text">View on Hacker News</span>
              <span class="icon-right"><img src="${
                images.externalIcon
              }" class="externalikon" alt="" aria-hidden="true" width="24" height="24" /></span>
            </a>
          </div>
        </article>
      `;
    })
    .join('');
}
