function TodoFilters({
  filter,
  onFilterChange,
  allCount,
  activeCount,
  completedCount,
}) {
  return (
    <div className="todo-filters">
      <button
        type="button"
        className={filter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All ({allCount})
      </button>
      <button
        type="button"
        className={filter === "active" ? "active" : ""}
        onClick={() => onFilterChange("active")}
      >
        Active ({activeCount})
      </button>
      <button
        type="button"
        className={filter === "completed" ? "active" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
}

export default TodoFilters;
