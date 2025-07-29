/**
 * @file hackernews.js
 * @description Renders articles from HackerNews into "article-cards"
 * @author Sara Sjödin Scolari
 */

import { formatDate, truncateHtmlText } from '../utils.js';
import { images } from '../../assets/images.js';

/**
 * @param {HackerNewsArticle[]} articles - Array of Hacker News article objects.
 * @returns {void}
 * @typedef {Object} HackerNewsArticle
 * @property {string} title - The title of the article
 * @property {string} author - The author of the article.
 * @property {string} created_at - When the article was created
 * @property {string} updated_at - When the article was last updated (optional).
 * @property {string} [url] - A link to the full article
 * @property {Object} [_highlightResult] - Highlighted search content
 * @property {Object} [_highlightResult.story_text] - Object with a highlighted story
 * @property {Object} [_highlightResult.story_text.value] - HTML string of highlighted text
 */
export function renderHackerNewsList(articles) {
  const container = document.getElementById('hackernewsdata');
  const headingHacker = document.getElementById('hackerheading');
  const dataHacker = document.getElementById('hackernewsdata');
  const headingGitHub = document.getElementById('githubheading');
  const dataGitHub = document.getElementById('githubdata');

  /* console.log(`Börjar rendera ${repos.length} GitHub-repos`); */
  document.getElementById('sourcetoggle')?.classList.remove('hidden');
  headingHacker.classList.remove('hidden');
  dataHacker.classList.remove('hidden');
  headingHacker.setAttribute('aria-hidden', 'false');
  dataHacker.setAttribute('aria-hidden', 'false');

  headingGitHub.classList.add('hidden');
  dataGitHub.classList.add('hidden');
  headingGitHub.setAttribute('aria-hidden', 'true');
  dataGitHub.setAttribute('aria-hidden', 'true');

  container.innerHTML = articles
    .map((hit) => {
      const rawHtml = hit._highlightResult?.story_text?.value || '';
      const truncatedText = truncateHtmlText(rawHtml, 120);

      return `
<article class="article-card">
  <div class="article-header">
    <img src="${images.hackerNewsIcon}" alt="HackerNews logo" width="32" />
    <h3>${hit.title || 'No Title'}</h3>
  </div>

  <div class="article-sections">
    <div class="article-section">
      <h4>Author</h4>
      <div class="info-row">
        <img src="${images.hackerNewsIcon}" alt="" width="20" />
        <span><strong>Name:</strong> ${hit.author}</span>
      </div>
    </div>

    <div class="article-section">
      <h4>Article Info</h4>
      <div class="info-row">
        <img src="${images.hackerNewsIcon}" alt="" width="20" />
        <span><strong>Created:</strong> ${formatDate(hit.created_at)}</span>
      </div>
      <div class="info-row">
        <img src="${images.hackerNewsIcon}" alt="" width="20" />
        <span><strong>Updated:</strong> ${formatDate(hit.updated_at)}</span>
      </div>
      ${
        truncatedText
          ? `<div class="info-row">
              <img src="${images.hackerNewsIcon}" alt="" width="20" />
              <span><strong>Preview:</strong></span>
            </div>
            <div class="story-text-preview">${truncatedText}</div>`
          : ''
      }
    </div>
  </div>

  <div class="action-buttons">
    <a
      href="${hit.url || '#'}"
      class="action-button"
      target="_blank"
      aria-label="View article ${hit.title} on Hacker News"
    >
      <img src="${
        images.repoIcon
      }" class="hackerikon" alt="" width="24" /> View on Hacker News
      <img src="${
        images.externalIcon
      }" class="externalikon" alt="" width="24" />
    </a>
  </div>
</article>
`;
    })
    .join('');
}
