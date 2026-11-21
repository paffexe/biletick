import { memo } from "react";
import { MovieCard, MovieCardSkeleton, type Movie } from "@/entities/movie";
import { BookmarkButton } from "@/features/bookmark";
import { cn } from "@/shared/lib";

interface Props {
  movies?: Movie[];
  loading?: boolean;
  skeletonCount?: number;
  className?: string;
}

export const MovieGrid = memo(({ movies, loading, skeletonCount = 10, className }: Props) => (
  <div
    className={cn(
      "grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5",
      className,
    )}
  >
    {loading && !movies
      ? Array.from({ length: skeletonCount }, (_, i) => <MovieCardSkeleton key={i} />)
      : movies?.map((movie, i) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            index={i}
            action={<BookmarkButton movie={movie} />}
          />
        ))}
  </div>
));
