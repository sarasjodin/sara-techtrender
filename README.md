# Sara's TechTrends - a Mashup site

<a href="https://sara-tech-trends.netlify.app/" target="_blank" rel="noopener noreferrer">
Open Live Demo
</a> <br><br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/92774c8f-38c0-4fc1-8780-93acb622b191/deploy-status)](https://app.netlify.com/projects/sara-tech-trends/deploys)

---

<img width="auto" height="auto" alt="Image of the site's index page" src="https://github.com/user-attachments/assets/75a55f4f-50aa-4d4f-90bf-43f5290b32ab" />

---

## Features

- ✅ API Integration: Integrated multiple APIs to fetch real-time data for programming languages and GitHub repositories.

- ✅ Modal Popups: Added modal popups to display additional information (e.g., programming languages and Wikipedia summaries).

- ✅ Responsive Design: The app is fully responsive, offering seamless use on both desktop and mobile devices.

- 🔍 Focus on Performance: Optimized load times by minimizing unnecessary API calls and implementing lazy loading where applicable.

- 🔍 Accessibility: Implemented ARIA attributes and ensured that the application is usable for screen reader users and keyboard navigation.

- 🔍 Modularity: The code is organized into modules for better maintainability and scalability.

---

## Tech Stack

- HTML: For structure and content.
- CSS / SCSS: For styling with responsive design using Flexbox and Grid.
- JavaScript: Main scripting language used to fetch API data and manipulate the DOM.
- Parcel: Used as the build tool to bundle assets and automate deployment.
- Netlify: For automated deployment of the web application.

---

## Installation

1. Clone the repository: ```git clone https://github.com/yourusername/techtrends.git```

2. Navigate to the project directory: ```cd techtrends```

3. Install dependencies: ```npm install```

4. Run the development server: ```npm run dev```

---

## About This Project

TechTrends is a mashup web app that reveals what’s trending in the tech world and where, based on real-time GitHub activity and Hacker News discussions. It helps tech enthusiasts discover interesting topics, emerging technologies, relevant news, and recently created code. By combining data from two major developer platforms, TechTrends aims to inspire exploration of what’s hot, where it’s happening, and why it matters.

This mashup uses the following APIs

- GitHub REST API
- Hacker News API
- MediaWiki Action API Wikipedia

GitHub is the world’s largest platform for developers to host, review, and collaborate on code. It provides access to millions of repositories and open source projects. Using the GitHub REST API, we can fetch real-time data such as trending repositories, author details, programming languages, and star counts.

Hacker News is a social news platform focused on technology, startups, and programming. It is run by Y Combinator and allows users to post, upvote, and comment on tech-related articles. With the Hacker News Firebase API, we can retrieve posts, comments, timestamps, and article metadata in real time.

Wikipedia is a free, collaborative online encyclopedia with content created and maintained by volunteers. It contains structured and unstructured information across nearly every topic. I used the MediaWiki Action API to query terms used in GitHub's repo data to get a new search result in a popup/modal (see the rainbow-colored language button in almost any GitHub repo card).


---

## Folder Structure

<img width="430" height="1045" alt="Part of the folder structure, with focus on the js script files" src="https://github.com/user-attachments/assets/7061b168-524f-4e07-a9f2-71bfa7896a18" />


---

## Security

- ✅ Dependabot active
- ✅ Security policy configured
- ✅ Automatic CodeQL analysis

---

## License

MIT – see LICENSE.md for details.

---
