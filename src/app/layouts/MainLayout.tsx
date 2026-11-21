import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PageLoader } from "@/shared/ui";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

const useScrollToTop = () => {
  const { pathname } = useLocation();
  const section = pathname.split("/").slice(0, 3).join("/");
  const previous = useRef(section);

  useEffect(() => {
    if (previous.current !== section) window.scrollTo({ top: 0 });
    previous.current = section;
  }, [section]);
};

export const MainLayout = () => {
  useScrollToTop();

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
