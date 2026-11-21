import { useTranslation } from "react-i18next";
import { Film, TriangleAlert } from "lucide-react";
import { useDiscoverMovies } from "@/entities/movie";
import { MovieFilters, useMovieFilters } from "@/features/movie-filters";
import { MoviePagination } from "@/features/movie-pagination";
import { cn, formatNumber } from "@/shared/lib";
import { buttonClass, EmptyState, PageTitle } from "@/shared/ui";
import { MovieGrid } from "@/widgets/movie-grid";

export const MoviesPage = () => {
  const { t, i18n } = useTranslation();
  const { params, reset } = useMovieFilters();
  const { data, isLoading, isError, isPlaceholderData, refetch } = useDiscoverMovies(params);

  return (
    <div className="shell pt-10 sm:pt-14">
      <PageTitle
        title={t("movies.title")}
        meta={
          data &&
          t("movies.count", {
            count: data.total_results,
            formatted: formatNumber(data.total_results, i18n.language),
          })
        }
      />

      <MovieFilters />

      <div className={cn("mt-10 transition-opacity", isPlaceholderData && "opacity-50")}>
        {isError ? (
          <EmptyState
            icon={TriangleAlert}
            title={t("error.title")}
            description={t("error.desc")}
            action={
              <button type="button" onClick={() => refetch()} className={buttonClass()}>
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
              <button type="button" onClick={reset} className={buttonClass("ghost")}>
                {t("movies.reset")}
              </button>
            }
          />
        ) : (
          <MovieGrid
            key={JSON.stringify(params)}
            movies={data?.results}
            loading={isLoading}
            skeletonCount={20}
          />
        )}
      </div>

      <MoviePagination totalResults={data?.total_results} />
    </div>
  );
};
