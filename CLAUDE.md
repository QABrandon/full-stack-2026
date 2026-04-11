# full-stack-2026 — project context

**Last updated:** April 7, 2026

## What this is

This Git repository is a **portfolio showcase**: static HTML/CSS/JS (and related
assets) under **`portfolio/`**, plus a root **`index.html`** (interactive
portfolio home), and root docs (`README.md`, `CLAUDE.md`, `LICENSE`, `.gitignore`,
`vercel.json` for deploy redirects).

Codecademy FS12 week materials, cohort sync scripts, and Cursor skills may still
exist **on disk** next to this clone, but they are **gitignored** and are **not**
pushed to `origin`.

## Repo layout (tracked on GitHub)

- **`index.html`** — site home (interactive portfolio).
- **`portfolio/`** — one subdirectory or file group per project (e.g.
  `portfolio/personal-bio.html`, `portfolio/src/...`). Add new work here.
- **`README.md`** — short repo description for visitors.
- **`CLAUDE.md`** — this file; context for assistants.
- **`LICENSE`**, **`.gitignore`**, **`vercel.json`** — standard root files (redirects
  `/index.html` and `/portfolio/interactive-portfolio.html` → `/` on Vercel).

## Conventions for assistants

1. **Teaching** — Clear, beginner-friendly explanations. Match the simplicity of
   hand-authored HTML unless the user asks for frameworks.
2. **Scope** — Change only what the user named under `portfolio/` or the listed
   root files.
3. **Git** — Remote: [github.com/QABrandon/full-stack-2026](https://github.com/QABrandon/full-stack-2026).
   Do not re-add `FS12-Week-*/`, `scripts/`, or `.cursor/` to Git unless the
   user explicitly changes that policy.
4. **Hub navigation** — The site home page is **`index.html`** at the repo root
   (interactive portfolio; served at **`/`** when published; use `href="/"` so
   the address bar stays on the domain root, not `/index.html`). Any HTML under
   **`portfolio/`** should include at least one clear link back to that home.
   Apply this when adding new pages and when editing existing pages that do not
   yet link home.

## When in doubt

Ask whether the user wants **hints**, a **full solution**, or **review** of a
`portfolio/` file.
