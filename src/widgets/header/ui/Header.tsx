import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRound } from "lucide-react";
import { LanguageSwitcher } from "@/features/language-switcher";
import { ThemeToggle } from "@/features/theme";
import { cn } from "@/shared/lib";
import { Logo } from "@/shared/ui";
import { NAV_ITEMS } from "../config/navItems";
import { SavedBadge } from "./SavedBadge";

export const Header = memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/60 bg-canvas/85 backdrop-blur-xl">
        <div className="shell flex h-16 items-center gap-6 lg:h-[72px]">
          <Logo />

          <nav className="hidden md:block md:flex-1" aria-label={t("nav.label")}>
            <ul className="flex items-center justify-center gap-1 lg:gap-2">
              {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        "relative flex h-10 items-center gap-2 rounded-full px-3.5 text-sm font-medium transition-colors lg:px-4",
                        isActive
                          ? "bg-raised text-ink"
                          : "text-ink/65 hover:bg-raised/60 hover:text-ink",
                      )
                    }
                  >
                    <Icon className="size-[18px]" />
                    {t(labelKey)}
                    {to === "/saved" && <SavedBadge />}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 md:ml-0">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to="/login"
              aria-label={t("nav.login")}
              title={t("nav.login")}
              className="grid size-10 place-items-center rounded-full text-ink/80 transition-colors hover:bg-raised hover:text-ink"
            >
              <UserRound className="size-5" />
            </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label={t("nav.label")}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-canvas/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      >
        <ul className="grid grid-cols-4">
          {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                    isActive ? "text-accent-text" : "text-muted",
                  )
                }
              >
                <span className="relative">
                  <Icon className="size-[22px]" />
                  {to === "/saved" && <SavedBadge className="absolute -right-3 -top-1.5" />}
                </span>
                {t(labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
});
