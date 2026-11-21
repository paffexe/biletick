import { AppProviders } from "./providers";
import { AppRouter } from "./router";
import "./styles/index.css";

export const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);
