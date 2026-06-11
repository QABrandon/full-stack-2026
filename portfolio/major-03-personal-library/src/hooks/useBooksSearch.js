import { useEffect, useState } from "react";
import { mapGoogleBook } from "../utils/mapGoogleBook";

export function useBooksSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const search = async () => {
      try {
        const url = new URL("https://www.googleapis.com/books/v1/volumes");
        url.searchParams.set("q", trimmed);
        url.searchParams.set("maxResults", "12");

        const response = await fetch(url.toString(), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Book search failed. Try again in a moment.");
        }

        const data = await response.json();
        const mapped = (data.items ?? []).map(mapGoogleBook);
        setResults(mapped);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err instanceof Error ? err.message : "Unable to search Google Books."
          );
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    };

    search();

    return () => controller.abort();
  }, [query]);

  return { results, loading, error };
}
