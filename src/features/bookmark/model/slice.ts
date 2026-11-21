import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "@/entities/movie";
import { readStorage } from "@/shared/lib";

export const BOOKMARKS_KEY = "bookmarks";

export interface BookmarksState {
  items: Movie[];
}

const toBookmark = ({
  id,
  title,
  poster_path,
  backdrop_path,
  vote_average,
  release_date,
}: Movie): Movie => ({ id, title, poster_path, backdrop_path, vote_average, release_date });

const initialState: BookmarksState = {
  items: readStorage<Movie[]>(BOOKMARKS_KEY, readStorage<Movie[]>("cart", [])).map(toBookmark),
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    toggleBookmark: (state, { payload }: PayloadAction<Movie>) => {
      const exists = state.items.some((m) => m.id === payload.id);
      state.items = exists
        ? state.items.filter((m) => m.id !== payload.id)
        : [toBookmark(payload), ...state.items];
    },
    clearBookmarks: (state) => {
      state.items = [];
    },
  },
});

export const { toggleBookmark, clearBookmarks } = bookmarksSlice.actions;

type WithBookmarks = { bookmarks: BookmarksState };

export const selectBookmarks = (state: WithBookmarks) => state.bookmarks.items;
export const selectIsBookmarked = (id: number) => (state: WithBookmarks) =>
  state.bookmarks.items.some((m) => m.id === id);
