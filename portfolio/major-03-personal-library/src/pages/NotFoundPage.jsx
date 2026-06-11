import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="empty-state">
      <h1>Page not found</h1>
      <p>The page you requested is not in this library app.</p>
      <Link className="btn btn--primary" to="/library">
        Back to My Library
      </Link>
    </section>
  );
}
