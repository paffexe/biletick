import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExternalLink, Phone } from "lucide-react";
import { Logo } from "@/shared/ui";
import appStore from "@/shared/assets/brand/app-store.svg";
import googlePlay from "@/shared/assets/brand/google-play.svg";

const LINKS = [
  { to: "/", key: "nav.home" },
  { to: "/movie", key: "nav.movies" },
  { to: "/saved", key: "nav.saved" },
  { to: "/search", key: "nav.search" },
];

export const Footer = memo(() => {
  const { t } = useTranslation();

  return (
    <footer className="mt-20 border-t border-line pb-20 md:pb-0">
      <div className="shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:py-16">
        <div className="space-y-5 sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm text-muted">{t("footer.tagline")}</p>
          <div className="flex gap-3">
            <img src={appStore} alt="App Store" className="h-10 w-auto" loading="lazy" />
            <img src={googlePlay} alt="Google Play" className="h-10 w-auto" loading="lazy" />
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-semibold">{t("footer.explore")}</h2>
          <ul className="space-y-2.5 text-sm">
            {LINKS.map(({ to, key }) => (
              <li key={to}>
                <Link to={to} className="text-muted transition-colors hover:text-ink">
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-semibold">{t("footer.contact")}</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="tel:+998910122077"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <Phone className="size-4" />
                +998 (91) 012-20-77
              </a>
            </li>
            <li>
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <ExternalLink className="size-4" />
                {t("footer.data")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/60">
        <p className="shell py-5 text-xs text-muted">
          © {new Date().getFullYear()} Biletick. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
});
