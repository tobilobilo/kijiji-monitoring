import Button from "./Button";
import Header from "./Header/Header";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

interface ErrorBoundary {
  text?: string;
}

function ErrorBoundary({ text = "Page introuvable" }: ErrorBoundary) {
  const navigate = useNavigate();
  const redirectToHome = () => navigate("/");

  return (
    <>
      <Header simpleHeader={true} />
      <div className="centering">
        <div className="mx-auto w-full max-w-4xl pt-6 md:pt-7">
          <ExclamationTriangleIcon className="mx-auto mb-3 h-24 font-bold text-zinc-200 md:h-32" />
          <h1 className="text text-center text-2xl font-bold uppercase text-zinc-800 md:text-4xl">
            {text}
          </h1>
          <Button
            text="Retour à l'accueil"
            extraClasses="mx-auto mt-6"
            onClick={redirectToHome}
          />
        </div>
      </div>
    </>
  );
}

export default ErrorBoundary;
