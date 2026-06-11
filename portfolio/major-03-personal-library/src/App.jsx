import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import AppShell from "./layout/AppShell";

const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const ItemDetailPage = lazy(() => import("./pages/ItemDetailPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function PageFallback() {
  return <p role="status">Loading page…</p>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/library" replace />} />
          <Route
            path="library"
            element={
              <Suspense fallback={<PageFallback />}>
                <LibraryPage />
              </Suspense>
            }
          />
          <Route
            path="library/:id"
            element={
              <Suspense fallback={<PageFallback />}>
                <ItemDetailPage />
              </Suspense>
            }
          />
          <Route
            path="search"
            element={
              <Suspense fallback={<PageFallback />}>
                <SearchPage />
              </Suspense>
            }
          />
          <Route
            path="favorites"
            element={
              <Suspense fallback={<PageFallback />}>
                <FavoritesPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
