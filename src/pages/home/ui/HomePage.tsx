import { useTranslation } from "react-i18next";
import { useInfiniteMovieList } from "@/entities/movie";
import { ButtonLink } from "@/shared/ui";
import { MovieRail } from "@/widgets/movie-rail";
import { NowShowing } from "@/widgets/now-showing";

export const HomePage = () => {
  const { t } = useTranslation();
  const popular = useInfiniteMovieList("popular");
  const topRated = useInfiniteMovieList("top_rated");
  const upcoming = useInfiniteMovieList("upcoming");

  const seeAll = (to: string) => (
    <ButtonLink to={to} variant="text" className="hidden shrink-0 text-xs sm:inline-flex">
      {t("common.seeAll")}
    </ButtonLink>
  );

  return (
    <>
      <NowShowing />
      <div className="shell space-y-20 pt-14 sm:pt-20 lg:space-y-28">
        <MovieRail title={t("home.popular")} action={seeAll("/movie")} source={popular} />
        <MovieRail
          title={t("home.topRated")}
          action={seeAll("/movie?sort=vote_average.desc")}
          source={topRated}
        />
        <MovieRail title={t("home.upcoming")} source={upcoming} />
      </div>
    </>
  );
};
