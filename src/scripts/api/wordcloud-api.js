/**
 * @file wordcloud-api.js
 * @description Fetches GitHub and Hacker News data and render a combined wordcloud
 * utilizing an external library wordcloud (wordcloud2.js)
 * @author Sara Sjödin Scolari
 */

import WordCloud from 'wordcloud';
import { scaleCanvasToDevice } from '../utils.js';

/**
 * Fetches and combines GitHub repo descriptions and HN article titles
 * for word cloud generation.
 * @returns {Promise<string>}
 */
export async function fetchWordCloudData() {
  try {
    // GitHub
    const githubRes = await fetch(
      'https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars&order=desc'
    );
    const githubData = await githubRes.json();
    const githubText = (githubData.items || [])
      .map((repo) => repo.description || '')
      .join(' ');

    // Hacker News
    const hnRes = await fetch(
      'https://hn.algolia.com/api/v1/search?tags=front_page'
    );
    const hackerNewsData = await hnRes.json();
    const hackerNewsText = (hackerNewsData.hits || [])
      .map((hit) => hit.title || '')
      .join(' ');

    return githubText + ' ' + hackerNewsText;
  } catch (error) {
    console.error('Error fetching WordCloud data:', error);
    return '';
  }
}

/**
 * @function renderWordCloud
 * @param {string} text - Combined plain text from GitHub descriptions and Hacker News titles
 * = Text used to generate the word cloud with utilizing an external library wordcloud (wordcloud2.js)
 * @returns {number} Number of unique words rendered in the word cloud
 */
export function renderWordCloud(text) {
  const canvas = document.querySelector('.wordcloud-canvas');
  if (!text || !(canvas instanceof HTMLCanvasElement)) return;

  canvas.classList.remove('hidden');

  // High res of canvas before render
  scaleCanvasToDevice(canvas);
  const words = text.toLowerCase().match(/\b\w{4,}\b/g);
  const freq = {};
  words?.forEach((word) => (freq[word] = (freq[word] || 0) + 1));
  const wordArray = Object.entries(freq);

  WordCloud(canvas, {
    list: wordArray,
    gridSize: 8,
    weightFactor: 30,
    fontFamily: 'Arial',
    color: 'random-dark',
    backgroundColor: '#ffffff'
  });
  return wordArray.length;
}
