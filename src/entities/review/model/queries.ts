import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "../api/reviewApi";

export const useMovieReviews = (movieId: string) =>
  useQuery({
    queryKey: ["movie", movieId, "reviews"],
    queryFn: () => reviewApi.byMovie(movieId),
  });
