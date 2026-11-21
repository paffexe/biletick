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
      <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-canvas/90 backdrop-blur-xl">
        <div className="shell flex h-16 items-center gap-6 lg:h-[72px]">
          <Logo />

          <nav className="hidden self-stretch md:block md:flex-1" aria-label={t("nav.label")}>
            <ul className="flex h-full items-stretch justify-center">
              {NAV_ITEMS.map(({ to, labelKey, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        "group relative flex h-full items-center gap-2 px-4 text-sm font-bold tracking-wide uppercase transition-colors lg:px-5",
                        isActive ? "text-ink" : "text-muted hover:text-ink",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t(labelKey)}
                        {to === "/saved" && <SavedBadge />}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-3 -bottom-[3px] h-[5px] origin-left bg-accent transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.2,1)]",
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-hover:bg-ink",
                          )}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center md:ml-0">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              to="/login"
              aria-label={t("nav.login")}
              title={t("nav.login")}
              className="grid size-10 place-items-center transition-colors hover:bg-ink hover:text-canvas"
            >
              <UserRound className="size-5" />
            </Link>
          </div>
        </div>
      </header>

      <nav
        aria-label={t("nav.label")}
        className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-ink bg-canvas pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="grid grid-cols-4 divide-x-2 divide-ink">
          {NAV_ITEMS.map(({ to, labelKey, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "flex h-16 flex-col items-center justify-center gap-1 text-[10px] font-bold tracking-wide uppercase transition-colors duration-200",
                    isActive ? "bg-ink text-canvas" : "text-muted active:bg-raised",
                  )
                }
              >
                <span className="relative">
                  <Icon className="size-[22px]" strokeWidth={2.25} />
                  {to === "/saved" && <SavedBadge className="absolute -top-1.5 -right-3" />}
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
