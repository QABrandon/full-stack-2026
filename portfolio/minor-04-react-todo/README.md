# Minor 04: React Todo List App

FS12 Week 9 Session 3 — React + Vite rebuild of the Week 7 vanilla todo app.

**Portfolio source and build** live in [full-stack-2026](https://github.com/QABrandon/full-stack-2026) under `portfolio/minor-04-react-todo/`. The **class submission mirror** is local at `~/Desktop/BM Work/My Projects/FS Bootcamp/react-todo/`.

## Related locations

| Location | Purpose |
|----------|---------|
| `portfolio/minor-04-react-todo/` (this folder) | Source code, local dev, portfolio build |
| `~/Desktop/BM Work/My Projects/FS Bootcamp/react-todo/` | Local submission repo (`todo-react-app/`) |
| `portfolio/minor-03-todo-list-app/` | Vanilla JavaScript version (Week 7) |
| [github.com/QABrandon/react-todo](https://github.com/QABrandon/react-todo) | Remote submission repo for `#project-showcase` |

Sync changes to `~/Desktop/BM Work/My Projects/FS Bootcamp/react-todo/todo-react-app/` when you need to update the submission repo (see Week 9 walkthrough for rsync command).

## Features

- React functional components (`AddTodo`, `TodoList`, `TodoItem`, `TodoFilters`)
- `useState` for todos and controlled form input
- Add, toggle, delete, validation, empty states
- Filter: All / Active / Completed with counts
- `localStorage` persistence

## Commands

```bash
npm install
npm run dev
npm run build
```

After `npm run build`, open the portfolio card or visit `/portfolio/minor-04-react-todo/dist/` on the deployed site.
