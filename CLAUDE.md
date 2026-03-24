# Full-Stack Bootcamp 2026 — project context

**Last updated:** March 23, 2026

## What this is

Personal and cohort workspace for a **full-stack bootcamp** (FS12). It holds week-by-week session materials, guided practice, and static HTML exercises—not a single deployable app.

## Repo layout

- **`FS12-Week-<n>/`** — one folder per week (e.g. `FS12-Week-1`).
- **`Session-<n>/`** — per-session folders. Many sessions include **`resources.md`** (Codecademy / MDN links, validator).
- **`guided-practice/`** — TODO-driven HTML files (learners fill in sections).
- **`Practice/`** — session practice briefs (e.g. survey page).
- **`*-complete.html`** — reference or solution HTML next to a starter file; treat as the instructor answer key unless the user asks to change them.
- **`Session-1/VSCode-setup.md`** — required VS Code extensions and settings for the course.

## FS12-Week-1 (what we know so far)

Week 1 is **HTML fundamentals** in three sessions.

### Session 1

- **Setup:** `VSCode-setup.md` — extensions **Live Preview**, **W3C Web Validator**, **Prettier**; autosave, format on save, default formatter Prettier, validator on save (notifications off), Live Preview opening in **external browser**.
- **Exercises / demos:** `first-page.html`, `image.html`, `emmet.html`, `why-validation.html`; `helloworld.txt`; assets like `intro.svg`.
- **Guided practice:** `guided-practice/tutorial-page.html` (starter with TODO comments) and `tutorial-page-complete.html`.

### Session 2

- **Topics (from filenames):** headings and paragraphs, semantic tags, lists, tables (including styled), block vs inline, `<pre>`, navigation links, a simple form under `forms/simple-form.html`.
- **Practice:** `Practice/quickbite-survey.html` with `quickbite-survey-complete.html`.

### Session 3 — Personal Bio project

- **Starter:** `personal-bio.html` — scaffold with TODOs for header/nav, `<main>`, About / Skills / Contact sections, form fields, footer.
- **Assessment:** `personal-bio-rubric.md` — HTML5 shell, header + nav, meta/title, photo + alt text, three main sections (about, skills, contact), contact form (name, email, message), external links, in-page nav, heading hierarchy, labeled form fields, footer; bonus items include more semantic HTML, extra form fields, accessibility, extra sections.
- **Submission (from rubric):** Project-Showcase channel on Discord; zip or GitHub link; screenshot optional.

### Shared references (Week 1)

- **`Session-1/resources.md`** and **`Session-2/resources.md`** point learners to **Codecademy Learn HTML**, **Codecademy HTML docs**, **MDN HTML**, **W3C Nu HTML checker**, and **placehold.co** for placeholders.

Session 3 does not include a separate `resources.md` in this tree; reuse Session 1–2 links as needed.

## Conventions for assistants

1. **Teaching context** — Clear, beginner-friendly explanations. Match the **simplicity** of existing hand-authored HTML (no frameworks unless the user asks).
2. **Scope** — Change only files or tasks the user named. Do not rename weeks/sessions or refactor the tree without a direct request.
3. **Solutions** — Do not overwrite `*-complete.html` or rubrics to “improve” them without explicit permission.
4. **Git** — This workspace is not assumed to be a git repository unless the user says otherwise.

## When in doubt

Ask whether the user wants **hints**, a **full solution**, or **review of their file**—bootcamp work often depends on that distinction.
