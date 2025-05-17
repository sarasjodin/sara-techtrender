/**
 * @file shared_datafetcher.js
 * @description Fetches data from a remote server. If the remote fetch fails, a local JSON file is used as a fallback.
 * The JSON data contains a list of objects with information about university courses and programs.
 * @author Sara Sjödin Scolari
 */

/**
 * Import of local JSON data used as a fallback if remote fetching fails.
 * @constant {Array<Object>} jsonData - Array containing course and program statistics.
 */
import jsonData from './statistik_sokande_ht24.json';

/**
 * @typedef {Object} EducationStat
 * @property {string} type - The type of education, e.g. 'Kurs' (Course) or 'Program'.
 * @property {string} name - The name of the course or program.
 * @property {string} applicantsFirstHand - Number of first-hand applicants.
 * @property {string} applicantsTotal - Total number of applicants.
 */

/**
 * Fetches data from an external URL. If the request fails, local JSON data (statically imported via the bundler) is used instead.
 *
 * @async
 * @function fetchData
 * @returns {Promise<EducationStat[]>} A promise that resolves with the fetched JSON data.
 * @throws {Error} Only if the remote URL fetch fails.
 */
export async function fetchData() {
  try {
    // Trying remote fetch first
    const remote = await fetch('https://studenter.miun.se/~mallar/dt211g/');
    if (!remote.ok) throw new Error('Remote fetch failed');
    const data = await remote.json();
    console.log('Fetched from remote');
    return data;
  } catch (err) {
    console.warn(
      'Remote fetch failed, using local JSON file as fallback:',
      err
    );

    // Returns imported local data
    return jsonData;
  }
}
