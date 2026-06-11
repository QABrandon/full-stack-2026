import { useEffect, useRef } from "react";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);
  const cancelRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return undefined;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      cancelRef.current?.focus();
    }

    if (!open && dialog.open) {
      dialog.close();
    }

    return undefined;
  }, [open]);

  return (
    <dialog ref={dialogRef} className="confirm-dialog" aria-labelledby="confirm-title">
      {open ? (
        <form method="dialog" className="confirm-dialog__form" onSubmit={(e) => e.preventDefault()}>
          <h2 id="confirm-title">{title}</h2>
          <p>{message}</p>
          <div className="confirm-dialog__actions">
            <button
              ref={cancelRef}
              type="button"
              className="btn btn--secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="button" className="btn btn--danger" onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </form>
      ) : null}
    </dialog>
  );
}
