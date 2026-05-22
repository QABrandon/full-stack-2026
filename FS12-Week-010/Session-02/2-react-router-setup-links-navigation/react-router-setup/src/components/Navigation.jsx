import { Link } from "react-router";

export default function Navigation() {
  return (
    <nav>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/user-profile">User Profile</Link>
      </li>
      <li>
        <Link to="/user-profile/123">User Profile (ID: 123)</Link>
      </li>

      <h2>Standard anchor link</h2>
      {/* what is different when we click on this link vs the one above when looking at the dom tree
          in dev tools? */}

      {/* this is the same as putting http://localhost:5174/contact into the address bar and hitting enter */}
      <li>
        <a href="/contact">Contact</a>
      </li>
    </nav>
  );
}
