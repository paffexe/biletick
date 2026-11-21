import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRound } from "lucide-react";
import { usePerson, usePersonFilmography } from "@/entities/person";
import { EmptyState, PageLoader, SectionHeading } from "@/shared/ui";
import { MovieGrid } from "@/widgets/movie-grid";
import { PersonProfile } from "@/widgets/person-profile";

export const PersonPage = () => {
  const { id = "" } = useParams();
  const { t } = useTranslation();
  const { data: person, isLoading, isError } = usePerson(id);
  const filmography = usePersonFilmography(id);

  if (isLoading) return <PageLoader />;
  if (isError || !person) return <EmptyState icon={UserRound} title={t("person.notFound")} />;

  return (
    <>
      <PersonProfile person={person} />
      {(filmography.isLoading || !!filmography.data?.length) && (
        <section className="shell mt-16 lg:mt-20">
          <SectionHeading title={t("person.filmography")} />
          <MovieGrid movies={filmography.data} loading={filmography.isLoading} />
        </section>
      )}
    </>
  );
};
