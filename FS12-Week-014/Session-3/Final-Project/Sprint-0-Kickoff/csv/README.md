# Sprint Zero Trello CSV Generator

Generates `sprint-zero-trello.csv` from the chore markdown files in
`../sprint-0/chores/`. The output follows the same column layout as
`Example Import Spreadsheet.csv`, so it can be imported directly into a
Trello board.

## How to run

From this folder (`Sprint-0-Kickoff/csv/`):

```sh
npm run build
```

That runs `generate-trello-csv.js` and writes (or overwrites)
`sprint-zero-trello.csv` in this folder. There are no dependencies to install —
the script uses Node's built-in `fs` and `path` modules only.

You can also invoke the script directly:

```sh
node generate-trello-csv.js
```

## Importing into Trello

1. Open your Trello board.
2. Open the board menu and choose **Print, export, and share → Import from CSV**
   (Trello Premium / paid feature).
3. Upload `sprint-zero-trello.csv`.
4. Map the columns when prompted (Trello usually auto-detects them since the
   header matches `Example Import Spreadsheet.csv`).

## What the script does

- Reads every `chore-NN-*.md` file (skipping the `*-step-by-step.md` variants).
- For each chore it produces:
  - One **card row** with the card name, full markdown description, and the
    `sprint-0 (blue)` label.
  - One **checklist item row** per `- [ ]` bullet in the markdown, grouped by
    the `## Section` heading the bullet appears under (the `## Task` section is
    skipped for checklists since it's plain prose, not a list).
- Cards are emitted in descending order (Chore 15 first, Chore 01 last) so the
  newest-on-top stack in Trello reads 01 → 15 after import.

## Files

- `generate-trello-csv.js` — the generator.
- `package.json` — defines the `npm run build` script.
- `Example Import Spreadsheet.csv` — Trello's documented import format
  (reference only, do not edit).
- `sprint-zero-trello.csv` — generated output, ignored by git.
