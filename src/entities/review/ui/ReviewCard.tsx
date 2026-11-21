import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDate, tmdbImage } from "@/shared/lib";
import { Rating } from "@/shared/ui";
import type { Review } from "../model/types";

const PREVIEW_LENGTH = 420;

export const ReviewCard = memo(({ review }: { review: Review }) => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const avatar = tmdbImage(review.author_details.avatar_path, "w92");
  const isLong = review.content.length > PREVIEW_LENGTH;
  const text =
    expanded || !isLong ? review.content : `${review.content.slice(0, PREVIEW_LENGTH).trimEnd()}…`;

  return (
    <article className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <header className="flex items-center gap-3">
        {avatar && !avatarFailed ? (
          <img
            src={avatar}
            alt=""
            loading="lazy"
            onError={() => setAvatarFailed(true)}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-11 place-items-center rounded-full bg-raised font-display text-sm font-semibold uppercase text-muted">
            {review.author.charAt(0)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{review.author}</h3>
          <p className="text-xs text-muted">{formatDate(review.created_at, i18n.language)}</p>
        </div>
        <Rating value={review.author_details.rating} />
      </header>

      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/85 sm:text-[15px]">
        {text}
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
        >
          {expanded ? t("common.showLess") : t("common.readMore")}
        </button>
      )}
    </article>
  );
});
