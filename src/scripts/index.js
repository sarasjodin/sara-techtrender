/**
 * @file index.js
 * @description Handles UI interactions including navigation menu toggling...
 * @author Sara Sjödin Scolari
 */

import { setupSearch } from './search';

setupSearch();


document.addEventListener('DOMContentLoaded', () => {
  console.log('index.js loaded');

  const buttons = document.querySelectorAll('.tab-nav button');
  const views = document.querySelectorAll('.view');

  const btnGitHub = document.getElementById('btn-github');
  const btnHacker = document.getElementById('btn-hacker');

  const headingGitHub = document.getElementById('github-heading');
  const headingHacker = document.getElementById('hacker-heading');

  const dataGitHub = document.getElementById('github-data');
  const dataHacker = document.getElementById('hacker-data');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      console.log('Klickade på knapp');

      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      // Dölj alla vyer
      views.forEach((view) => {
        view.classList.add('hidden');
      });

      // Visa den valda vyn
      const targetView = document.getElementById(targetId);
      if (targetView) {
        targetView.classList.remove('hidden');
      }

      // Uppdatera aktiv knapp
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  function showView(view) {
    if (view === 'github') {
      btnGitHub.classList.add('active');
      btnGitHub.setAttribute('aria-pressed', 'true');
      btnHacker.classList.remove('active');
      btnHacker.setAttribute('aria-pressed', 'false');

      headingGitHub.classList.remove('hidden');
      headingGitHub.setAttribute('aria-hidden', 'false');
      headingHacker.classList.add('hidden');
      headingHacker.setAttribute('aria-hidden', 'true');

      dataGitHub.classList.remove('hidden');
      dataGitHub.setAttribute('aria-hidden', 'false');
      dataHacker.classList.add('hidden');
      dataHacker.setAttribute('aria-hidden', 'true');
    } else if (view === 'hacker') {
      btnGitHub.classList.remove('active');
      btnGitHub.setAttribute('aria-pressed', 'false');
      btnHacker.classList.add('active');
      btnHacker.setAttribute('aria-pressed', 'true');

      headingGitHub.classList.add('hidden');
      headingGitHub.setAttribute('aria-hidden', 'true');
      headingHacker.classList.remove('hidden');
      headingHacker.setAttribute('aria-hidden', 'false');

      dataGitHub.classList.add('hidden');
      dataGitHub.setAttribute('aria-hidden', 'true');
      dataHacker.classList.remove('hidden');
      dataHacker.setAttribute('aria-hidden', 'false');
    }
  }

  btnGitHub.addEventListener('click', () => showView('github'));
  btnHacker.addEventListener('click', () => showView('hacker'));
});
