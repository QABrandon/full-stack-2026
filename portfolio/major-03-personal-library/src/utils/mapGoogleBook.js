import { createBookItem } from "./libraryActions";

export function mapGoogleBook(volume) {
  const info = volume.volumeInfo ?? {};
  const authors = Array.isArray(info.authors) ? info.authors.join(", ") : "Unknown author";

  return createBookItem({
    id: volume.id,
    title: info.title ?? "Untitled",
    author: authors,
    thumbnail: info.imageLinks?.thumbnail?.replace("http:", "https:") ?? "",
    description: info.description ?? "No description available.",
    genre: info.categories?.[0] ?? "",
  });
}
