import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SiteHeader from "./SiteHeader";
import StatusAnnouncer from "../components/StatusAnnouncer";
import { useRouteFocus } from "../hooks/useRouteFocus";

const titles = {
  "/library": "My Library",
  "/search": "Search Books",
  "/favorites": "Favorites",
};

export default function AppShell() {
  useRouteFocus();
  const location = useLocation();

  useEffect(() => {
    const base =
      titles[location.pathname] ||
      (location.pathname.startsWith("/library/")
        ? "Book Details"
        : "Page Not Found");
    document.title = `${base} | Personal Library`;
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <StatusAnnouncer />
      <main id="main-content" className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
