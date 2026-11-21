import { useTranslation } from "react-i18next";
import { useMovieList } from "@/entities/movie";
import { ButtonLink, Reveal, SectionHeading } from "@/shared/ui";
import { MovieGrid } from "@/widgets/movie-grid";
import { MovieRail } from "@/widgets/movie-rail";
import { NowShowing } from "@/widgets/now-showing";

export const HomePage = () => {
  const { t } = useTranslation();
  const popular = useMovieList("popular");
  const topRated = useMovieList("top_rated");
  const upcoming = useMovieList("upcoming");

  const seeAll = (to: string) => (
    <ButtonLink to={to} variant="text" className="shrink-0 text-xs">
      {t("common.seeAll")}
    </ButtonLink>
  );

  return (
    <>
      <NowShowing />
      <div className="shell space-y-20 pt-14 sm:pt-20 lg:space-y-28">
        <Reveal>
          <SectionHeading title={t("home.popular")} action={seeAll("/movie")} />
          <MovieGrid movies={popular.data?.results.slice(0, 10)} loading={popular.isLoading} />
        </Reveal>
        <MovieRail
          title={t("home.topRated")}
          action={seeAll("/movie?sort=vote_average.desc")}
          movies={topRated.data?.results}
          loading={topRated.isLoading}
        />
        <MovieRail
          title={t("home.upcoming")}
          movies={upcoming.data?.results}
          loading={upcoming.isLoading}
        />
      </div>
    </>
  );
};
