import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { buttonClass, type ButtonVariant } from "./buttonClass";

interface Props extends LinkProps {
  variant?: ButtonVariant;
  children: ReactNode;
}

export const ButtonLink = ({ variant, className, ...rest }: Props) => (
  <Link className={buttonClass(variant, className)} {...rest} />
);
