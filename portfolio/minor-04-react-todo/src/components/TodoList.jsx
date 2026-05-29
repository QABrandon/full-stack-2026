import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, showEmptyMessage }) {
  if (showEmptyMessage) {
    return (
      <section className="todo-list-section">
        <ul className="todo-list">
          <li className="empty-state">No todos yet. Add one above!</li>
        </ul>
      </section>
    );
  }

  if (todos.length === 0) {
    return (
      <section className="todo-list-section">
        <ul className="todo-list">
          <li className="empty-state">No todos match this filter.</li>
        </ul>
      </section>
    );
  }

  return (
    <section className="todo-list-section">
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
