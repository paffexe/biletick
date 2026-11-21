import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, UserRound } from "lucide-react";
import type { Person } from "@/entities/person";
import { formatDate, getAge } from "@/shared/lib";
import { buttonClass, Poster, SplitText } from "@/shared/ui";

const BIO_PREVIEW = 700;

export const PersonProfile = memo(({ person }: { person: Person }) => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const bio = person.biography?.trim();
  const isLong = (bio?.length ?? 0) > BIO_PREVIEW;
  const lang = i18n.language;

  const facts = [
    {
      label: t("person.knownFor"),
      value: person.known_for_department
        ? t(`departments.${person.known_for_department}`, {
            defaultValue: person.known_for_department,
          })
        : "",
    },
    {
      label: t("person.born"),
      value: person.birthday
        ? `${formatDate(person.birthday, lang)}${
            person.deathday ? "" : ` (${t("person.age", { age: getAge(person.birthday) })})`
          }`
        : "",
    },
    {
      label: t("person.died"),
      value: person.deathday
        ? `${formatDate(person.deathday, lang)} (${t("person.age", {
            age: getAge(person.birthday ?? person.deathday, person.deathday),
          })})`
        : "",
    },
    { label: t("person.birthplace"), value: person.place_of_birth },
  ].filter((f) => f.value);

  return (
    <section className="shell grid gap-8 pt-8 sm:grid-cols-[200px_1fr] sm:pt-12 md:grid-cols-[260px_1fr] lg:gap-14">
      <div className="card-in mx-auto w-48 self-start border-[3px] border-ink shadow-hard-lg sm:mx-0 sm:w-full">
        <Poster path={person.profile_path} alt={person.name} size="w500" eager fallbackIcon={UserRound} />
      </div>

      <div>
        <h1 className="font-display text-3xl leading-[1.05] font-extrabold tracking-tight uppercase lg:text-5xl">
          <SplitText text={person.name} />
        </h1>

        <dl className="page-in mt-7 grid gap-px border-2 border-ink bg-ink sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.label} className="bg-surface p-4">
              <dt className="text-xs font-bold text-muted uppercase">{f.label}</dt>
              <dd className="mt-1.5 text-sm font-bold">{f.value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 font-display text-lg font-bold uppercase">{t("person.biography")}</h2>
        <p className="mt-3 max-w-[70ch] text-[15px] leading-relaxed whitespace-pre-line text-ink/85">
          {!bio
            ? t("person.noBiography")
            : expanded || !isLong
              ? bio
              : `${bio.slice(0, BIO_PREVIEW).trimEnd()}…`}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className={buttonClass("text")}
            >
              {expanded ? t("common.showLess") : t("common.readMore")}
            </button>
          )}
          {person.homepage && (
            <a href={person.homepage} target="_blank" rel="noreferrer" className={buttonClass("ghost")}>
              {t("movie.homepage")}
              <ArrowUpRight className="size-[18px]" strokeWidth={2.5} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
});
