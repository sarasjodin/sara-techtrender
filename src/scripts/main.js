/**
 * @file main.js
 * @description
 * This is the main entry point for initializing the TechTrends web application.
 * It conditionally sets up event listeners and page-specific features based on the current HTML page context.
 *
 * - Runs shared setup (footer year, random quote) on all pages.
 * - Initializes search UI and logic only on the index page.
 * - Triggers spinner placeholder for word cloud canvas if present.
 * - Initializes toggle button interactions for switching data views.
 *
 * The app uses dataset.page to determine the current page (index,about).
 * Quote generation and year update are safe to run globally, as they rely on conditional rendering.
 *
 * This file avoids using frontend frameworks and relies purely on vanilla JS.
 *
 * @author Sara Sjödin Scolari
 */

import { generateQuote } from './components/quotes.js';
import { setCurrentYear } from './controllers/footer-controller.js';
import { initSearchUI, setupSearch } from './controllers/search-controller.js';
import { showSpinnerSource } from './controllers/spinner-controller.js';
import { resetUIOnLoad } from './controllers/ui-controller.js';

// Global setup – safe to run regardless of page context
// No need for being placed inside "DOMContentLoaded"
setCurrentYear(); // Adds the current year to the copyright section footer
generateQuote(); // Only works if the class citat exists in HTML (that is, it will only execute on index page)

// Page-specific logic after DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body.dataset.page;

  if (page === 'index') {
    initSearchUI(); // Sets responsive placeholder based on screen size
    resetUIOnLoad(); // Makes sure the right elements are hidden/shown before search
    setupSearch(); // All the combined search logic
  }

  // Show spinner placeholder in canvas if wordcloud exists
  if (document.querySelector('.wordcloud-canvas')) {
    showSpinnerSource('wordcloud');
  }
});
