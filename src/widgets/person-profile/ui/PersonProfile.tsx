import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, UserRound } from "lucide-react";
import type { Person } from "@/entities/person";
import { formatDate, getAge } from "@/shared/lib";
import { buttonClass, Poster } from "@/shared/ui";

const BIO_PREVIEW = 700;

export const PersonProfile = memo(({ person }: { person: Person }) => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const bio = person.biography?.trim();
  const isLong = (bio?.length ?? 0) > BIO_PREVIEW;

  const facts = [
    { label: t("person.knownFor"), value: person.known_for_department },
    {
      label: t("person.born"),
      value: person.birthday
        ? `${formatDate(person.birthday, i18n.language)}${
            person.deathday ? "" : ` (${t("person.age", { age: getAge(person.birthday) })})`
          }`
        : "",
    },
    {
      label: t("person.died"),
      value: person.deathday
        ? `${formatDate(person.deathday, i18n.language)} (${t("person.age", {
            age: getAge(person.birthday ?? person.deathday, person.deathday),
          })})`
        : "",
    },
    { label: t("person.birthplace"), value: person.place_of_birth },
  ].filter((f) => f.value);

  return (
    <section className="shell grid gap-8 pt-8 sm:grid-cols-[200px_1fr] sm:pt-12 md:grid-cols-[260px_1fr] lg:gap-14">
      <Poster
        path={person.profile_path}
        alt={person.name}
        size="w500"
        eager
        fallbackIcon={UserRound}
        className="mx-auto w-48 rounded-2xl ring-1 ring-line sm:mx-0 sm:w-full"
      />

      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
          {person.name}
        </h1>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-xs text-muted">{f.label}</dt>
              <dd className="mt-1 text-sm font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 font-display text-lg font-semibold">{t("person.biography")}</h2>
        <p className="mt-3 max-w-[70ch] whitespace-pre-line text-[15px] leading-relaxed text-ink/85">
          {!bio
            ? t("person.noBiography")
            : expanded || !isLong
              ? bio
              : `${bio.slice(0, BIO_PREVIEW).trimEnd()}…`}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
            >
              {expanded ? t("common.showLess") : t("common.readMore")}
            </button>
          )}
        </div>
        {person.homepage && (
          <a
            href={person.homepage}
            target="_blank"
            rel="noreferrer"
            className={buttonClass("ghost", "mt-6")}
          >
            <ExternalLink className="size-[18px]" />
            {t("movie.homepage")}
          </a>
        )}
      </div>
    </section>
  );
});
