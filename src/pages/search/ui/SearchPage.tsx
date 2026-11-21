import { useTranslation } from "react-i18next";
import { SearchX, TextSearch } from "lucide-react";
import { MoviePagination } from "@/features/movie-pagination";
import { SearchField, useMovieSearch } from "@/features/search-movie";
import { cn } from "@/shared/lib";
import { EmptyState } from "@/shared/ui";
import { MovieGrid } from "@/widgets/movie-grid";

export const SearchPage = () => {
  const { t } = useTranslation();
  const { value, setValue, query, data, isFetching, isLoading, isPlaceholderData } =
    useMovieSearch();

  return (
    <div className="shell pt-10 sm:pt-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="sr-only">{t("nav.search")}</h1>
        <SearchField value={value} onChange={setValue} loading={isFetching} />
      </div>

      <div className={cn("mt-12 transition-opacity", isPlaceholderData && "opacity-50")}>
        {!query ? (
          <EmptyState
            icon={TextSearch}
            title={t("search.startTitle")}
            description={t("search.startDesc")}
          />
        ) : data && !data.results.length ? (
          <EmptyState
            icon={SearchX}
            title={t("search.emptyTitle", { query })}
            description={t("search.emptyDesc")}
          />
        ) : (
          <>
            {data && (
              <p className="mb-7 border-b-[3px] border-ink pb-3 font-mono text-xs font-bold text-muted uppercase">
                {t("search.results", { count: data.total_results })}
              </p>
            )}
            <MovieGrid key={query} movies={data?.results} loading={isLoading} />
            <MoviePagination totalResults={data?.total_results} />
          </>
        )}
      </div>
    </div>
  );
};
