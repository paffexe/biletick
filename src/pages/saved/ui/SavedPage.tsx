import { Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Bookmark, Trash2 } from "lucide-react";
import { clearBookmarks, selectBookmarks } from "@/features/bookmark";
import { ButtonLink, EmptyState } from "@/shared/ui";
import { MovieGrid } from "@/widgets/movie-grid";

export const SavedPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const movies = useSelector(selectBookmarks);

  return (
    <div className="shell pt-8 sm:pt-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {t("saved.title")}
          </h1>
          {movies.length > 0 && (
            <p className="mt-1 text-sm text-muted">{t("saved.count", { count: movies.length })}</p>
          )}
        </div>
        {movies.length > 0 && (
          <Popconfirm
            title={t("saved.clearConfirm")}
            okText={t("saved.clearOk")}
            cancelText={t("common.cancel")}
            okButtonProps={{ danger: true }}
            onConfirm={() => dispatch(clearBookmarks())}
          >
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted transition-colors hover:bg-raised hover:text-ink"
            >
              <Trash2 className="size-4" />
              {t("saved.clear")}
            </button>
          </Popconfirm>
        )}
      </div>

      {movies.length ? (
        <MovieGrid movies={movies} />
      ) : (
        <EmptyState
          icon={Bookmark}
          title={t("saved.emptyTitle")}
          description={t("saved.emptyDesc")}
          action={<ButtonLink to="/movie">{t("saved.browse")}</ButtonLink>}
        />
      )}
    </div>
  );
};
