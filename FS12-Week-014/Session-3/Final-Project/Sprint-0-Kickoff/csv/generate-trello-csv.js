#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SPRINT_DIR = path.resolve(__dirname, '..', 'sprint-0');
const SOURCE_DIRS = [
  path.join(SPRINT_DIR, 'chores'),
];
const OUTPUT_PATH = path.resolve(__dirname, 'sprint-zero-trello.csv');
const LABEL = 'sprint-0 (blue)';
const LIST_NAME = '';

const HEADERS = [
  'Card Name',
  'Card Description',
  'Labels',
  'Members',
  'Due Date',
  'Start Date',
  'List Name',
  'Checklist',
  'Checklist item',
  'Checklist item due',
  'Checklist item member',
];

function findChoreFiles() {
  const found = [];
  for (const dir of SOURCE_DIRS) {
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith('.md')) continue;
      const m = name.match(/^chore-(\d{2})-/);
      if (!m) continue;
      found.push({ number: parseInt(m[1], 10), file: path.join(dir, name) });
    }
  }
  return found.sort((a, b) => b.number - a.number);
}

function stripInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(^|[^*])\*(?!\s)([^*]+?)\*(?!\*)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function parseChore(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');

  const titleMatch = lines[0].match(/^#\s+Chore\s+(\d+)\s*:\s*(.+?)\s*$/);
  if (!titleMatch) {
    throw new Error(`No "# Chore N: Title" line in ${filePath}`);
  }
  const number = parseInt(titleMatch[1], 10);
  const title = stripInline(titleMatch[2]);
  const cardName = `Chore ${String(number).padStart(2, '0')}: ${title}`;

  const descLines = [];
  const sections = [];
  let currentSection = null;
  let codeBlock = null;
  let descStarted = false;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (line.trimStart().startsWith('```')) {
      if (codeBlock === null) {
        const indented = /^\s/.test(line);
        codeBlock = { keep: !indented };
        if (codeBlock.keep && descStarted) descLines.push(line);
      } else {
        if (codeBlock.keep && descStarted) descLines.push(line);
        codeBlock = null;
      }
      continue;
    }

    if (codeBlock !== null) {
      if (codeBlock.keep && descStarted) descLines.push(line);
      continue;
    }

    if (/^\s+\S/.test(line)) {
      continue;
    }

    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      const name = stripInline(heading[1]);
      descStarted = true;
      descLines.push('');
      descLines.push(`## ${name}`);
      descLines.push('');
      currentSection = name === 'Task' ? null : { name, items: [] };
      if (currentSection) sections.push(currentSection);
      continue;
    }

    if (line.startsWith('**Estimated Time:**')) {
      descStarted = true;
      descLines.push(line);
      continue;
    }

    const item = line.match(/^-\s+\[\s*\]\s+(.+?)\s*$/);
    if (item) {
      const text = item[1];
      if (currentSection) currentSection.items.push(stripInline(text));
      if (descStarted) descLines.push(`- ${text}`);
      continue;
    }

    if (descStarted) {
      descLines.push(line);
    }
  }

  const description = descLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return { number, cardName, description, sections };
}

function csvEscape(value) {
  const s = value == null ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function csvRow(fields) {
  const padded = fields.slice();
  while (padded.length < HEADERS.length) padded.push('');
  return padded.map(csvEscape).join(',');
}

function buildCsv(chores) {
  const rows = [HEADERS.join(',')];
  for (const chore of chores) {
    rows.push(csvRow([chore.cardName, chore.description, LABEL, '', '', '', LIST_NAME]));
    for (const section of chore.sections) {
      for (const item of section.items) {
        rows.push(csvRow(['', '', '', '', '', '', '', section.name, item]));
      }
    }
  }
  return rows.join('\n') + '\n';
}

function main() {
  const files = findChoreFiles();
  if (files.length === 0) {
    console.error(`No chore markdown files found under ${SPRINT_DIR}`);
    process.exit(1);
  }
  const chores = files.map((f) => parseChore(f.file));
  const csv = buildCsv(chores);
  fs.writeFileSync(OUTPUT_PATH, csv);

  const itemCount = chores.reduce(
    (acc, c) => acc + c.sections.reduce((s, sec) => s + sec.items.length, 0),
    0
  );
  console.log(
    `Wrote ${path.relative(process.cwd(), OUTPUT_PATH)} ` +
      `(${chores.length} cards, ${itemCount} checklist items, ${csv.length} bytes)`
  );
}

main();
