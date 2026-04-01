---
name: fs12-cohort-sync
description: >-
  Syncs instructor materials from tyler-lemke/FS12-Bootcamp-Cohort into this
  workspace read-only (fetch/merge only; never push to cohort). Commits and
  pushes target QABrandon/full-stack-2026 only, staging personal paths outside
  cohort week folders unless explicitly syncing. Use when pulling cohort
  updates, resolving FS12-Week merge conflicts, scheduling automated pulls,
  or when the user mentions FS12-Bootcamp-Cohort, cohort sync, or instructor repo.
---

# FS12 cohort sync (read-only upstream)

## Repos (non-negotiable)

- **`origin`** — `https://github.com/QABrandon/full-stack-2026`  
  **May:** fetch, commit, push.

- **`cohort`** — `https://github.com/tyler-lemke/FS12-Bootcamp-Cohort`  
  **May:** fetch and merge only. **Never** `git push cohort`.

After adding `cohort`, disable pushes so a mistaken `git push cohort` fails:

```bash
git remote set-url --push cohort no_push
```

## One-time setup

From the repo root (`full-stack-2026`):

```bash
git remote add cohort https://github.com/tyler-lemke/FS12-Bootcamp-Cohort.git
git remote set-url --push cohort no_push
git fetch cohort
```

If the instructor default branch is not `main`, set the merge ref in
`scripts/fs12-cohort-sync/pull-cohort.sh` or use `COHORT_BRANCH=...` (see script).

## Pull workflow (manual or scripted)

Run:

```bash
./scripts/fs12-cohort-sync/pull-cohort.sh
```

Behavior:

1. `git fetch cohort`
2. Merge `cohort/<branch>` with **conflict strategy favoring cohort** (`-X theirs`)
   so instructor materials win when paths overlap.
3. The merge uses `--no-ff`, so a merge commit is created when there is new
   cohort history; if already up to date, nothing is committed.

## What to commit to `origin` (full-stack-2026)

- **Personal / non-cohort work** — e.g. `portfolio/`, your root `README.md`,
  `CLAUDE.md`, `.cursor/`, notes — stage and commit as usual.
- **Cohort mirror paths** — treat `FS12-Week-*/` as **incoming from `cohort`**.
  Do not rewrite instructor `*-complete.html` or rubrics without explicit user
  permission (see `CLAUDE.md`).
- For a **normal commit** (not “sync cohort”), prefer staging paths **outside**
  `FS12-Week-*/` unless the user names those paths.
- After a **cohort sync**, a message like `chore: sync FS12 materials from cohort`
  is appropriate.

## Automated schedule (your machine)

Cursor and this skill **do not** run on a clock. Use **cron** on macOS so pulls
run at Eastern wall time (`America/New_York` handles EST/EDT).

1. Put the **absolute path** to `guard-and-pull.sh` in the crontab line.
2. Run `crontab -e` and add:

```cron
0,30 * * * * TZ=America/New_York /bin/bash -lc '/Users/YOU/.../full-stack-2026/scripts/fs12-cohort-sync/guard-and-pull.sh'
```

The guard script only calls `pull-cohort.sh` when:

- **Thursday** from **2026-04-02**, **Tuesday** from **2026-04-07**, through
  **2026-07-16**, **18:00–22:00** Eastern, on **:00** and **:30**.
- **Saturday**, **2026-04-04** through **2026-07-18** inclusive, **13:00–17:00**
  Eastern, on **:00** and **:30**.

Change the dates inside `guard-and-pull.sh` if the cohort window changes.

**Logs (optional):** set `FS12_SYNC_LOG` to a file path, or append
`>> ~/Library/Logs/fs12-cohort-sync.log 2>&1` to the cron line.

**Push after sync (optional):** in the cron line set
`AUTO_PUSH_ORIGIN=1` before invoking the script if merges should be pushed to
`origin` automatically (requires credentials/non-interactive Git).

## Agent checklist

1. Never add a push URL for `cohort`; keep `--push cohort` as `no_push`.
2. Never suggest `git push cohort` or a PR **to** the instructor repo from this
   workflow.
3. After a cohort pull, prefer instructor content for **`FS12-Week-*`** paths;
   leave other conflicts for the user.
4. When committing for the user to **their** repo, default to **excluding**
   `FS12-Week-*` unless the task is explicitly a cohort sync or they name those
   paths.

## Scripts in this repo

- `scripts/fs12-cohort-sync/pull-cohort.sh` — fetch + merge from `cohort`.
- `scripts/fs12-cohort-sync/guard-and-pull.sh` — schedule gate; optional
  `AUTO_PUSH_ORIGIN=1` to push `origin` after a successful merge.
