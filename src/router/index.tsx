import {
  createHashRouter, // normalement j'utiliserais createBrowserRouter, mais non possible sur github pages
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary.tsx";
import App from "../components/App.tsx";

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorBoundary />} />
      <Route
        path="/profil/:profileName"
        element={<App loadProfile={true} />}
        errorElement={<ErrorBoundary text={"Profil introuvable"} />}
      />
    </>
  )
);

export default router;
