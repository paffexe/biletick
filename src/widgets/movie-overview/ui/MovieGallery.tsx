import { memo, type CSSProperties } from "react";
import { Image } from "antd";
import { useTranslation } from "react-i18next";
import { useMovieImages } from "@/entities/movie";
import { tmdbImage } from "@/shared/lib";
import { Carousel } from "@/shared/ui";

export const MovieGallery = memo(({ movieId }: { movieId: string }) => {
  const { t } = useTranslation();
  const { data, isLoading } = useMovieImages(movieId);
  const stills = data?.backdrops ?? [];

  return (
    <Image.PreviewGroup>
      <Carousel
        title={
          <>
            {t("movie.gallery")}
            {stills.length > 0 && (
              <span className="ml-3 align-middle font-mono text-sm text-muted">{stills.length}</span>
            )}
          </>
        }
        total={stills.length}
        loading={isLoading}
        initial={4}
        itemClassName="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
        skeleton={<div className="aspect-video animate-pulse border-2 border-line bg-raised" />}
        getKey={(i) => stills[i].file_path}
        renderItem={(i, stagger) => (
          <div
            className="card-in overflow-hidden border-2 border-ink shadow-hard-sm"
            style={{ "--i": stagger } as CSSProperties}
          >
            <Image
              src={tmdbImage(stills[i].file_path, "w780")}
              preview={{ src: tmdbImage(stills[i].file_path, "original"), mask: false }}
              alt=""
              width="100%"
              className="aspect-video object-cover transition duration-500 hover:scale-[1.04]"
            />
          </div>
        )}
      />
    </Image.PreviewGroup>
  );
});
