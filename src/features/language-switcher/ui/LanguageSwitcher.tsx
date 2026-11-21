import { memo } from "react";
import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { Check, Languages } from "lucide-react";
import { LANGUAGES } from "@/shared/config";

export const LanguageSwitcher = memo(() => {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage ?? "uz";

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{
        selectable: true,
        selectedKeys: [current],
        onClick: ({ key }) => i18n.changeLanguage(key),
        items: LANGUAGES.map(({ code, label }) => ({
          key: code,
          label: (
            <span className="flex min-w-32 items-center justify-between gap-4 font-semibold">
              {label}
              {code === current && <Check className="size-4" />}
            </span>
          ),
        })),
      }}
    >
      <button
        type="button"
        aria-label={t("header.language")}
        className="flex h-10 items-center gap-1.5 px-2.5 font-mono text-sm font-bold uppercase transition-colors hover:bg-ink hover:text-canvas"
      >
        <Languages className="size-[18px]" />
        {current}
      </button>
    </Dropdown>
  );
});
