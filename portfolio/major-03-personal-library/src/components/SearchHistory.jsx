import { useEffect, useState } from "react";

const HISTORY_KEY = "personal-library-search-history";

function readHistory() {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function SearchHistory({ query, onSelectQuery }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(readHistory());
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      return;
    }

    setHistory((current) => {
      const next = [trimmed, ...current.filter((item) => item !== trimmed)].slice(
        0,
        5
      );
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, [query]);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="tips-card">
      <h2 className="tips-card__title">Recent searches</h2>
      <ul className="history-list">
        {history.map((term) => (
          <li key={term}>
            <button
              type="button"
              className="history-list__button"
              onClick={() => onSelectQuery(term)}
            >
              {term}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
