import { memo, type ReactNode } from "react";
import { MovieCard, MovieCardSkeleton, type Movie } from "@/entities/movie";
import { BookmarkButton } from "@/features/bookmark";
import { Reveal, SectionHeading } from "@/shared/ui";

interface Props {
  title: ReactNode;
  action?: ReactNode;
  movies?: Movie[];
  loading?: boolean;
}

const itemClass = "w-[42%] shrink-0 snap-start pt-1 sm:w-[30%] md:w-[23%] lg:w-[18.4%]";

export const MovieRail = memo(({ title, action, movies, loading }: Props) => {
  if (!loading && !movies?.length) return null;

  return (
    <Reveal>
      <SectionHeading title={title} action={action} />
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 no-scrollbar sm:-mx-6 sm:scroll-px-6 sm:gap-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0">
        {loading && !movies
          ? Array.from({ length: 6 }, (_, i) => (
              <li key={i} className={itemClass}>
                <MovieCardSkeleton />
              </li>
            ))
          : movies?.map((movie, i) => (
              <li key={movie.id} className={itemClass}>
                <MovieCard movie={movie} index={i} action={<BookmarkButton movie={movie} />} />
              </li>
            ))}
      </ul>
    </Reveal>
  );
});
