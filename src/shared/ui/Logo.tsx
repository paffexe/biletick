import { Link } from "react-router-dom";
import logo from "../assets/brand/logo.svg";
import { cn } from "../lib";

export const Logo = ({ className }: { className?: string }) => (
  <Link to="/" aria-label="Biletick" className={cn("inline-flex shrink-0", className)}>
    <img src={logo} alt="Biletick" width={112} height={36} className="h-8 w-auto sm:h-9" />
  </Link>
);
