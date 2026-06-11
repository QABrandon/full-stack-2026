import SearchForm from "../components/SearchForm";
import SearchTips from "../components/SearchTips";
import SearchResults from "../components/SearchResults";
import SearchHistory from "../components/SearchHistory";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useBooksSearch } from "../hooks/useBooksSearch";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const { results, loading, error } = useBooksSearch(debouncedQuery);

  return (
    <section aria-labelledby="search-heading">
      <h1 id="search-heading">Search Books</h1>
      <p className="page-lede">
        Find titles with the Google Books API, then add them to your personal library.
      </p>
      <div className="search-layout">
        <div className="search-layout__main">
          <SearchForm query={query} onQueryChange={setQuery} />
          <SearchResults
            query={debouncedQuery}
            results={results}
            loading={loading}
            error={error}
          />
        </div>
        <aside className="search-layout__aside">
          <SearchTips />
          <SearchHistory query={query} onSelectQuery={setQuery} />
        </aside>
      </div>
    </section>
  );
}
