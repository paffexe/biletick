import { memo } from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Poster } from "@/shared/ui";

interface Props {
  id: number;
  name: string;
  profilePath: string | null;
  role?: string;
}

export const PersonCard = memo(({ id, name, profilePath, role }: Props) => (
  <Link to={`/person/${id}`} className="group block rounded-xl">
    <Poster
      path={profilePath}
      alt={name}
      size="w185"
      fallbackIcon={UserRound}
      className="rounded-xl ring-1 ring-line/70 transition group-hover:ring-accent/70"
    />
    <h3 className="mt-2.5 line-clamp-1 text-sm font-semibold" title={name}>
      {name}
    </h3>
    {role && <p className="line-clamp-2 text-xs text-muted">{role}</p>}
  </Link>
));
