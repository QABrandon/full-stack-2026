export default function SearchForm({ query, onQueryChange }) {
  return (
    <form
      className="search-form"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="field" htmlFor="book-search">
        <span className="field__label">Search by title, author, or topic</span>
        <div className="search-form__row">
          <input
            id="book-search"
            name="q"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Try “Octavia Butler” or “climate nonfiction”"
            aria-describedby="search-tips"
            autoComplete="off"
          />
          <button type="submit" className="btn btn--primary">
            Search
          </button>
        </div>
      </label>
    </form>
  );
}
