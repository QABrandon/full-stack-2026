# full-stack-2026 — project context

**Last updated:** June 12, 2026

## What this is

This Git repository is a **portfolio showcase**: static HTML/CSS/JS (and related
assets) under **`portfolio/`**, plus a root **`index.html`** (interactive
portfolio home), and root docs (`README.md`, `CLAUDE.md`, `LICENSE`, `.gitignore`,
`vercel.json` for deploy redirects).

Codecademy **FS12** week folders may live **on disk** under `FS12-Week-*`.
`.gitignore` lists **`/FS12-Week-*/`**, so **new** files there stay untracked by
default and are not casually bulk-added. **Exception:** some FS12 paths are
**already tracked** from earlier commits (for example the Week 7 Session 03
individual todo app under
`FS12-Week-7/Session-03/todo-app-v2-individual-version/project-start/`). Owners
may push updates to those tracked paths when they choose; staging can require
**`git add -f`** on specific files because of the ignore rule.

Cohort sync scripts and other local-only tooling live under paths like `scripts/`
and remain **out of Git** unless policy changes.

## Local project layout (two folders)

| Location | Use for |
| --- | --- |
| `~/Desktop/BM Work/Full-Stack Bootcamp 2026/` | **This Git repo** — portfolio site (`index.html`, `portfolio/`), cohort week files (`FS12-Week-*` where tracked), and on-site demos (`portfolio/*/dist/`, static HTML projects) |
| `~/Desktop/BM Work/My Projects/FS Bootcamp/` | **Everything else** — separate class submission repos, API-only projects, and any future bootcamp work that does not belong inside `full-stack-2026` |

**Policy:** All **future** FS12 projects that are not a fit for `Full-Stack Bootcamp 2026` live under **`FS Bootcamp/`** (each in its own folder, usually its own Git repo). Link to them from the portfolio via `projects-data.js` (on-site path or external GitHub URL). Copy or rsync **build output only** into `portfolio/` when the site needs a live demo.

Current folders under `FS Bootcamp/`:

| Folder | Project |
| --- | --- |
| `personal-library/` | Major 03 — Personal Library (`personal-library-app/`) |
| `blog-post-api/` | Minor 05 — Blog Post API (Week 11 Express) |
| `react-todo/` | Minor 04 — React todo submission (`todo-react-app/`) |
| `music-library/` | Major 04 — Music Explorer (planned) |

When adding a new external project, create `~/Desktop/BM Work/My Projects/FS Bootcamp/<repo-name>/`, push to GitHub, then add a portfolio card if it should appear on the site.

## Repo layout (tracked on GitHub)

- **`index.html`** — site home (interactive portfolio). The **Coding projects**
  section shows the three newest entries from the shared project list.
- **`portfolio/projects.html`** — full project index (all minor and major work).
  Linked from the hero **View projects** button and the nav **Projects** link.
- **`portfolio/js/projects-data.js`** — single source of truth for project cards.
  **`portfolio/js/render-projects.js`** renders cards on the home page and projects
  page. When adding finished work, append one object here (higher `order` = newer);
  do not duplicate cards in HTML.
- **`portfolio/`** — one subdirectory per finished project, named by project
  type and sequence (e.g. `portfolio/minor-01-personal-bio/`,
  `portfolio/major-02-recipe-finder/`), plus shared assets under
  `portfolio/src/...`. Add new finished work here.
- **`README.md`** — short repo description for visitors.
- **`CLAUDE.md`** — this file; context for assistants.
- **`LICENSE`**, **`.gitignore`**, **`vercel.json`** — standard root files (redirects
  `/index.html` and `/portfolio/interactive-portfolio.html` → `/` on Vercel).
- **`FS12-Week-*`** (partial) — cohort coursework **only where already tracked**;
  not the default place for new portfolio work. Example: individual **Todo List
  App v2** (`index.html`, `styles.css`, `script.js`) uses BM Web Studio–style
  **PHASE 1 token names** in CSS (`--color--*`, `--space--*`, typography, radius,
  shadows) plus **DM Sans** for type.

## Conventions for assistants

1. **Teaching** — Clear, beginner-friendly explanations. Match the simplicity of
   hand-authored HTML unless the user asks for frameworks.
2. **Scope** — Change only what the user named under **`portfolio/`**, the listed
   root files, or **explicit paths** (including tracked `FS12-Week-*` coursework).
   Do not widen scope into unrelated week folders or cohort-only materials.
3. **Git** — Remote: [github.com/QABrandon/full-stack-2026](https://github.com/QABrandon/full-stack-2026).
   Do not re-add **`scripts/`** or other local-only tooling paths unless the user explicitly
   changes that policy. Treat **`FS12-Week-*`** as ignore-shielded: do not mass-stage
   untracked cohort trees; for **tracked** FS12 files the owner requests, stage
   **only those paths** (use **`git add -f`** when Git refuses ignored paths).
4. **Hub navigation** — The site home page is **`index.html`** at the repo root
   (interactive portfolio; served at **`/`** when published; use `href="/"` so
   the address bar stays on the domain root, not `/index.html`). Any HTML under
   **`portfolio/`** should include at least one clear link back to that home.
   Apply this when adding new pages and when editing existing pages that do not
   yet link home.
5. **Attribution** — Do not add editor or AI tool branding lines (e.g. “Made with …”)
   to source unless the owner asks.
6. **New portfolio projects** — Add the project folder under `portfolio/`, add a
   preview PNG under `portfolio/src/images/project-previews/`, then append one
   entry to **`portfolio/js/projects-data.js`** with the next highest `order`.
   Set `type` to `"major"` or `"minor"`. Use `excludeFromFeatured: true` only
   for entries that should never appear in the home featured row (e.g. Major 01,
   the site home). Paths in `path` are relative to `portfolio/` except absolute
   site links (`"/"`). No manual edits to project card HTML on `index.html` or
   `projects.html` unless the layout itself changes.
7. **Projects outside this repo** — Do not create new class submission apps at
   the root of `Full-Stack Bootcamp 2026` unless they are portfolio demos under
   `portfolio/`. Put new standalone repos in
   `~/Desktop/BM Work/My Projects/FS Bootcamp/<project-name>/`. Document paths in
   project READMEs and week summary docs using that base. Sync builds into
   `portfolio/` only when the published site needs a local demo.

## When in doubt

Ask whether the user wants **hints**, a **full solution**, or **review** of a
`portfolio/` file—or of a **named** coursework file under `FS12-Week-*`.
