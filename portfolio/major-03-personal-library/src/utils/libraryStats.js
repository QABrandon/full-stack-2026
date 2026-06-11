import { READING_STATUS } from "./libraryActions";

export function getLibraryStats(items) {
  const readCount = items.filter(
    (item) => item.readingStatus === READING_STATUS.COMPLETED
  ).length;
  const toReadCount = items.filter(
    (item) =>
      item.readingStatus === READING_STATUS.WANT ||
      item.readingStatus === READING_STATUS.READING
  ).length;

  return { readCount, toReadCount };
}

export function itemExists(items, id) {
  return items.some((item) => item.id === id);
}
