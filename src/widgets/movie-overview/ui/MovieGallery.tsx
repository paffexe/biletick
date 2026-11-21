import { memo } from "react";
import { Image } from "antd";
import { useTranslation } from "react-i18next";
import { useMovieImages } from "@/entities/movie";
import { tmdbImage } from "@/shared/lib";
import { Reveal, SectionHeading } from "@/shared/ui";

export const MovieGallery = memo(({ movieId }: { movieId: string }) => {
  const { t } = useTranslation();
  const { data } = useMovieImages(movieId);
  const stills = data?.backdrops.slice(0, 12) ?? [];

  if (!stills.length) return null;

  return (
    <Reveal>
      <SectionHeading title={t("movie.gallery")} />
      <Image.PreviewGroup>
        <ul className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 no-scrollbar sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
          {stills.map((img) => (
            <li
              key={img.file_path}
              className="w-[78%] shrink-0 snap-start overflow-hidden border-2 border-ink shadow-hard-sm sm:w-[46%] lg:w-[31.5%]"
            >
              <Image
                src={tmdbImage(img.file_path, "w780")}
                preview={{ src: tmdbImage(img.file_path, "original"), mask: false }}
                alt=""
                width="100%"
                className="aspect-video object-cover transition duration-500 hover:scale-[1.04]"
              />
            </li>
          ))}
        </ul>
      </Image.PreviewGroup>
    </Reveal>
  );
});
