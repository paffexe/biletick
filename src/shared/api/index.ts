import axios from "axios";
import i18next from "i18next";
import { TMDB_API_URL, TMDB_TOKEN } from "../config";

const TMDB_LANGUAGES: Record<string, string> = {
  en: "en-US",
  ru: "ru-RU",
  uz: "en-US",
};

export const api = axios.create({ baseURL: TMDB_API_URL });

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TMDB_TOKEN}`;
  const lang = i18next.resolvedLanguage ?? "en";
  config.params = { language: TMDB_LANGUAGES[lang] ?? "en-US", ...config.params };
  return config;
});

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
