# full-stack-2026 — project context

**Last updated:** May 19, 2026

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

## Repo layout (tracked on GitHub)

- **`index.html`** — site home (interactive portfolio).
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

## When in doubt

Ask whether the user wants **hints**, a **full solution**, or **review** of a
`portfolio/` file—or of a **named** coursework file under `FS12-Week-*`.
