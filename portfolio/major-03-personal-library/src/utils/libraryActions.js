export const READING_STATUS = {
  WANT: "want-to-read",
  READING: "reading",
  COMPLETED: "completed",
};

export function createBookItem(overrides = {}) {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    title: overrides.title ?? "Untitled",
    author: overrides.author ?? "Unknown author",
    thumbnail: overrides.thumbnail ?? "",
    description: overrides.description ?? "",
    genre: overrides.genre ?? "",
    isFavorite: overrides.isFavorite ?? false,
    readingStatus: overrides.readingStatus ?? READING_STATUS.WANT,
    userRating: overrides.userRating ?? 0,
    notes: overrides.notes ?? "",
    dateAdded: overrides.dateAdded ?? new Date().toISOString(),
  };
}

export function addItem(items, item) {
  if (items.some((existing) => existing.id === item.id)) {
    return items;
  }
  return [...items, item];
}

export function removeItem(items, id) {
  return items.filter((item) => item.id !== id);
}

export function updateItem(items, id, updates) {
  return items.map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );
}

export function toggleFavorite(items, id) {
  return items.map((item) =>
    item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
  );
}

export function setReadingStatus(items, id, readingStatus) {
  return updateItem(items, id, { readingStatus });
}

export function setUserRating(items, id, userRating) {
  return updateItem(items, id, { userRating: Number(userRating) });
}
