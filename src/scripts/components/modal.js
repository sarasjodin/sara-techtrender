/**
 * @file modal.js
 * @description Controls display of a simple modal window
 */

let lastFocusedElement;

/**
 * @function showModal
 * @description Displays a modal with the content fetched from Wikipedia.
 * This function creates the modal's HTML structure and inserts it into the DOM (just before </body>).
 *
 * @param {string} title - The title to display in the modal
 * @param {string} text - The text (summary) to display in the modal
 * @param {string|null} imageUrl - An optional image URL to display in the modal.
 * @returns {void}
 */
export function showModal(title, text, imageUrl) {
  const modal = document.getElementById('wiki-modal');

  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-labelledby="modal-title">
      <button class="modal-close" aria-label="Close modal">×</button>
      <h2 id="modal-title">${title}</h2>
      ${
        imageUrl
          ? `<img src="${imageUrl}" alt="${title}" class="modal-image" />`
          : ''
      }
      <p>${text}</p>
    </div>
  `;

  // Make the modal visible
  modal.classList.add('visible');
  const closeButton = modal.querySelector('.modal-close');

  if (closeButton instanceof HTMLElement) {
    // Set focus on the close button
    closeButton.focus();

    // Close modal when clicking the close button
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside modal-content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close modal with the Escape key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('visible')) {
        closeModal();
      }
    });
  }
}

/**
 * @function openModal
 * @description Opens the modal and handles focus. It should also prevents interaction and scrolling with the background...
 * at least there are no accessability error messages in the console.
 *
 * @param {string} title - The title to be displayed in the modal
 * @param {string} text - The text (summary) to be displayed in the modal
 * @param {string|null} imageUrl - An optional image URL to display in the modal
 * @returns {void}

 * @function openModal
 */
export function openModal(title, text, imageUrl) {
  const modal = document.getElementById('wiki-modal');
  const closeButton = modal.querySelector('.modal-close');

  // Save the element that was focused before the modal opened
  lastFocusedElement = document.activeElement;

  if (closeButton instanceof HTMLElement) {
    // Display the modal
    showModal(title, text, imageUrl);

    // Make modal visible and update accessibility attributes
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false'); // Make the modal accessible for screen readers

    // Block scrolling on the background
    document.body.style.overflow = 'hidden'; // Should prevent scrolling on the background...

    // Apply 'inert' to the background to prevent interaction
    const background = document.querySelector('.background-element'); // Target the background element
    background.setAttribute('inert', ''); // // Block background interaction

    // Set focus on the close button once modal is visible
    closeButton.focus();

    // Listen for the Escape key to close the modal
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('visible')) {
        closeModal();
      }
    });
  }
}

/**
 * @function closeModal
 * @description Closes the modal and should restores background's scroll and interactivity.
 *
 * @returns {void}
 */
function closeModal() {
  const modal = document.getElementById('wiki-modal');
  const closeButton = modal.querySelector('.modal-close');

  if (closeButton instanceof HTMLElement) {
    // Stäng modalen
    modal.classList.remove('visible');

    // Restore background scrolling and remove inert attribute
    document.body.style.overflow = 'auto'; // Allow scrolling on the background
    const background = document.querySelector('.background-element');
    background.removeAttribute('inert'); // Re-enable interaction with the background

    // Restore focus to the element that was focused before the modal opened
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    } else if (closeButton) {
      closeButton.focus(); // If lastFocusedElement is not available, focus on the close button
    }

    // Hide modal from screen readers
    modal.setAttribute('aria-hidden', 'true'); // Make the modal inaccessible for screen readers
  }
}
