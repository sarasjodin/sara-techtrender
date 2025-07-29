/**
 * @file wordcloud-api.js
 * @description Fetches GitHub and Hacker News data for a combined wordcloud
 * @author Sara Sjödin Scolari
 */

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
    console.log('fetched WordCloudData from GitHub and HN');

    return githubText + ' ' + hackerNewsText;
  } catch (error) {
    console.error('Error fetching WordCloud data:', error);
    return '';
  }
}
