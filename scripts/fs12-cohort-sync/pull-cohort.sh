#!/usr/bin/env bash
# Fetch and merge instructor repo (read-only push). Run from repo root or any path.
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${REPO_ROOT}" ]]; then
  echo "Error: not inside a git repository." >&2
  exit 1
fi
cd "$REPO_ROOT"

COHORT_REMOTE="${COHORT_REMOTE:-cohort}"
COHORT_BRANCH="${COHORT_BRANCH:-main}"

if ! git remote get-url "$COHORT_REMOTE" &>/dev/null; then
  echo "Missing git remote '${COHORT_REMOTE}'. Add it with:" >&2
  echo "  git remote add ${COHORT_REMOTE} https://github.com/tyler-lemke/FS12-Bootcamp-Cohort.git" >&2
  echo "  git remote set-url --push ${COHORT_REMOTE} no_push" >&2
  exit 1
fi

# Ensure we never push to instructor repo by accident
git remote set-url --push "$COHORT_REMOTE" no_push 2>/dev/null || true

if ! git ls-remote --heads "$COHORT_REMOTE" "$COHORT_BRANCH" | grep -q .; then
  echo "Branch '${COHORT_BRANCH}' not found on ${COHORT_REMOTE}. Try COHORT_BRANCH=master or check the instructor repo." >&2
  exit 1
fi

echo "Fetching ${COHORT_REMOTE}..."
git fetch "$COHORT_REMOTE" "$COHORT_BRANCH"

MERGE_MSG="chore: sync FS12 materials from ${COHORT_REMOTE}/${COHORT_BRANCH}"

# Favor instructor tree on conflicts (-X theirs: "theirs" is cohort during merge)
if git merge --no-ff "${COHORT_REMOTE}/${COHORT_BRANCH}" -m "$MERGE_MSG" -X theirs; then
  echo "Merge completed with no conflicts (or auto-resolved with -X theirs)."
else
  echo "Merge needs attention. Resolve conflicts; for FS12-Week-* paths prefer instructor version:" >&2
  echo "  git checkout --theirs -- FS12-Week-<n>/..." >&2
  exit 2
fi

echo "Done. Push to your repo when ready: git push origin main"
