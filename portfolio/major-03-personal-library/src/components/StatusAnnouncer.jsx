import { useEffect } from "react";
import { useLibrary } from "../hooks/useLibrary";

export default function StatusAnnouncer() {
  const { statusMessage, storageError, clearStatusMessage } = useLibrary();

  useEffect(() => {
    if (!statusMessage) {
      return undefined;
    }
    const timer = window.setTimeout(() => clearStatusMessage(), 4000);
    return () => window.clearTimeout(timer);
  }, [statusMessage, clearStatusMessage]);

  if (storageError) {
    return (
      <div className="status-banner status-banner--error" role="alert">
        {storageError}
      </div>
    );
  }

  if (!statusMessage) {
    return null;
  }

  return (
    <div className="status-banner" role="status" aria-live="polite">
      {statusMessage}
    </div>
  );
}
