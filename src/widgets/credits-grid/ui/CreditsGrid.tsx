import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import { PersonCard, useMovieCredits, type Credit } from "@/entities/person";
import { EmptyState } from "@/shared/ui";

const DEPARTMENT_ORDER = ["Directing", "Writing", "Production", "Camera", "Editing", "Sound"];
const INITIAL_COUNT = 18;

const mergeCrew = (crew: Credit[]) => {
  const byPerson = new Map<number, Credit & { jobs: string[] }>();
  crew.forEach((c) => {
    const existing = byPerson.get(c.id);
    if (existing) existing.jobs.push(c.job ?? "");
    else byPerson.set(c.id, { ...c, jobs: [c.job ?? ""] });
  });
  const rank = (d?: string) => {
    const i = DEPARTMENT_ORDER.indexOf(d ?? "");
    return i === -1 ? DEPARTMENT_ORDER.length : i;
  };
  return [...byPerson.values()]
    .sort((a, b) => rank(a.department) - rank(b.department))
    .map((c) => ({ ...c, role: c.jobs.filter(Boolean).join(", ") }));
};

interface Props {
  movieId: string;
  type: "cast" | "crew";
}

export const CreditsGrid = memo(({ movieId, type }: Props) => {
  const { t } = useTranslation();
  const { data, isLoading } = useMovieCredits(movieId);
  const [showAll, setShowAll] = useState(false);

  const people = useMemo(() => {
    if (!data) return [];
    return type === "cast"
      ? data.cast.map((c) => ({ ...c, role: c.character }))
      : mergeCrew(data.crew);
  }, [data, type]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-raised" />
        ))}
      </div>
    );
  }

  if (!people.length) {
    return <EmptyState icon={Users} title={t(type === "cast" ? "movie.noCast" : "movie.noCrew")} />;
  }

  const visible = showAll ? people : people.slice(0, INITIAL_COUNT);

  return (
    <div>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 md:grid-cols-6">
        {visible.map((p) => (
          <li key={p.credit_id}>
            <PersonCard id={p.id} name={p.name} profilePath={p.profile_path} role={p.role} />
          </li>
        ))}
      </ul>
      {people.length > INITIAL_COUNT && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="h-11 rounded-full border border-line px-6 text-sm font-semibold transition-colors hover:bg-raised"
          >
            {showAll ? t("common.showLess") : t("common.showAll", { count: people.length })}
          </button>
        </div>
      )}
    </div>
  );
});
