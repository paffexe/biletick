import { memo, type ReactNode } from "react";
import { MovieCard, MovieCardSkeleton, type Movie } from "@/entities/movie";
import { BookmarkButton } from "@/features/bookmark";
import { Carousel } from "@/shared/ui";

export interface MovieRailSource {
  data?: Movie[];
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => unknown;
}

interface Props {
  title: ReactNode;
  action?: ReactNode;
  source: MovieRailSource;
}

export const MovieRail = memo(({ title, action, source }: Props) => {
  const movies = source.data ?? [];

  return (
    <Carousel
      title={title}
      action={action}
      total={movies.length}
      loading={source.isLoading}
      hasMore={source.hasNextPage}
      loadingMore={source.isFetchingNextPage}
      onLoadMore={source.fetchNextPage}
      itemClassName="w-[42%] shrink-0 snap-start sm:w-[30%] md:w-[23%] lg:w-[18.4%]"
      skeleton={<MovieCardSkeleton />}
      getKey={(i) => movies[i].id}
      renderItem={(i, stagger) => (
        <MovieCard
          movie={movies[i]}
          index={stagger}
          action={<BookmarkButton movie={movies[i]} />}
        />
      )}
    />
  );
});
