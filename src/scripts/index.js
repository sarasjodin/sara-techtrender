/**
 * @file index.js
 * @description Handles UI interactions including navigation menu toggling...
 * @author Sara Sjödin Scolari
 */

import { setupSearch } from './search.js';
import { showDataSource } from './ui.js';

// Views & nav buttons
const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('.tab-nav button');

// Data source radio inputs
const radioInputs = document.querySelectorAll('input[name="source"]');
const labels = document.querySelectorAll('.button-api');

const dataGitHub = document.getElementById('githubdata');
const headingGitHub = document.getElementById('githubheading');
const dataHacker = document.getElementById('hackernewsdata');
const headingHacker = document.getElementById('hackerheading');
const checkedInput = document.querySelector('input[name="source"]:checked');
const source =
  checkedInput instanceof HTMLInputElement ? checkedInput.value : null;

document.addEventListener('DOMContentLoaded', () => {
  setupSearch();

  function showView(targetId) {
    views.forEach((view) => {
      view.classList.toggle('hidden', view.id !== targetId);
    });

    navButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-target') === targetId;
      btn.classList.toggle('active', isActive);
    });
  }

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) showView(targetId);
    });
  });

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-target');
      if (view) {
        showView(view);
        updateView(view);
        console.log(view);
      }
    });
  });

  const checkedInput = document.querySelector('input[name="source"]:checked');
  /* if (checkedInput instanceof HTMLInputElement) {
    showDataSource(checkedInput.value);
  }
 */
  radioInputs.forEach((inputEl) => {
    if (inputEl instanceof HTMLInputElement) {
      inputEl.addEventListener('change', () => {
        if (inputEl.checked) {
          showDataSource(inputEl.value);
        }
      });
    }
  });

  // Citatslumpare
  const questions = [
    'What’s hot on GitHub right now?',
    'Explore tech trends around the world?',
    'Curious about what devs love?',
    'Where is TypeScript trending now?',
    'Discover today’s hottest languages?',
    'Find out where Rust is booming?',
    'Is Python still on top this week?',
    'Search and see what’s rising?',
    'Want to explore more dev trends?',
    'Find global dev buzz in seconds!',
    'Which tech rules the world today?',
    'What’s popular in open source?',
    'Which tech article is trending now?'
  ];

  const citat = document.querySelector('.citat');
  if (citat) {
    const index = Math.floor(Math.random() * questions.length);
    citat.textContent = questions[index];
  }
});

function updateView(view) {
  const startImg = document.querySelector('.startpage');
  const aboutImg = document.querySelector('.aboutpage');

  if (!startImg || !aboutImg) return;

  startImg.classList.remove('show');
  aboutImg.classList.remove('show');

  if (view === 'index-view') {
    aboutImg.classList.add('show');
  } else if (view === 'about-view') {
    startImg.classList.add('show');
  }
}
