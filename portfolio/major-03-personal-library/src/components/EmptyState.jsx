import { Link } from "react-router-dom";

export default function EmptyState({ title, message, actionLabel, actionTo }) {
  return (
    <div className="empty-state" role="status">
      <h2>{title}</h2>
      <p>{message}</p>
      {actionLabel && actionTo ? (
        <Link className="btn btn--primary" to={actionTo}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
