import { Link } from "react-router-dom";
import { READING_STATUS } from "../utils/libraryActions";

const statusLabels = {
  [READING_STATUS.WANT]: "Want to read",
  [READING_STATUS.READING]: "Reading",
  [READING_STATUS.COMPLETED]: "Completed",
};

export default function LibraryBookCard({
  book,
  onToggleFavorite,
  onStatusChange,
  onRemove,
}) {
  const coverAlt =
    book.thumbnail && book.title
      ? `${book.title} cover${book.author ? ` by ${book.author}` : ""}`
      : "";

  return (
    <li className="book-card">
      <div className="book-card__media">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={coverAlt} className="book-card__cover" />
        ) : (
          <div className="book-card__cover book-card__cover--placeholder" aria-hidden="true">
            No cover
          </div>
        )}
      </div>
      <div className="book-card__body">
        <h2 className="book-card__title">
          <Link to={`/library/${book.id}`}>{book.title}</Link>
        </h2>
        <p className="book-card__author">{book.author}</p>
        {book.genre ? <p className="book-card__genre">{book.genre}</p> : null}
        <div className="book-card__actions">
          <label className="field field--inline" htmlFor={`status-${book.id}`}>
            <span className="field__label">Status</span>
            <select
              id={`status-${book.id}`}
              value={book.readingStatus}
              onChange={(event) => onStatusChange(book.id, event.target.value)}
            >
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => onToggleFavorite(book.id)}
            aria-pressed={book.isFavorite}
            aria-label={
              book.isFavorite
                ? `Remove ${book.title} from favorites`
                : `Add ${book.title} to favorites`
            }
          >
            {book.isFavorite ? "Favorited" : "Favorite"}
          </button>
          <button
            type="button"
            className="btn btn--danger"
            onClick={() => onRemove(book.id)}
            aria-label={`Remove ${book.title} from library`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
