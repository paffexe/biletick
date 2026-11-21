import { lazy } from "react";
import { Navigate, useParams, useRoutes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";

const HomePage = lazy(() => import("@/pages/home"));
const MoviesPage = lazy(() => import("@/pages/movies"));
const MovieDetailPage = lazy(() => import("@/pages/movie-detail"));
const ReviewsTab = lazy(() => import("@/pages/movie-detail").then((m) => ({ default: m.ReviewsTab })));
const CastTab = lazy(() => import("@/pages/movie-detail").then((m) => ({ default: m.CastTab })));
const CrewTab = lazy(() => import("@/pages/movie-detail").then((m) => ({ default: m.CrewTab })));
const PersonPage = lazy(() => import("@/pages/person"));
const SavedPage = lazy(() => import("@/pages/saved"));
const SearchPage = lazy(() => import("@/pages/search"));
const LoginPage = lazy(() => import("@/pages/login"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

const LegacyCrewRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/person/${id}`} replace />;
};

export const AppRouter = () =>
  useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "movie", element: <MoviesPage /> },
        {
          path: "movie/:id",
          element: <MovieDetailPage />,
          children: [
            { index: true, element: <ReviewsTab /> },
            { path: "cast", element: <CastTab /> },
            { path: "crew", element: <CrewTab /> },
          ],
        },
        { path: "person/:id", element: <PersonPage /> },
        { path: "crew/:id", element: <LegacyCrewRedirect /> },
        { path: "saved", element: <SavedPage /> },
        { path: "search", element: <SearchPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
