import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "@/entities/movie";
import { useDebounce } from "@/shared/lib";

export const useMovieSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const query = useDebounce(value.trim(), 450);
  const page = Number(searchParams.get("page") ?? 1);

  useEffect(() => {
    if ((searchParams.get("q") ?? "") === query) return;
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    setSearchParams(next, { replace: true });
  }, [query, searchParams, setSearchParams]);

  const result = useSearchMovies(query, page);

  return { value, setValue, query, ...result };
};
