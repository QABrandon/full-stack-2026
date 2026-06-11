import { useLibrary } from "../hooks/useLibrary";
import { getLibraryStats } from "../utils/libraryStats";

export default function StatCounters() {
  const { items } = useLibrary();
  const { readCount, toReadCount } = getLibraryStats(items);

  return (
    <ul
      className="stat-counters"
      aria-label={`${readCount} books read, ${toReadCount} books to read`}
    >
      <li className="stat-counters__item">
        <span className="stat-counters__value">{readCount}</span>
        <span className="stat-counters__label">Read</span>
      </li>
      <li className="stat-counters__item">
        <span className="stat-counters__value">{toReadCount}</span>
        <span className="stat-counters__label">To Read</span>
      </li>
    </ul>
  );
}
