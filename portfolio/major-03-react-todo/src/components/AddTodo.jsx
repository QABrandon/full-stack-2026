function AddTodo({ inputText, onInputChange, onSubmit, errorMessage }) {
  return (
    <section className="todo-input-section">
      <form className="todo-form" onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={inputText}
            onChange={onInputChange}
            placeholder="Enter a new todo..."
            aria-label="New todo item"
          />
          <button type="submit" className="add-btn">
            Add Todo
          </button>
        </div>
        {errorMessage && (
          <div className="error-message show" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    </section>
  );
}

export default AddTodo;
