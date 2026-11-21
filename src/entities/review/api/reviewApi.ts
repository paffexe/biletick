import { api, type Paginated } from "@/shared/api";
import type { Review } from "../model/types";

export const reviewApi = {
  byMovie: (movieId: string) =>
    api
      .get<Paginated<Review>>(`movie/${movieId}/reviews`, { params: { language: "en-US" } })
      .then((r) => r.data),
};
