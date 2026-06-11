import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEY, useLocalStorage } from "../hooks/useLocalStorage";
import {
  addItem,
  createBookItem,
  removeItem,
  setReadingStatus,
  setUserRating,
  toggleFavorite,
  updateItem,
} from "../utils/libraryActions";

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [items, setItems, storageError] = useLocalStorage(STORAGE_KEY, []);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    if (storageError) {
      setStatusMessage(storageError);
    }
  }, [storageError]);

  const actions = useMemo(
    () => ({
      addItem: (item) => {
        setItems((current) => {
          if (current.some((existing) => existing.id === item.id)) {
            setStatusMessage(`${item.title} is already in your library.`);
            return current;
          }
          setStatusMessage(`${item.title} added to your library.`);
          return addItem(current, item);
        });
      },
      removeItem: (id) => {
        setItems((current) => removeItem(current, id));
        setStatusMessage("Book removed from your library.");
      },
      updateItem: (id, updates) => {
        setItems((current) => updateItem(current, id, updates));
        setStatusMessage("Book details updated.");
      },
      toggleFavorite: (id) => {
        setItems((current) => toggleFavorite(current, id));
      },
      setReadingStatus: (id, readingStatus) => {
        setItems((current) => setReadingStatus(current, id, readingStatus));
      },
      setUserRating: (id, userRating) => {
        setItems((current) => setUserRating(current, id, userRating));
      },
      clearStatusMessage: () => setStatusMessage(null),
    }),
    [setItems]
  );

  const value = useMemo(
    () => ({
      items,
      statusMessage,
      storageError,
      ...actions,
    }),
    [items, statusMessage, storageError, actions]
  );

  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
}

export function useLibraryContext() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within LibraryProvider");
  }
  return context;
}

export { createBookItem };
