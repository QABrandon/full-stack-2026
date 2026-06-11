import { useCallback, useEffect, useState } from "react";

export const STORAGE_KEY = "personal-library-items";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loadError, setLoadError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      setLoadError(
        "Saved library data could not be read. Starting with an empty library."
      );
    }
  }, [key]);

  const setValue = useCallback(
    (value) => {
      setStoredValue((current) => {
        const nextValue = value instanceof Function ? value(current) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
          setSaveError(null);
        } catch (error) {
          setSaveError(
            error instanceof Error
              ? error.message
              : "Unable to save library to local storage."
          );
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue, loadError || saveError];
}
