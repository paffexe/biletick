import { useTranslation } from "react-i18next";
import { useMovieList } from "@/entities/movie";
import { ButtonLink, SectionHeading } from "@/shared/ui";
import { MovieGrid } from "@/widgets/movie-grid";
import { MovieRail } from "@/widgets/movie-rail";
import { NowShowing } from "@/widgets/now-showing";

export const HomePage = () => {
  const { t } = useTranslation();
  const popular = useMovieList("popular");
  const topRated = useMovieList("top_rated");
  const upcoming = useMovieList("upcoming");

  const seeAll = (to: string) => (
    <ButtonLink to={to} variant="text" className="h-auto">
      {t("common.seeAll")}
    </ButtonLink>
  );

  return (
    <>
      <NowShowing />
      <div className="shell space-y-16 pt-12 sm:pt-16 lg:space-y-20">
        <section>
          <SectionHeading title={t("home.popular")} action={seeAll("/movie")} />
          <MovieGrid movies={popular.data?.results.slice(0, 10)} loading={popular.isLoading} />
        </section>
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
