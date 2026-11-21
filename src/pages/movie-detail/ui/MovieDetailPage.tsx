import { NavLink, Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clapperboard, Film, MessageSquareText, Users } from "lucide-react";
import { useMovieDetails, useMovieRecommendations } from "@/entities/movie";
import { cn } from "@/shared/lib";
import { ButtonLink, EmptyState, PageLoader } from "@/shared/ui";
import { MovieGallery, MovieOverview } from "@/widgets/movie-overview";
import { MovieRail } from "@/widgets/movie-rail";

const TABS = [
  { to: "", labelKey: "movie.reviews", icon: MessageSquareText, end: true },
  { to: "cast", labelKey: "movie.cast", icon: Users },
  { to: "crew", labelKey: "movie.crew", icon: Clapperboard },
];

export const MovieDetailPage = () => {
  const { id = "" } = useParams();
  const { t } = useTranslation();
  const { data: movie, isLoading, isError } = useMovieDetails(id);
  const recommendations = useMovieRecommendations(id);

  if (isLoading) return <PageLoader />;

  if (isError || !movie) {
    return (
      <EmptyState
        icon={Film}
        title={t("movie.notFound")}
        description={t("error.desc")}
        action={<ButtonLink to="/movie">{t("saved.browse")}</ButtonLink>}
      />
    );
  }

  return (
    <>
      <MovieOverview movie={movie} />

      <div className="shell mt-14 space-y-14 lg:mt-20 lg:space-y-20">
        <MovieGallery movieId={id} />

        <section>
          <nav className="mb-8 border-b border-line">
            <ul className="-mb-px flex gap-1 overflow-x-auto no-scrollbar sm:gap-4">
              {TABS.map(({ to, labelKey, icon: Icon, end }) => (
                <li key={labelKey}>
                  <NavLink
                    to={to}
                    end={end}
                    replace
                    preventScrollReset
                    className={({ isActive }) =>
                      cn(
                        "flex h-12 items-center gap-2 border-b-2 px-3 text-sm font-semibold whitespace-nowrap transition-colors sm:text-base",
                        isActive
                          ? "border-accent text-ink"
                          : "border-transparent text-muted hover:text-ink",
                      )
                    }
                  >
                    <Icon className="size-[18px]" />
                    {t(labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Outlet />
        </section>

        <MovieRail
          title={t("movie.similar")}
          movies={recommendations.data?.results.slice(0, 15)}
          loading={recommendations.isLoading}
        />
      </div>
    </>
  );
};
