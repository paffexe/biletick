import { useTranslation } from "react-i18next";
import { MapPinOff } from "lucide-react";
import { ButtonLink, EmptyState } from "@/shared/ui";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <EmptyState
      icon={MapPinOff}
      title={t("notFound.title")}
      description={t("notFound.desc")}
      action={<ButtonLink to="/">{t("notFound.home")}</ButtonLink>}
      className="min-h-[60svh] justify-center"
    />
  );
};
