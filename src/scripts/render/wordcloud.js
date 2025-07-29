/**
 * @file wordcloud.js
 * @description Uses the external library wordclou` (wordcloud2.js)
 * to render a word cloud in the canvas
 * based on the github and hackernews input text.
 * @author Sara Sjödin Scolari
 */

import WordCloud from 'wordcloud';
import { scaleCanvasToDevice } from '../utils.js';

/**
 * @function renderWordCloud
 * @param {string} text - Combined plain text from GitHub descriptions and Hacker News titles
 * = Text used to generate the word cloud
 * @returns {number} Number of unique words rendered in the word cloud
 */
export function renderWordCloud(text) {
  console.log('[renderWordCloud] called');

  const canvas = document.querySelector('.wordcloud-canvas');
  if (!text || !(canvas instanceof HTMLCanvasElement)) return;

  canvas.classList.remove('hidden');

  // High res of canvas before render
  scaleCanvasToDevice(canvas);
  const words = text.toLowerCase().match(/\b\w{4,}\b/g);
  console.log(`[renderWordCloud] Extracted ${words?.length || 0} words`);
  const freq = {};
  words?.forEach((word) => (freq[word] = (freq[word] || 0) + 1));
  const wordArray = Object.entries(freq);
  console.log(`[renderWordCloud] Unique words: ${wordArray.length}`);

  WordCloud(canvas, {
    list: wordArray,
    gridSize: 8,
    weightFactor: 30,
    fontFamily: 'Arial',
    color: 'random-dark',
    backgroundColor: '#ffffff'
  });
  console.log('[renderWordCloud] Word cloud rendering triggered');
  return wordArray.length;
}
