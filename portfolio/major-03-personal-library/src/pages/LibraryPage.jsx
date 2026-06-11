import { useMemo, useState } from "react";
import { useLibrary } from "../hooks/useLibrary";
import LibraryBookCard from "../components/LibraryBookCard";
import LibraryToolbar from "../components/LibraryToolbar";
import EmptyState from "../components/EmptyState";

const sortOptions = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "dateAdded", label: "Date added" },
  { value: "userRating", label: "Rating" },
];

function compareBooks(a, b, sortBy) {
  if (sortBy === "dateAdded") {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  }
  if (sortBy === "userRating") {
    return (b.userRating || 0) - (a.userRating || 0);
  }
  return String(a[sortBy] ?? "").localeCompare(String(b[sortBy] ?? ""), undefined, {
    sensitivity: "base",
  });
}

export default function LibraryPage() {
  const { items, toggleFavorite, setReadingStatus, removeItem } = useLibrary();
  const [statusFilter, setStatusFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("title");

  const genres = useMemo(
    () =>
      [...new Set(items.map((book) => book.genre).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b)
      ),
    [items]
  );

  const filteredItems = useMemo(() => {
    let next = [...items];

    if (statusFilter !== "all") {
      next = next.filter((book) => book.readingStatus === statusFilter);
    }

    if (genreFilter !== "all") {
      next = next.filter((book) => book.genre === genreFilter);
    }

    if (favoritesOnly) {
      next = next.filter((book) => book.isFavorite);
    }

    return next.sort((a, b) => compareBooks(a, b, sortBy));
  }, [items, statusFilter, genreFilter, favoritesOnly, sortBy]);

  return (
    <section aria-labelledby="library-heading">
      <h1 id="library-heading">My Library</h1>
      <p className="page-lede">
        Track what you are reading, what you want to read, and what you have finished.
      </p>

      {items.length > 0 ? (
        <LibraryToolbar
          statusFilter={statusFilter}
          genreFilter={genreFilter}
          favoritesOnly={favoritesOnly}
          sortBy={sortBy}
          genres={genres}
          sortOptions={sortOptions}
          onStatusFilterChange={setStatusFilter}
          onGenreFilterChange={setGenreFilter}
          onFavoritesOnlyChange={setFavoritesOnly}
          onSortByChange={setSortBy}
        />
      ) : null}

      {items.length === 0 ? (
        <EmptyState
          title="Your library is empty"
          message="Search for books and add them to start building your collection."
          actionLabel="Search books"
          actionTo="/search"
        />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="No books match these filters"
          message="Try changing the status, genre, or favorites filter."
        />
      ) : (
        <ul className="book-list">
          {filteredItems.map((book) => (
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
