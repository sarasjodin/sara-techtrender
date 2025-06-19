/**
 * @file index.js
 * @description Handles UI interactions including navigation menu toggling...
 * @author Sara Sjödin Scolari
 */

import { setupSearch } from './search.js';

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

  function showDataSource(view) {
    const isGitHub = view === 'github';

    dataGitHub.classList.toggle('hidden', !isGitHub);
    headingGitHub.classList.toggle('hidden', !isGitHub);
    dataHacker.classList.toggle('hidden', isGitHub);
    headingHacker.classList.toggle('hidden', isGitHub);

    dataGitHub.setAttribute('aria-hidden', String(!isGitHub));
    headingGitHub.setAttribute('aria-hidden', String(!isGitHub));
    dataHacker.setAttribute('aria-hidden', String(isGitHub));
    headingHacker.setAttribute('aria-hidden', String(isGitHub));

    labels.forEach((label) => {
      const input = label.querySelector('input[type="radio"]');
      if (input instanceof HTMLInputElement) {
        const isActive = input.value === view;
        input.checked = isActive;
        /* console.log(input.value, isActive); */
        label.classList.toggle('active', isActive);
      }
    });
  }

  const checkedInput = document.querySelector('input[name="source"]:checked');
  if (checkedInput instanceof HTMLInputElement) {
    showDataSource(checkedInput.value);
  }

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
    'Explore repos from every region?',
    'What’s trending this very moment?',
    'Find out where Rust is booming?',
    'Is Python still on top this week?',
    'Search and see what’s rising?',
    'Want to explore dev trends now?',
    'Find global dev buzz in seconds?',
    'Which tech rules the world today?',
    'What’s popular in open source?'
  ];

  const citat = document.querySelector('.citat');
  if (citat) {
    const index = Math.floor(Math.random() * questions.length);
    citat.textContent = questions[index];
  }
});
