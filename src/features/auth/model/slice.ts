import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { readStorage } from "@/shared/lib";
import { DEMO_ACCOUNT } from "../config/demo";

export interface AuthUser {
  username: string;
  name: string;
}

export const AUTH_KEY = "auth-user";

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: readStorage<AuthUser | null>(AUTH_KEY, null) },
  reducers: {
    signIn: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectUser = (state: { auth: { user: AuthUser | null } }) => state.auth.user;

export const checkCredentials = async (username: string, password: string): Promise<AuthUser | null> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const ok = username.trim().toLowerCase() === DEMO_ACCOUNT.username && password === DEMO_ACCOUNT.password;
  return ok ? { username: DEMO_ACCOUNT.username, name: DEMO_ACCOUNT.name } : null;
};
