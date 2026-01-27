import { useMovie } from "@/entities/movie";
import { MoviePagination } from "@/features/movie-pagination";
import { MovieList } from "@/widgets/movie-list";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import MovieSort from "../../../features/movie-sort";

export const Movie = memo(() => {
  const { useMoviesQuery } = useMovie();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const sort_by = searchParams.get("sort") ?? "popularity.desc";
  const with_genres = searchParams.get("genres") ?? "16";
  const fromDate = searchParams.get("from") ?? "";
  const toDate = searchParams.get("to") ?? "";

  const { data } = useMoviesQuery({
    page,
    sort_by,
    with_genres,
    fromDate,
    toDate,
  });

  console.log(data);

  return (
    <div>
      <div className="container mb-[30px]">
        <div>
          <MovieSort />
        </div>
      </div>
      <MovieList movies={data?.results} />
      <MoviePagination page={page} total_pages={data?.total_pages} />
    </div>
  );
});
