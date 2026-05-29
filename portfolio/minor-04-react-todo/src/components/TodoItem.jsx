function TodoItem({ todo, onToggle, onDelete }) {
  const completedClass = todo.completed ? " completed" : "";
  const checkboxAction = todo.completed ? "incomplete" : "complete";

  return (
    <li className={`todo-item${completedClass}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${checkboxAction}`}
      />
      <span className="todo-text">{todo.text}</span>
      <div className="todo-actions">
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete "${todo.text}"`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
