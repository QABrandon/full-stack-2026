/**
 * Single source of truth for portfolio project cards.
 *
 * When adding a project:
 * 1. Add the finished work under portfolio/<type>-NN-slug>/ (or use a full
 *    https:// URL in `path` for repo-only projects with no on-site demo)
 * 2. Add a preview image under portfolio/src/images/project-previews/
 * 3. Append one object below with a higher `order` than existing entries.
 *
 * The site home shows the three newest entries (highest `order`, excluding
 * `excludeFromFeatured`). portfolio/projects.html lists every entry by type.
 */
window.PORTFOLIO_PROJECTS = [
  {
    order: 8,
    type: "minor",
    title: "Minor 05: Blog Post API",
    description:
      "Week 11 Express REST API for blog posts and users—MVC routes and controllers, validation, error middleware, and Newman-tested CRUD. Source and tests on GitHub (no frontend).",
    preview: "../project-thumb.svg",
    previewAlt: "Generic project preview placeholder",
    path: "https://github.com/QABrandon/blog-post-api",
    linkLabel: "View on GitHub",
  },
  {
    order: 7,
    type: "major",
    title: "Major 03: Personal Library",
    description:
      "A React + Vite library app with Google Books search, Context API, custom hooks, localStorage, favorites, filter/sort, and accessible UI patterns.",
    preview: "major-03-personal-library-preview.png",
    previewAlt:
      "Thumbnail representing the Personal Library app with search, library list, and reading status filters",
    path: "major-03-personal-library/dist/index.html",
  },
  {
    order: 6,
    type: "minor",
    title: "Minor 04: React todo list app",
    description:
      "A React + Vite todo app with components, useState, form validation, filters, and localStorage—the Week 7 app rebuilt with React patterns.",
    preview: "minor-04-react-todo-preview.png",
    previewAlt:
      "Thumbnail representing the React todo list app with filters and add form",
    path: "minor-04-react-todo/dist/index.html",
  },
  {
    order: 5,
    type: "major",
    title: "Major 02: Recipe Finder",
    description:
      "A vanilla JavaScript app using TheMealDB API, async/await, dynamic results, and saved favorites.",
    preview: "recipe-finder-preview.png",
    previewAlt:
      "Thumbnail representing the recipe finder app with API search and saved favorites",
    path: "major-02-recipe-finder/",
  },
  {
    order: 4,
    type: "major",
    title: "Major 01: Interactive portfolio",
    description:
      "Tailwind, responsive nav, skill bars, and light motion—the site home for this repo.",
    preview: "interactive-portfolio-preview.png",
    previewAlt:
      "Thumbnail representing this interactive responsive portfolio with Tailwind CSS and custom CSS",
    path: "/",
    linkLabel: "Open site home",
    excludeFromFeatured: true,
  },
  {
    order: 3,
    type: "minor",
    title: "Minor 03: Todo list app",
    description:
      "A vanilla JavaScript todo app with form validation, event delegation, dynamic rendering, and local storage.",
    preview: "minor-03-todo-list-app-preview.png",
    previewAlt:
      "Thumbnail representing the todo list app with form input and empty state",
    path: "minor-03-todo-list-app/index.html",
  },
  {
    order: 2,
    type: "minor",
    title: "Minor 02: Styled landing page",
    description:
      "A single-page layout with hero, sections, a form, and breakpoints—practice in structure and layout.",
    preview: "styled-landing-page-preview.png",
    previewAlt:
      "Thumbnail representing the styled landing page project with layout and CSS focus",
    path: "minor-02-styled-landing-page/",
  },
  {
    order: 1,
    type: "minor",
    title: "Minor 01: Personal bio",
    description:
      "Long-form bio with skills, lists, and a contact form—heavy on semantics and hierarchy.",
    preview: "personal-bio-preview.png",
    previewAlt:
      "Thumbnail representing the personal bio page with long-form content and structure",
    path: "minor-01-personal-bio/",
  },
];
