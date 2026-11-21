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
  const Icon = mode === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={label}
      title={label}
      className="group grid size-10 place-items-center transition-colors hover:bg-ink hover:text-canvas"
    >
      <Icon
        key={mode}
        className="size-5 animate-[spin_0.5s_cubic-bezier(0.7,0,0.2,1)_1] motion-reduce:animate-none"
      />
    </button>
  );
});
