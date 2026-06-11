import { useLibrary } from "../hooks/useLibrary";
import LibraryBookCard from "../components/LibraryBookCard";
import EmptyState from "../components/EmptyState";

export default function FavoritesPage() {
  const { items, toggleFavorite, setReadingStatus, removeItem } = useLibrary();
  const favorites = items.filter((book) => book.isFavorite);

  return (
    <section aria-labelledby="favorites-heading">
      <h1 id="favorites-heading">Favorites</h1>
      <p className="page-lede">Books you have marked as favorites across your library.</p>
      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Mark books as favorites from your library or book detail pages."
          actionLabel="Go to My Library"
          actionTo="/library"
        />
      ) : (
        <ul className="book-list">
          {favorites.map((book) => (
            <LibraryBookCard
              key={book.id}
              book={book}
              onToggleFavorite={toggleFavorite}
              onStatusChange={setReadingStatus}
              onRemove={removeItem}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
