# Step 3 — Debug for Understanding

Trace one full round-trip: **button click → frontend fetch → network → backend breakpoint → response → render**.

## Setup

- Frontend running: `cd frontend && npm run dev` → http://localhost:5173
- Backend running via VSCode: open `backend/package.json` → click **debug launch** → choose `dev`. (This gives you a real debugger attached.)
- Open the app in **Chrome** at http://localhost:5173.
- Open DevTools (`F12` or `Cmd+Option+I`).

---

## 1. Set a breakpoint on the **frontend** (Chrome)

- DevTools → **Sources** tab.
- Left panel: open `localhost:5173` → `src/components/TodoList.jsx`.
- Find the `addTodo` function. Click the line number on:
  ```js
  fetch("http://localhost:3001/api/todos", {
  ```
- A blue marker appears = breakpoint set.

## 2. Set a breakpoint on the **backend** (VSCode)

- Open `backend/server.js`.
- Click the gutter (left of the line number) on:
  ```js
  const newTodo = {
  ```
- A red dot appears = breakpoint set.

## 3. Trigger the request

- In the browser, type a todo (e.g. `debug me`) and click **Add Todo**.

## 4. Watch the frontend pause

- Chrome stops on your `fetch` line.
- Hover `newTodo` in the source panel → see the value.
- Press **F10** (step over) until the `fetch` is sent, then **F8** (resume).

## 5. Check the Network tab

- DevTools → **Network** tab.
- Find the `POST` to `todos`. Status will be **pending** while the backend is paused.
- Click it → **Headers** (Request URL, Method, Origin) and **Payload** (`{ "text": "debug me" }`).

## 6. Watch the backend pause

- Switch to **VSCode**. Execution is paused on `app.post`.
- Hover `req.body` → you see `{ text: "debug me" }`.
- Step through (**F10**) line by line:
  - `newTodo` is built
  - `todos.push(newTodo)` adds it to the array
  - `res.status(201).json(newTodo)` sends the response
- Press **F5** (continue).

## 7. Response comes back to the frontend

- Back in Chrome → **Network** tab → the `POST` now shows **201**.
- Click it → **Response** tab → you see the JSON of the new todo.

## 8. See it render

- Chrome was still paused on a step-through? Press **F8** to resume.
- The `.then((todo) => setTodos([...todos, todo]))` runs → React re-renders.
- The new todo appears in the list. ✅

---

## What you just proved

1. The button click ran **frontend** JS.
2. That JS made an HTTP request the **browser** sent over the network.
3. The **backend** received it, ran handler code, mutated state, sent a response.
4. The **frontend** received the response, updated React state, re-rendered the DOM.

Two separate programs. One conversation. That's full-stack.
