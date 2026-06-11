import { useLibrary } from "../hooks/useLibrary";
import { itemExists } from "../utils/libraryStats";

export default function SearchResults({ query, results, loading, error }) {
  const { items, addItem } = useLibrary();

  if (!query.trim()) {
    return (
      <div className="search-results empty-state" role="status">
        <h2>Start with a search</h2>
        <p>Enter a title, author, or topic to load Google Books results.</p>
      </div>
    );
  }

  return (
    <section
      className="search-results"
      aria-labelledby="search-results-heading"
      aria-busy={loading}
    >
      <h2 id="search-results-heading" className="sr-only">
        Search results
      </h2>

      {loading ? <p role="status">Searching Google Books…</p> : null}

      {error ? (
        <div className="status-banner status-banner--error" role="alert">
          {error}
        </div>
      ) : null}

      {!loading && !error && results.length === 0 ? (
        <div className="empty-state" role="status">
          <h2>No books found</h2>
          <p>Try a different spelling or a broader keyword.</p>
        </div>
      ) : null}

      {!loading && results.length > 0 ? (
        <ul className="search-results__list">
          {results.map((book) => {
            const alreadyAdded = itemExists(items, book.id);
            return (
              <li key={book.id} className="search-result">
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={`${book.title} cover`}
                    className="search-result__cover"
                  />
                ) : (
                  <div
                    className="search-result__cover search-result__cover--placeholder"
                    aria-hidden="true"
                  >
                    No cover
                  </div>
                )}
                <div className="search-result__body">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  {book.genre ? <p className="search-result__genre">{book.genre}</p> : null}
                  <button
                    type="button"
                    className="btn btn--primary"
                    disabled={alreadyAdded}
                    onClick={() => addItem(book)}
                    aria-label={
                      alreadyAdded
                        ? `${book.title} is already in your library`
                        : `Add ${book.title} to library`
                    }
                  >
                    {alreadyAdded ? "In library" : "Add to library"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
