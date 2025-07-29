/**
 * @file ui/footer-controller.js
 * @description
 * Updates the footer's copyright section text with the current year.
 *
 * @author Sara Sjödin Scolari
 * @function
 * @returns {void}
 */

export function setCurrentYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = `${new Date().getFullYear()}`;
    console.log('yearSpan added to footer');
  }
}
