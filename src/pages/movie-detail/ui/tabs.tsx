import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MessageSquareText } from "lucide-react";
import { ReviewCard, useMovieReviews } from "@/entities/review";
import { EmptyState } from "@/shared/ui";
import { CreditsGrid } from "@/widgets/credits-grid";

export const ReviewsTab = () => {
  const { id = "" } = useParams();
  const { t } = useTranslation();
  const { data, isLoading } = useMovieReviews(id);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-raised" />
        ))}
      </div>
    );
  }

  if (!data?.results.length) {
    return (
      <EmptyState
        icon={MessageSquareText}
        title={t("movie.noReviews")}
        description={t("movie.noReviewsDesc")}
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
      {data.results.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export const CastTab = () => {
  const { id = "" } = useParams();
  return <CreditsGrid movieId={id} type="cast" />;
};

export const CrewTab = () => {
  const { id = "" } = useParams();
  return <CreditsGrid movieId={id} type="crew" />;
};
