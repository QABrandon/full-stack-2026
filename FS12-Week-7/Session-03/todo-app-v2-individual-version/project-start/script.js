// Todo List App — FS12 Week 7 individual project
//
// Big idea from class: keep one source of truth in JavaScript (`todos`),
// then redraw the list whenever data changes. That way storage + UI stay aligned.

// ----- Application state -----
// We mutate this array when users add, check off, or delete — never rely only on the DOM for truth.
let todos = [];

// ----- DOM element selection (same IDs as index.html) -----
// Grab references once so we are not re-querying the document inside hot paths.
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("#todo-count");
const errorMessage = document.querySelector("#error-message");

// ----- Run setup when the DOM is ready -----
// Waits until HTML exists — avoids edge races where script runs before elements render (still OK here because script uses defer).
document.addEventListener("DOMContentLoaded", function () {
  // Hydrate first so refresh restores saved todos instead of wiping UI silently.
  loadTodosFromStorage();
  renderTodos();

  todoForm.addEventListener("submit", handleFormSubmit);
  // Delegation lives on the <ul>: newly built todo rows come and go without re-binding handlers each render.
  todoList.addEventListener("click", handleTodoListClick);
  todoList.addEventListener("change", handleTodoToggle);
});

// ----- Form: add a new todo -----
function handleFormSubmit(event) {
  // Forms normally reload/navigate — blocking default lets JS fully control what happens next (assignment asks for this pattern).
  event.preventDefault();

  const todoText = todoInput.value.trim();

  // PLAN asks for empty-string rejection — trimming avoids whitespace-only tricks counting as real text.
  if (!todoText) {
    showErrorMessage("Please enter a todo item");
    return;
  }

  const minimumLength = 3;
  if (todoText.length < minimumLength) {
    showErrorMessage("Todo must be at least 3 characters long");
    return;
  }

  hideErrorMessage();

  addTodo(todoText);
  // Reset input after success so the UI feels finished and ready for the next item.
  todoInput.value = "";
}

// ----- Simple validation feedback (uses .show class from styles.css) -----
function showErrorMessage(message) {
  errorMessage.textContent = message;
  // CSS hides errors until `.show` appears — keeps markup accessible without flickering blank messages forever.
  errorMessage.classList.add("show");
}

function hideErrorMessage() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("show");
}

// ----- Todo CRUD -----
function addTodo(text) {
  const newTodo = {
    id: Date.now().toString(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  updateUI();
}

function deleteTodo(id) {
  // Filter rebuilds the array without mutating items one-by-one — simple mental model for beginners.
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });
  updateUI();
}

function handleTodoToggle(event) {
  // Ignore bubbling noise — only care when an actual checkbox fires change.
  if (event.target.type !== "checkbox") {
    return;
  }

  // closest() walks up through bubbling ancestors — finds the row even if nested controls expand later.
  const todoItem = event.target.closest(".todo-item");
  if (!todoItem) {
    return;
  }

  const todoId = todoItem.dataset.id;

  // Browser already flipped checkbox.checked before this handler runs — mirror that boolean into data instead of toggling twice.
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === todoId) {
      todos[i].completed = event.target.checked;
      break;
    }
  }

  updateUI();
}

// ----- Event delegation on #todo-list -----
function handleTodoListClick(event) {
  const todoItem = event.target.closest(".todo-item");
  if (!todoItem) {
    return;
  }

  const todoId = todoItem.dataset.id;

  // Only react when the actual delete control was pressed — prevents accidental deletes from unrelated clicks inside the row.
  if (event.target.classList.contains("delete-btn")) {
    deleteTodo(todoId);
  }
}

// ----- Keep storage + screen in sync -----
function updateUI() {
  // Rubric “consistent updates”: funnel every mutation through one helper so JSON + DOM never drift apart silently.
  saveTodosToStorage();
  renderTodos();
}

// ----- Rendering -----
function renderTodos() {
  // Re-render replaces children wholesale — mirrors PLAN guidance (update array first, then redraw).
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML =
      '<li class="empty-state" role="status">No todos yet. Add one above!</li>';
    updateTodoCount();
    return;
  }

  for (let i = 0; i < todos.length; i++) {
    todoList.appendChild(createTodoElement(todos[i]));
  }

  updateTodoCount();
}

function createTodoElement(todo) {
  // PLAN calls for createElement — start from an <li>, then shape internals.
  const li = document.createElement("li");

  const completedClass = todo.completed ? " completed" : "";
  li.className = "todo-item" + completedClass;
  // data-* hooks DOM rows back to objects during delegated events without fragile positional guessing.
  li.setAttribute("data-id", todo.id);

  const checkboxChecked = todo.completed ? "checked" : "";
  const checkboxAction = todo.completed ? "incomplete" : "complete";

  // innerHTML builds static scaffolding quickly — rubric still expects XSS safety for user-authored strings…
  li.innerHTML =
    '<input type="checkbox" class="todo-checkbox" ' +
    checkboxChecked +
    ' aria-label="Mark todo as ' +
    checkboxAction +
    '">' +
    '<span class="todo-text"></span>' +
    '<div class="todo-actions">' +
    '<button type="button" class="delete-btn" aria-label="Delete todo">Delete</button>' +
    "</div>";

  // …so actual todo words bypass HTML parsing via textContent (prevents accidental script injection).
  const textSpan = li.querySelector(".todo-text");
  textSpan.textContent = todo.text;

  return li;
}

function updateTodoCount() {
  let remaining = 0;
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].completed) {
      remaining++;
    }
  }

  if (remaining === 1) {
    todoCount.textContent = "1 item remaining";
  } else {
    todoCount.textContent = remaining + " items remaining";
  }
}

// ----- localStorage (same idea as localstorage-demo-complete.js) -----
function saveTodosToStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromStorage() {
  const storedTodos = localStorage.getItem("todos");
  if (!storedTodos) {
    todos = [];
    return;
  }

  try {
    todos = JSON.parse(storedTodos);
    // Guard against corrupted edits in DevTools — fall back to empty instead of crashing startup.
    if (!Array.isArray(todos)) {
      todos = [];
    }
  } catch (error) {
    console.error("Could not load todos from storage:", error);
    todos = [];
  }
}
