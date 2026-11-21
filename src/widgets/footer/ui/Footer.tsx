import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "@/shared/ui";

const LINKS = [
  { to: "/", key: "nav.home" },
  { to: "/movie", key: "nav.movies" },
  { to: "/saved", key: "nav.saved" },
  { to: "/search", key: "nav.search" },
];

export const Footer = memo(() => {
  const { t } = useTranslation();

  return (
    <footer className="mt-24 border-t-[3px] border-ink pb-20 md:pb-0">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.5fr_1fr] lg:py-16">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm text-muted">{t("footer.tagline")}</p>
          <a
            href="tel:+998910122077"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold hover:text-accent-text"
          >
            <Phone className="size-4" />
            +998 91 012 20 77
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 self-end text-sm font-bold uppercase">
          {LINKS.map(({ to, key }) => (
            <li key={to}>
              <Link to={to} className="group inline-flex items-center gap-1 hover:text-accent-text">
                {t(key)}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t-2 border-ink">
        <div className="shell flex flex-wrap justify-between gap-2 py-4 font-mono text-xs text-muted">
          <span>
            © {new Date().getFullYear()} Biletick. {t("footer.rights")}
          </span>
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="hover:text-ink">
            {t("footer.data")}
          </a>
        </div>
      </div>
    </footer>
  );
});
