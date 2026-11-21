import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import { PersonCard, useMovieCredits, type Credit } from "@/entities/person";
import { buttonClass, EmptyState } from "@/shared/ui";

const KEY_JOBS = [
  "Director",
  "Screenplay",
  "Writer",
  "Novel",
  "Story",
  "Producer",
  "Director of Photography",
  "Original Music Composer",
  "Editor",
  "Executive Producer",
  "Production Design",
  "Costume Design",
  "Casting",
];
const DEPARTMENT_ORDER = ["Directing", "Writing", "Production", "Camera", "Editing", "Sound"];
const INITIAL_COUNT = 12;

const indexOr = (list: string[], value = "", fallback = list.length) => {
  const i = list.indexOf(value);
  return i === -1 ? fallback : i;
};

const mergeCrew = (crew: Credit[]) => {
  const byPerson = new Map<number, Credit & { jobs: string[] }>();
  crew.forEach((c) => {
    const existing = byPerson.get(c.id);
    if (existing) existing.jobs.push(c.job ?? "");
    else byPerson.set(c.id, { ...c, jobs: [c.job ?? ""] });
  });

  const score = (c: Credit & { jobs: string[] }) => {
    const job = Math.min(...c.jobs.map((j) => indexOr(KEY_JOBS, j, 99)));
    if (job < 99) return job;
    return 100 + (c.profile_path ? 0 : 50) + indexOr(DEPARTMENT_ORDER, c.department);
  };

  return [...byPerson.values()].sort((a, b) => score(a) - score(b));
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
    if (type === "cast") return data.cast.map((c) => ({ ...c, role: c.character }));
    return mergeCrew(data.crew).map((c) => ({
      ...c,
      role: c.jobs
        .filter(Boolean)
        .map((job) => t(`jobs.${job}`, { defaultValue: job }))
        .join(", "),
    }));
  }, [data, type, t]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="aspect-[2/3] animate-pulse border-2 border-line bg-raised" />
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
      <ul className="grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 md:grid-cols-6">
        {visible.map((p, i) => (
          <li key={p.credit_id}>
            <PersonCard
              id={p.id}
              name={p.name}
              profilePath={p.profile_path}
              role={p.role}
              index={i % INITIAL_COUNT}
            />
          </li>
        ))}
      </ul>
      {people.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className={buttonClass("ghost")}
          >
            {showAll ? t("common.showLess") : t("common.showAll", { count: people.length })}
          </button>
        </div>
      )}
    </div>
  );
});
