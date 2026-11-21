import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Film } from "lucide-react";
import { useMovieDetails, useMovieRecommendations } from "@/entities/movie";
import { cn } from "@/shared/lib";
import { ButtonLink, EmptyState, PageLoader, Reveal } from "@/shared/ui";
import { MovieGallery, MovieOverview } from "@/widgets/movie-overview";
import { MovieRail } from "@/widgets/movie-rail";

const TABS = [
  { to: "", labelKey: "movie.reviews", end: true },
  { to: "cast", labelKey: "movie.cast" },
  { to: "crew", labelKey: "movie.crew" },
];

export const MovieDetailPage = () => {
  const { id = "" } = useParams();
  const { pathname } = useLocation();
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

      <div className="shell mt-20 space-y-20 lg:mt-28 lg:space-y-28">
        <MovieGallery movieId={id} />

        <Reveal>
          <nav className="mb-9 border-b-[3px] border-ink">
            <ul className="flex overflow-x-auto no-scrollbar">
              {TABS.map(({ to, labelKey, end }) => (
                <li key={labelKey}>
                  <NavLink
                    to={to}
                    end={end}
                    replace
                    preventScrollReset
                    className={({ isActive }) =>
                      cn(
                        "flex h-12 items-center px-4 font-display text-sm font-bold whitespace-nowrap uppercase transition-colors duration-200 sm:px-6 sm:text-base",
                        isActive ? "bg-ink text-canvas" : "text-muted hover:bg-raised hover:text-ink",
                      )
                    }
                  >
                    {t(labelKey)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div key={pathname} className="page-in">
            <Outlet />
          </div>
        </Reveal>

        <MovieRail key={id} title={t("movie.similar")} source={recommendations} />
      </div>
    </>
  );
};
