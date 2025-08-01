/**
 * @file wikipedia-api.js
 * @description Fetches a title, summary text, and an optional image from Wikipedia for a programming language / term
 * @author Sara Sjödin Scolari
 */

/**
 * @function fetchWikipediaSummary
 * @description Fetches the summary from Wikipedia for a term.
 * This function matches a "programming language name" to a corresponding name of a "Wikipedia page" (title).
 * Some programming languages have been manually overridden to match the specific Wikipedia term format.
 * If the provided term is not found in the manual overrides, the function appends "(programming language)"
 * to the term and uses that as a fallback term.
 *
 * @param {string} term - The search term (typically a programming language or technology name).
 * @returns {Promise<{title: string, extract: string, image: string|null}>} A promise that resolves to an object containing:
 * - title: The title of the Wikipedia article
 * - extract: A summary of the article
 * - image: The URL of the thumbnail image, or null if no image is available
 */
export async function fetchWikipediaSummary(term) {
  const languageOverrides = {
    C: 'C (programming language)',
    'C#': 'C Sharp (programming language)',
    'F#': 'F Sharp (programming language)',
    Go: 'Go (programming language)',
    Python: 'Python (programming language)',
    Java: 'Java (programming language)',
    Ruby: 'Ruby (programming language)',
    'Jupyter Notebook': 'Project Jupyter',
    Svelte: 'Svelte',
    MDX: 'MultiDimensional eXpressions',
    TypeScript: 'TypeScript',
    CSS: 'CSS',
    Vue: 'Vue.js',
    'Objective C++': 'Objective - C',
    'Objective C': 'Objective - C',
    SCSS: 'Sass (style sheet language)',
    Dockerfile: 'Docker (software)'
  };

  // Check if the provided term is in the languageOverride mapping.
  // If it's not, append (programming language) to the term for fallback (standard wiki procedure for programming lang).
  const refinedTerm =
    languageOverrides[term] || `${term} (programming language)`;
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    refinedTerm
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Not found');

    const data = await response.json();

    // Return the summary data (title, text and image URL if available).
    return {
      title: data.title,
      extract: data.extract,
      image: data.thumbnail?.source || null
    };
  } catch (err) {
    return null;
  }
}
