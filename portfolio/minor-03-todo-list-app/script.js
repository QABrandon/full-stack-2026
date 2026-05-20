// Todo List App - A simple task management application

// Application State
let todos = [];

const STORAGE_KEY = 'portfolioTodoListTodos';

// DOM Element Selection
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const errorMessage = document.querySelector('#error-message');

// Initialize App - Run setup when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTodosFromStorage();
    renderTodos();

    // Form submission handling
    todoForm.addEventListener('submit', handleFormSubmit);

    // Event delegation for todo list
    todoList.addEventListener('click', handleTodoListClick);
    todoList.addEventListener('change', handleTodoToggle);
});

// Form Processing and Validation
function handleFormSubmit(event) {
    event.preventDefault();

    const rawTodoText = todoInput.value;
    const todoText = rawTodoText.trim();

    if (!todoText) {
        showErrorMessage('Please enter a todo item');
        return;
    }

    const minimumLength = 3;
    if (todoText.length < minimumLength) {
        showErrorMessage('Todo must be at least 3 characters long');
        return;
    }

    hideErrorMessage();
    addTodo(todoText);
    todoInput.value = '';
}

// User Feedback - Error Message Display
function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');

    setTimeout(() => {
        hideErrorMessage();
    }, 3000);
}

function hideErrorMessage() {
    errorMessage.classList.remove('show');
}

// Todo Management Functions
function addTodo(text) {
    const newTodo = {
        id: Date.now().toString(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    updateUI();
}

function updateUI() {
    saveTodosToStorage();
    renderTodos();
}

// Event Delegation Handler
function handleTodoListClick(event) {
    const todoItem = event.target.closest('.todo-item');
    if (!todoItem) return;

    const todoId = todoItem.dataset.id;

    if (event.target.classList.contains('delete-btn')) {
        deleteTodo(todoId);
        return;
    }
}

// Handle checkbox toggle
function handleTodoToggle(event) {
    if (event.target.type === 'checkbox') {
        const todoItem = event.target.closest('.todo-item');
        const todoId = todoItem.dataset.id;
        toggleTodo(todoId);
    }
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        const isTargetTodo = todo.id === id;

        if (isTargetTodo) {
            return { ...todo, completed: !todo.completed };
        }

        return todo;
    });

    updateUI();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateUI();
}

// DOM Manipulation and Rendering
function renderTodos() {
    todoList.innerHTML = '';

    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-state">No todos yet. Add one above!</li>';
        return;
    }

    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    const completedClass = todo.completed ? ' completed' : '';
    const checkboxChecked = todo.completed ? 'checked' : '';
    const checkboxAction = todo.completed ? 'incomplete' : 'complete';

    li.className = `todo-item${completedClass}`;
    li.setAttribute('data-id', todo.id);
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${checkboxChecked}>
        <span class="todo-text"></span>
        <div class="todo-actions">
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const checkbox = li.querySelector('.todo-checkbox');
    const textSpan = li.querySelector('.todo-text');
    const deleteButton = li.querySelector('.delete-btn');

    textSpan.textContent = todo.text;
    checkbox.setAttribute('aria-label', `Mark ${todo.text} as ${checkboxAction}`);
    deleteButton.setAttribute('aria-label', `Delete ${todo.text}`);

    return li;
}

// Local Storage Operations
function saveTodosToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodosFromStorage() {
    const storedTodos = localStorage.getItem(STORAGE_KEY);

    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}
