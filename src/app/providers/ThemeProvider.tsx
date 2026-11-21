import { useEffect, useMemo, type ReactNode } from "react";
import { App as AntApp, ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import { selectThemeMode } from "@/features/theme";

const shared = {
  colorPrimary: "#C61F1F",
  colorInfo: "#C61F1F",
  borderRadius: 12,
  fontFamily: '"Onest", ui-sans-serif, system-ui, sans-serif',
  fontSize: 14,
};

const palettes = {
  light: {
    algorithm: theme.defaultAlgorithm,
    token: {
      ...shared,
      colorBgBase: "#F4F2F5",
      colorBgContainer: "#FFFFFF",
      colorBgElevated: "#FFFFFF",
      colorBorder: "#DCD5E0",
      colorText: "#1E1623",
      colorTextSecondary: "#675E6C",
    },
  },
  dark: {
    algorithm: theme.darkAlgorithm,
    token: {
      ...shared,
      colorBgBase: "#1B1420",
      colorBgContainer: "#241B2A",
      colorBgElevated: "#2F2536",
      colorBorder: "#3B3043",
      colorText: "#EEE8E4",
      colorTextSecondary: "#A69BAA",
    },
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const mode = useSelector(selectThemeMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const config = useMemo(
    () => ({
      ...palettes[mode],
      components: {
        Select: { optionSelectedBg: mode === "dark" ? "#3B3043" : "#EFE9F2" },
        Pagination: { itemActiveBg: "transparent" },
      },
    }),
    [mode],
  );

  return (
    <ConfigProvider theme={config}>
      <AntApp component={false}>{children}</AntApp>
    </ConfigProvider>
  );
};
