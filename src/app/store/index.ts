import { configureStore } from "@reduxjs/toolkit";
import { AUTH_KEY, authSlice } from "@/features/auth";
import { BOOKMARKS_KEY, bookmarksSlice } from "@/features/bookmark";
import { THEME_KEY, themeSlice } from "@/features/theme";
import { writeStorage } from "@/shared/lib";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    bookmarks: bookmarksSlice.reducer,
    theme: themeSlice.reducer,
  },
});

let previous = store.getState();
store.subscribe(() => {
  const state = store.getState();
  if (state.auth !== previous.auth) writeStorage(AUTH_KEY, state.auth.user);
  if (state.bookmarks !== previous.bookmarks) writeStorage(BOOKMARKS_KEY, state.bookmarks.items);
  if (state.theme !== previous.theme) localStorage.setItem(THEME_KEY, state.theme.mode);
  previous = state;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
