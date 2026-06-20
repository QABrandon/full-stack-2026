import { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:3001/api/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof TypeError) {
          setError(
            'Did you go to a new terminal in the "backend" folder and start the server using npm run nodemon?',
          );
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  };

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    })
      .then((res) => res.json())
      .then((todo) => {
        setTodos([...todos, todo]);
        setNewTodo("");
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  const toggleTodo = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
      })
      .catch((err) => console.error("Error toggling todo:", err));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter((t) => t.id !== id)))
      .catch((err) => console.error("Error deleting todo:", err));
  };

  if (loading) return <div className="loading">Loading todos...</div>;
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchTodos}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-input-section">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Add Todo
        </button>
      </div>

      <div className="todos">
        {todos.length === 0 ? (
          <p className="empty-state">No todos yet. Add one to get started!</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span
                className={todo.completed ? "todo-text completed" : "todo-text"}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="todo-stats">
        <p>
          Total: {todos.length} | Completed:{" "}
          {todos.filter((t) => t.completed).length}
        </p>
      </div>
    </div>
  );
}

export default TodoList;
