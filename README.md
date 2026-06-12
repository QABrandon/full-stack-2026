# full-stack-2026

Public portfolio for Codecademy FS12 bootcamp and personal projects. The **site
home page** is **`index.html`** at the repo root: an interactive responsive
portfolio (featured projects, skills, about, contact). Finished work lives
under **`portfolio/`**, organized by type and sequence.

**Project index:** [portfolio/projects.html](portfolio/projects.html) lists every
build. The home page shows the three newest. Card data is maintained in
`portfolio/js/projects-data.js`.

**Local project folders** (see `CLAUDE.md`):

- **`Full-Stack Bootcamp 2026/`** (this repo) — portfolio site and on-site project demos
- **`My Projects/FS Bootcamp/`** — all other bootcamp submission repos and future projects that do not live in this tree

## Major projects

| Project | Folder | Summary |
| --- | --- | --- |
| Major 03: Personal Library | [`portfolio/major-03-personal-library/`](portfolio/major-03-personal-library/) | React + Vite library app with Google Books search, Context API, custom hooks, localStorage, favorites, and filter/sort |
| Major 02: Recipe Finder | [`portfolio/major-02-recipe-finder/`](portfolio/major-02-recipe-finder/) | Vanilla JavaScript app using TheMealDB API, async/await, dynamic results, and saved favorites |
| Major 01: Interactive portfolio | [`index.html`](index.html) (site home) | Tailwind, responsive nav, skill bars, and light motion—this repo’s published home page |

## Minor projects

| Project | Folder | Summary |
| --- | --- | --- |
| Minor 05: Blog Post API | [github.com/QABrandon/blog-post-api](https://github.com/QABrandon/blog-post-api) | Express REST API for posts and users—MVC, validation, Newman/Postman tests (portfolio card links to repo; no on-site demo) |
| Minor 04: React todo list app | [`portfolio/minor-04-react-todo/`](portfolio/minor-04-react-todo/) | React + Vite todo app with components, useState, validation, filters, and localStorage |
| Minor 03: Todo list app | [`portfolio/minor-03-todo-list-app/`](portfolio/minor-03-todo-list-app/) | Vanilla JavaScript todo app with form validation, event delegation, and local storage |
| Minor 02: Styled landing page | [`portfolio/minor-02-styled-landing-page/`](portfolio/minor-02-styled-landing-page/) | Single-page layout with hero, sections, a form, and responsive breakpoints |
| Minor 01: Personal bio | [`portfolio/minor-01-personal-bio/`](portfolio/minor-01-personal-bio/) | Long-form bio with skills, lists, and a contact form—semantics and hierarchy |

## Navigation and deploy

Pages under `portfolio/` link back to the site home with `href="/"` so the
address bar stays on the domain root. `vercel.json` maps `/index.html` and
`/portfolio/interactive-portfolio.html` → `/`.

Remote: [github.com/QABrandon/full-stack-2026](https://github.com/QABrandon/full-stack-2026).
