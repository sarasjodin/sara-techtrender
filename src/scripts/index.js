/**
 * @file index.js
 * @description Handles UI interactions including navigation menu toggling,
 * dropdown handling, theme switching, and revealing phone number on click.
 * Includes accessibility and localStorage features.
 * @author Sara Sjödin Scolari
 */

/**
 * Initializes navigation menu, dropdowns, theme toggle, and phone number reveal logic
 * after the DOM content is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.nav .menu'); // Main  menu
  const dropdowns = document.querySelectorAll('.dropdown');

  /**
   * Toggles hamburger menu and updates `aria-expanded` for accessibility.
   * @param {MouseEvent} e - The click event
   */
  menuToggle.addEventListener('click', (e) => {
    const isOpen = nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    e.stopPropagation();
  });

  /**
   * Closes hamburger menu if clicking outside.
   * @param {MouseEvent} e - The click event
   */
  document.addEventListener('click', (e) => {
    const target = /** @type {Element} */ (e.target);

    if (!nav.contains(target) && !menuToggle.contains(target)) {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /**
   * Dropdown toggle and outside click handling
   */
  dropdowns.forEach((dropdown) => {
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    /**
     * Toggles the visibility of the dropdown menu on click.
     * @param {MouseEvent} e
     */
    dropdown.addEventListener('click', (e) => {
      dropdownMenu.classList.toggle('show');
    });

    /**
     * Closes hamburger menu if clicking outside.
     * @param {MouseEvent} e - The click event
     */
    document.addEventListener('click', (e) => {
      const target = /** @type {Element} */ (e.target);

      if (!dropdown.contains(target)) {
        dropdownMenu.classList.remove('show');
      }
    });
  });
});

/**
 * Toggles between light and dark mode themes.
 * Stores the selected theme in localStorage and updates button text.
 */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.offsetHeight; // Forces reflow for smoother transition

  // Update toggle button text
  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️ Light Mode';
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
  }

  // Save current theme to localStorage
  localStorage.setItem(
    'theme',
    body.classList.contains('dark-mode') ? 'dark' : 'light'
  );
});

/**
 * On page load, checks localStorage for saved theme preference and applies it.
 */
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️ Light Mode';
}

/**
 * Reveals the phone number and updates link href when clicked.
 */
document.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLAnchorElement} */
  const phoneLink = /** @type {HTMLAnchorElement} */ (
    document.getElementById('phone-link')
  );

  phoneLink.addEventListener('click', (e) => {
    e.preventDefault(); // Stop the default "#" jump
    phoneLink.textContent = '📞 +39 345 4171 570';
    phoneLink.setAttribute('href', 'tel:+393454171570');
  });
});
