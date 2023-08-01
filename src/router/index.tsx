import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary.tsx";
import App from "../components/App.tsx";

const router = createBrowserRouter(
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
