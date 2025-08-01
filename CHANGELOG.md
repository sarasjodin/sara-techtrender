# Changelog

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - date YYYY-MM-DD

- Placeholder for upcoming changes and planned features

---

## [2.2.1] – 2025-08-01

### Added

- README-file
- SECURITY-file
- LICENSE-file

### Changed

- Corrected some HTML and CSS after W3C validation

---

## [2.2.0] – 2025-08-01

### Added

**New functionality:**

- Integrated an additional API fetch to retrieve programming language data for GitHub repositories.

- The primary programming language of each repository now has an associated link that opens a modal displaying relevant data fetched from Wikipedia.

- Added additional font family Inter

**UI Enhancements:** Implemented UI animations based on task requests to enhance interactivity and visual appeal.

---

## [2.1.0] – 2025-08-01

### Added

- **JSDoc comments:** For better code documentation and readability.

- **Icons for cards:** Improved layout with focus on usability and accessibility.

- **Flowchart:** Explaining the setup: JavaScript Module Flow image created and updated and implemented on About page

### Changed

- **API Fetch Limits:** Increased the number of fetched GitHub repositories and Wikipedia articles to 20 each.
- **Search UX:** Search input field now clears automatically after each search, improving the user experience.
- **UI Enhancements:** Refined semantic HTML and improved responsive layout for article & repo cards.

---

## [2.0.0] – 2025-07-29

### Major Release – Complete Refactor and UI Overhaul

A full architectural and visual refactoring of the application, focused on maintainability, accessibility, and performance.
Added

- **Navigation Bar:** New responsive and accessible navigation added with support for small screens.

- **Footer:** Introduced footer component for both pages.

- **Modular Components:** New folder structure introduced (components/, controllers/, data/, api/) to improve separation of concerns.

- **JSdoc Comments:** All exported functions now include clean English JSDoc for improved developer understanding.

Changed

- **Code Refactoring:** Major rewrite of all logic using plain JavaScript modules with improved readability and reusability.

- **Word Cloud:** Improved word cloud visual based on text data.

- **Search Controller:** Extracted logic into smaller helper functions (getSearchQuery, getSelectedSource, updateUIAfterSearch, etc.).

- **SCSS:** Migrated to SCSS with component-based structure and variables.

- **UI/UX Enhancements:** Improved mobile responsiveness and layout using semantic HTML, ARIA attributes, and consistent design tokens.

- **Automation:** Improved build process using Parcel v2, with support for SCSS, image optimization, and HTML minification.

Notes

- No frontend frameworks were used (e.g. React/Vue) – this app is built with vanilla JS, SCSS, and modern tooling only.

---

## [1.0.3] – 2025-07-02

### Fixed

- Upgraded `pbkdf2` to version 3.1.3 to address critical security vulnerabilities (CVE references pending).
- Ensured bundling includes the correct (patched) version of `pbkdf2` by adding it as a direct dependency.

---

## [1.0.2] – 2025-06-28

### Added

- Initial support for crypto operations in the browser using `crypto-browserify`.

---

## Legend

- **Added**: new features or components
- **Changed**: updates to existing behavior
- **Deprecated**: soon-to-be removed features
- **Removed**: deprecated features now gone
- **Fixed**: bug fixes
- **Security**: security-related fixes or enhancements
- **Notes**: related comments, limitations, or clarifications
