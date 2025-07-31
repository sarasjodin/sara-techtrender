/**
 * @file quotes.js
 * @description Generates and displays a random tech-related search suggestion inside an element with the class .citat
 * This function selects a random message from a predefined list and updates the UI.
 *
 * To help users with ideas on what to search for
 *
 * @author Sara Sjödin Scolari
 */

/**
 * Picks a random suggestion from a list of tech-related questions
 * and sets it as the text content of an element with the class `.citat`.
 *
 * The element must exist in the DOM for the function to work.
 *
 * @function generateQuote
 * @returns {void}
 */
export function generateQuote() {
  const citat = document.querySelector('.citat');
  const questions = [
    'Looking into “Rust”? Memory safety meets speed.',
    'What’s trending in “TypeScript” this week?',
    'Try “Svelte” – the rising frontend star.',
    'Is “Go” taking over backends? Search to see!',
    'Explore the buzz around “Kubernetes” now.',
    'Check out “Next.js” repos today.',
    'What’s new in “Tailwind”? See what’s shipping.',
    'Is “Astro” the new JAMStack hero? Find out!',
    'Search “Django” – web frameworks never sleep.',
    'See what’s booming in “Machine Learning”.',
    'Curious about “AI”? Discover what it means today.',
    'Wondering if “Python” is still trending? Check it out!',
    'What’s all the hype about “Web3”? Search to find out.',
    'Try “apps” – see what people are building now.',
    'Explore the developer world – by searching “coding”.',
    'Heard of “open source”? Check out projects.',
    'Is “chatbot” the future of websites?',
    'Search for “design” – what’s popular in UI today?',
    'Try “cybersecurity” – what’s new in online safety?',
    'Explore “robots” – see what tech is doing next.'
  ];

  if (citat) {
    const index = Math.floor(Math.random() * questions.length);
    citat.textContent = questions[index];
  }
}
