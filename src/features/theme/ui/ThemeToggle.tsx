import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";
import { selectThemeMode, toggleTheme } from "../model/slice";

export const ThemeToggle = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mode = useSelector(selectThemeMode);
  const label = mode === "dark" ? t("header.toLight") : t("header.toDark");

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-ink/80 transition-colors hover:bg-raised hover:text-ink"
    >
      {mode === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
});
