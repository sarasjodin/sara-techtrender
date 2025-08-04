/**
 * Removes all HTML tags from a string and truncates it to a maximum number of characters.
 *
 * @function truncateHtmlText
 * @param {string} htmlString - The input string that may contain HTML.
 * @param {number} maxChars - The maximum number of characters to return
 * @returns {string} The cleaned and truncated text with ellipsis (...) if truncated.
 */
export function truncateHtmlText(htmlString, maxChars) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;

  const text = div.textContent || div.innerText || '';

  return text.length > maxChars ? text.slice(0, maxChars).trim() + '…' : text;
}

/**
 * Formats an ISO 8601 date string to "YYYY/MM/DD HH:mm".
 *
 * @function formatDate
 * @param {string} isoDateStr An ISO date string (for example "2025-07-25T10:30:00Z").
 * @returns {string} - The formatted date string "YYYY/MM/DD HH:mm".
 */
export function formatDate(isoDateStr) {
  const date = new Date(isoDateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}/${month}/${day} ${hour}:${minute}`;
}

/**
 * Scales canvas to device resolution for better clarity on retina/high-res screens
 * @function scaleCanvasToDevice
 * @param {HTMLCanvasElement} canvas - The canvas to scale
 * @returns {void}
 */
export function scaleCanvasToDevice(canvas) {
  const ratio = window.devicePixelRatio || 2;

  const cssWidth = canvas.offsetWidth;
  const cssHeight = canvas.offsetHeight;

  canvas.width = cssWidth * ratio;
  canvas.height = cssHeight * ratio;

  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
}

/**
 * Cleans up and returns the search query from an input element.
 * Removes special characters and trims whitespace.
 * @function getSearchQuery
 * @param {HTMLInputElement} input - The input element containing the raw query.
 * @returns {string} The cleaned and lowercase query.
 */
export function getSearchQuery(input) {
  return input.value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '');
}
