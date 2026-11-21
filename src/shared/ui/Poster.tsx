import { useState, type ComponentType } from "react";
import { Clapperboard } from "lucide-react";
import { cn, tmdbImage, type ImageSize } from "../lib";

const ratios = {
  poster: "aspect-[2/3]",
  backdrop: "aspect-video",
  square: "aspect-square",
};

interface Props {
  path?: string | null;
  alt: string;
  size?: ImageSize;
  ratio?: keyof typeof ratios;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  fallbackIcon?: ComponentType<{ className?: string; strokeWidth?: number }>;
}

export const Poster = ({
  path,
  alt,
  size = "w342",
  ratio = "poster",
  className,
  imgClassName,
  eager,
  fallbackIcon: Icon = Clapperboard,
}: Props) => {
  const [failed, setFailed] = useState(false);
  const src = tmdbImage(path, size);

  return (
    <div className={cn("relative overflow-hidden bg-raised", ratios[ratio], className)}>
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("absolute inset-0 size-full object-cover", imgClassName)}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-muted/60">
          <Icon className="size-1/4 max-w-12" strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
};
