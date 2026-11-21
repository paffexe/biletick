import { useEffect, useMemo, type ReactNode } from "react";
import { App as AntApp, ConfigProvider, theme } from "antd";
import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";
import uzUZ from "antd/locale/uz_UZ";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectThemeMode } from "@/features/theme";

const ANTD_LOCALES = { en: enUS, ru: ruRU, uz: uzUZ };
const DAYJS_LOCALES = { en: "en", ru: "ru", uz: "uz-latn" };

const palettes = {
  light: {
    algorithm: theme.defaultAlgorithm,
    ink: "#140E18",
    token: {
      colorBgBase: "#F1EFF2",
      colorBgContainer: "#FFFFFF",
      colorBgElevated: "#FFFFFF",
      colorText: "#140E18",
      colorTextSecondary: "#5F5664",
      colorTextPlaceholder: "#7A7180",
    },
  },
  dark: {
    algorithm: theme.darkAlgorithm,
    ink: "#F1EBE6",
    token: {
      colorBgBase: "#1B1420",
      colorBgContainer: "#231A29",
      colorBgElevated: "#2E2435",
      colorText: "#F1EBE6",
      colorTextSecondary: "#A99EAE",
      colorTextPlaceholder: "#8E8394",
    },
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const mode = useSelector(selectThemeMode);
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "uz") as keyof typeof ANTD_LOCALES;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  useEffect(() => {
    dayjs.locale(DAYJS_LOCALES[lang] ?? "en");
  }, [lang]);

  const config = useMemo(() => {
    const { algorithm, ink, token } = palettes[mode];
    return {
      algorithm,
      token: {
        ...token,
        colorPrimary: "#C61F1F",
        colorInfo: "#C61F1F",
        colorBorder: ink,
        colorBorderSecondary: ink,
        lineWidth: 2,
        borderRadius: 0,
        borderRadiusLG: 0,
        borderRadiusSM: 0,
        borderRadiusXS: 0,
        controlHeight: 44,
        controlHeightLG: 48,
        fontFamily: '"Onest", ui-sans-serif, system-ui, sans-serif',
        fontWeightStrong: 700,
        boxShadowSecondary: `5px 5px 0 0 ${ink}`,
        motionDurationMid: "0.18s",
      },
      components: {
        Select: {
          optionSelectedBg: mode === "dark" ? "#43374C" : "#E4DFE7",
          optionSelectedFontWeight: 700,
        },
        Pagination: { itemActiveBg: ink, itemSize: 40 },
        Dropdown: { paddingBlock: 8 },
      },
    };
  }, [mode]);

  return (
    <ConfigProvider theme={config} locale={ANTD_LOCALES[lang] ?? enUS}>
      <AntApp component={false}>{children}</AntApp>
    </ConfigProvider>
  );
};
