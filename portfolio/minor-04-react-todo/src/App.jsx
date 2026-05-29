import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoFilters from "./components/TodoFilters";
import TodoList from "./components/TodoList";

const STORAGE_KEY = "reactTodoTodos";

function loadTodosFromStorage() {
  const storedTodos = localStorage.getItem(STORAGE_KEY);

  if (!storedTodos) {
    return [];
  }

  try {
    const parsedTodos = JSON.parse(storedTodos);
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch {
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState(() => loadTodosFromStorage());
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const todoText = inputText.trim();

    if (!todoText) {
      setErrorMessage("Please enter a todo item");
      return;
    }

    if (todoText.length < 3) {
      setErrorMessage("Todo must be at least 3 characters long");
      return;
    }

    setErrorMessage("");

    const newTodo = {
      id: Date.now().toString(),
      text: todoText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos((previousTodos) => [...previousTodos, newTodo]);
    setInputText("");
  };

  const handleToggleTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id)
    );
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  return (
    <>
      <header>
        <a className="home-link" href="/">
          Back to portfolio home
        </a>
        <h1>React Todo List</h1>
        <p className="header-note">
          FS12 Week 9 Session 3 — React rebuild of the Week 7 todo app
        </p>
      </header>
      <main>
        <AddTodo
          inputText={inputText}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
          errorMessage={errorMessage}
        />
        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          allCount={todos.length}
          activeCount={activeCount}
          completedCount={completedCount}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          showEmptyMessage={todos.length === 0}
        />
      </main>
    </>
  );
}

export default App;
