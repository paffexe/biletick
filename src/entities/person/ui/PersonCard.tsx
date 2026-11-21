import { memo, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Poster } from "@/shared/ui";

interface Props {
  id: number;
  name: string;
  profilePath: string | null;
  role?: string;
  index?: number;
}

export const PersonCard = memo(({ id, name, profilePath, role, index = 0 }: Props) => (
  <Link
    to={`/person/${id}`}
    className="card-in group block"
    style={{ "--i": index } as CSSProperties}
  >
    <div className="border-2 border-ink shadow-hard-sm transition duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-hard-lg">
      <Poster
        path={profilePath}
        alt={name}
        size="w185"
        fallbackIcon={UserRound}
        imgClassName="grayscale-[35%] transition duration-500 group-hover:grayscale-0"
      />
    </div>
    <h3 className="mt-2.5 line-clamp-1 text-sm font-bold" title={name}>
      {name}
    </h3>
    {role && <p className="line-clamp-2 text-xs text-muted">{role}</p>}
  </Link>
));
