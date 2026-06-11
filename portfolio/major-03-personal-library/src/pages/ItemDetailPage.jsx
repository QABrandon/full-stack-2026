import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import { useLibrary } from "../hooks/useLibrary";
import { READING_STATUS } from "../utils/libraryActions";

const statusLabels = {
  [READING_STATUS.WANT]: "Want to read",
  [READING_STATUS.READING]: "Reading",
  [READING_STATUS.COMPLETED]: "Completed",
};

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    items,
    toggleFavorite,
    setReadingStatus,
    setUserRating,
    updateItem,
    removeItem,
  } = useLibrary();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const book = useMemo(
    () => items.find((item) => item.id === id),
    [items, id]
  );

  if (!book) {
    return (
      <section className="empty-state">
        <h1>Book not found</h1>
        <p>This title is not in your library.</p>
        <Link className="btn btn--primary" to="/library">
          Back to My Library
        </Link>
      </section>
    );
  }

  const handleDelete = () => {
    removeItem(book.id);
    navigate("/library");
  };

  return (
    <article className="detail-page" aria-labelledby="detail-heading">
      <h1 id="detail-heading">{book.title}</h1>
      <div className="detail-page__layout">
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={`${book.title} cover${book.author ? ` by ${book.author}` : ""}`}
            className="detail-page__cover"
          />
        ) : null}
        <div className="detail-page__content">
          <section aria-labelledby="detail-meta-heading">
            <h2 id="detail-meta-heading">Details</h2>
            <dl className="detail-list">
              <div>
                <dt>Author</dt>
                <dd>{book.author}</dd>
              </div>
              {book.genre ? (
                <div>
                  <dt>Genre</dt>
                  <dd>{book.genre}</dd>
                </div>
              ) : null}
              <div>
                <dt>Added</dt>
                <dd>{new Date(book.dateAdded).toLocaleDateString()}</dd>
              </div>
            </dl>
          </section>

          {book.description ? (
            <section aria-labelledby="detail-description-heading">
              <h2 id="detail-description-heading">Description</h2>
              <p>{book.description}</p>
            </section>
          ) : null}

          <section aria-labelledby="detail-edit-heading">
            <h2 id="detail-edit-heading">Update this book</h2>
            <div className="detail-form">
              <label className="field" htmlFor="detail-status">
                <span className="field__label">Reading status</span>
                <select
                  id="detail-status"
                  value={book.readingStatus}
                  onChange={(event) =>
                    setReadingStatus(book.id, event.target.value)
                  }
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="rating-fieldset">
                <legend className="field__label">Your rating</legend>
                <div className="rating-group" role="radiogroup" aria-label="Your rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="rating-option">
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={book.userRating === value}
                        onChange={() => setUserRating(book.id, value)}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="field" htmlFor="detail-notes">
                <span className="field__label">Notes</span>
                <textarea
                  id="detail-notes"
                  rows="4"
                  value={book.notes}
                  onChange={(event) =>
                    updateItem(book.id, { notes: event.target.value })
                  }
                />
              </label>
            </div>
          </section>

          <div className="detail-actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => toggleFavorite(book.id)}
              aria-pressed={book.isFavorite}
            >
              {book.isFavorite ? "Remove favorite" : "Mark favorite"}
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => setConfirmOpen(true)}
            >
              Delete book
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this book?"
        message={`Remove “${book.title}” from your library? This cannot be undone.`}
        confirmLabel="Delete book"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </article>
  );
}
