# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] – 2025-07-02
### Fixed
- Upgraded `pbkdf2` to version 3.1.3 to address critical security vulnerabilities (CVE references pending).
- Ensured bundling includes the correct (patched) version of `pbkdf2` by adding it as a direct dependency.

## [1.0.2] – 2025-06-28
### Added
- Initial support for crypto operations in the browser using `crypto-browserify`.
