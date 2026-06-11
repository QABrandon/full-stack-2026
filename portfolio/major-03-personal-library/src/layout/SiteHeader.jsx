import { NavLink, Link } from "react-router-dom";
import StatCounters from "./StatCounters";
import { useTheme } from "../context/ThemeContext";
import { useLibrary } from "../hooks/useLibrary";
import { exportLibraryJson } from "../utils/exportLibraryJson";

const navItems = [
  { to: "/library", label: "My Library" },
  { to: "/search", label: "Search Books" },
  { to: "/favorites", label: "Favorites" },
];

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();
  const { items } = useLibrary();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-header__brand" to="/library">
          Personal Library
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `site-nav__link${isActive ? " is-active" : ""}`
              }
              end={to === "/library"}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__tools">
          <StatCounters />
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => exportLibraryJson(items)}
            aria-label="Export library as JSON file"
          >
            Export
          </button>
          <button
            type="button"
            className="btn btn--secondary theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </div>
      </div>
    </header>
  );
}
