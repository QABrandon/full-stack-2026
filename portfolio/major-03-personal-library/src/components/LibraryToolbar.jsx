import { READING_STATUS } from "../utils/libraryActions";

export default function LibraryToolbar({
  statusFilter,
  genreFilter,
  favoritesOnly,
  sortBy,
  genres,
  sortOptions,
  onStatusFilterChange,
  onGenreFilterChange,
  onFavoritesOnlyChange,
  onSortByChange,
}) {
  return (
    <div className="library-toolbar" aria-label="Library filters and sorting">
      <label className="field field--inline" htmlFor="filter-status">
        <span className="field__label">Status</span>
        <select
          id="filter-status"
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value={READING_STATUS.WANT}>Want to read</option>
          <option value={READING_STATUS.READING}>Reading</option>
          <option value={READING_STATUS.COMPLETED}>Completed</option>
        </select>
      </label>

      <label className="field field--inline" htmlFor="filter-genre">
        <span className="field__label">Genre</span>
        <select
          id="filter-genre"
          value={genreFilter}
          onChange={(event) => onGenreFilterChange(event.target.value)}
        >
          <option value="all">All genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>

      <label className="field field--inline field--checkbox" htmlFor="filter-favorites">
        <input
          id="filter-favorites"
          type="checkbox"
          checked={favoritesOnly}
          onChange={(event) => onFavoritesOnlyChange(event.target.checked)}
        />
        <span className="field__label">Favorites only</span>
      </label>

      <label className="field field--inline" htmlFor="sort-by">
        <span className="field__label">Sort by</span>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
