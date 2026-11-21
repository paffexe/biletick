import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

export const THEME_KEY = "theme";

const getInitialMode = (): ThemeMode => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: getInitialMode() },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectThemeMode = (state: { theme: { mode: ThemeMode } }) => state.theme.mode;
