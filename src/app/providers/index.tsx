import { Suspense, useEffect, type ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import i18n from "../i18n";
import { store } from "../store";
import { PageLoader } from "@/shared/ui";
import { ThemeProvider } from "./ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const useLanguageSync = () => {
  useEffect(() => {
    const onChange = (lng: string) => {
      document.documentElement.lang = lng;
      queryClient.invalidateQueries();
    };
    if (i18n.resolvedLanguage) document.documentElement.lang = i18n.resolvedLanguage;
    i18n.on("languageChanged", onChange);
    return () => i18n.off("languageChanged", onChange);
  }, []);
};

export const AppProviders = ({ children }: { children: ReactNode }) => {
  useLanguageSync();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            <Suspense fallback={<PageLoader />}>{children}</Suspense>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
