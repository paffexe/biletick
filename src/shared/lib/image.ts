import { TMDB_IMAGE_URL } from "../config";

export type ImageSize = "w92" | "w185" | "w342" | "w500" | "w780" | "w1280" | "original";

export const tmdbImage = (path?: string | null, size: ImageSize = "w500") => {
  if (!path) return undefined;
  if (path.startsWith("/http")) return path.slice(1);
  return `${TMDB_IMAGE_URL}/${size}${path}`;
};
