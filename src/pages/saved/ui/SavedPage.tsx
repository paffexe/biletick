import { Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Bookmark } from "lucide-react";
import { clearBookmarks, selectBookmarks } from "@/features/bookmark";
import { buttonClass, ButtonLink, EmptyState, PageTitle } from "@/shared/ui";
import { MovieGrid } from "@/widgets/movie-grid";

export const SavedPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const movies = useSelector(selectBookmarks);

  return (
    <div className="shell pt-10 sm:pt-14">
      <PageTitle
        title={t("saved.title")}
        meta={movies.length > 0 && t("saved.count", { count: movies.length })}
        action={
          movies.length > 0 && (
            <Popconfirm
              title={t("saved.clearConfirm")}
              okText={t("saved.clearOk")}
              cancelText={t("common.cancel")}
              okButtonProps={{ danger: true }}
              onConfirm={() => dispatch(clearBookmarks())}
            >
              <button type="button" className={buttonClass("text", "text-xs")}>
                {t("saved.clear")}
              </button>
            </Popconfirm>
          )
        }
      />

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
