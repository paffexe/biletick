import { Bookmark, Clapperboard, House, Search, type LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  labelKey: string;
  icon: LucideIcon;
  end?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", labelKey: "nav.home", icon: House, end: true },
  { to: "/movie", labelKey: "nav.movies", icon: Clapperboard },
  { to: "/saved", labelKey: "nav.saved", icon: Bookmark },
  { to: "/search", labelKey: "nav.search", icon: Search },
];
