import { useTranslation } from "react-i18next";
import { Film, TriangleAlert } from "lucide-react";
import { useDiscoverMovies } from "@/entities/movie";
import { MovieFilters, useMovieFilters } from "@/features/movie-filters";
import { MoviePagination } from "@/features/movie-pagination";
import { cn, formatNumber } from "@/shared/lib";
import { EmptyState } from "@/shared/ui";
import { MovieGrid } from "@/widgets/movie-grid";

export const MoviesPage = () => {
  const { t, i18n } = useTranslation();
  const { params, reset } = useMovieFilters();
  const { data, isLoading, isError, isPlaceholderData, refetch } = useDiscoverMovies(params);

  return (
    <div className="shell pt-8 sm:pt-12">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          {t("movies.title")}
        </h1>
        {data && (
          <p className="text-sm text-muted">
            {t("movies.count", {
              count: data.total_results,
              formatted: formatNumber(data.total_results, i18n.language),
            })}
          </p>
        )}
      </div>

      <MovieFilters />

      <div className={cn("mt-8 transition-opacity", isPlaceholderData && "opacity-60")}>
        {isError ? (
          <EmptyState
            icon={TriangleAlert}
            title={t("error.title")}
            description={t("error.desc")}
            action={
              <button
                type="button"
                onClick={() => refetch()}
                className="h-11 rounded-full bg-accent px-5 text-sm font-semibold text-white"
              >
                {t("error.retry")}
              </button>
            }
          />
        ) : data && !data.results.length ? (
          <EmptyState
            icon={Film}
            title={t("movies.emptyTitle")}
            description={t("movies.emptyDesc")}
            action={
              <button
                type="button"
                onClick={reset}
                className="h-11 rounded-full border border-line px-5 text-sm font-semibold hover:bg-raised"
              >
                {t("movies.reset")}
              </button>
            }
          />
        ) : (
          <MovieGrid movies={data?.results} loading={isLoading} skeletonCount={20} />
        )}
      </div>

      <MoviePagination totalResults={data?.total_results} />
    </div>
  );
};
