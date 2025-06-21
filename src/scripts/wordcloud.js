import WordCloud from 'wordcloud';

const spinner = document.getElementById('spinner-wordcloud');
const canvas = document.getElementById('wordcloud');

spinner.classList.remove('hidden');
canvas.classList.add('hidden');

export async function generateWordCloud() {
  /* console.log('Genererar wordcloud'); */

  // GitHub trending repos
  const githubRes = await fetch(
    'https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars&order=desc'
  );
  const githubData = await githubRes.json();
  const githubText = (githubData.items || [])
    .map((repo) => repo.description || '')
    .join(' ');

  // Hacker News frontpage (through Algolia API)
  const hnRes = await fetch(
    'https://hn.algolia.com/api/v1/search?tags=front_page'
  );
  const hnData = await hnRes.json();
  const hnText = (hnData.hits || []).map((hit) => hit.title || '').join(' ');

  const combinedText = githubText + ' ' + hnText;

  /* console.log('Text att bearbeta:', combinedText.slice(0, 300)); */

  const words = combinedText.toLowerCase().match(/\b\w{4,}\b/g);
  const freq = {};
  words?.forEach((word) => (freq[word] = (freq[word] || 0) + 1));
  const wordArray = Object.entries(freq);

  WordCloud(document.getElementById('wordcloud'), {
    list: wordArray,
    gridSize: 4,
    weightFactor: 8,
    fontFamily: 'Arial',
    color: 'random-dark',
    backgroundColor: '#ffffff'
  });

  spinner.classList.add('hidden');
  canvas.classList.remove('hidden');
}
