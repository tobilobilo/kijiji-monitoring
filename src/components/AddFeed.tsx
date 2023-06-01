import { useState } from "react";

const AddFeed = () => {
  const [urlIsValid, setUrlIsValid] = useState(false);
  const [url, setUrl] = useState("");

  function inputChange(inputValue: string) {
    setUrl(inputValue);
    setUrlIsValid(validateKijijiUrl(inputValue));
  }

  function validateKijijiUrl(url: string) {
    return url.includes("kijiji.ca/rss"); // basic url validation
  }

  return (
    <>
      <div className="flex pt-3 md:pt-4">
        <input
          type="text"
          className={`block w-full rounded-s-full bg-zinc-50 px-3 py-1 text-sm shadow-sm md:px-4 md:py-3 ${
            urlIsValid ? "rounded-e-none" : "rounded-e-full"
          }`}
          placeholder="Ajouter un feed RSS Kijiji"
          value={url}
          onChange={(e) => inputChange(e.target.value)}
        />
        <button
          className={`rounded-e-full bg-red-650 px-4 text-sm text-white shadow-sm ${
            urlIsValid ? "" : "hidden"
          }`}
        >
          Ajouter
        </button>
      </div>
      {!urlIsValid && url !== "" && (
        <span className="block px-3 py-1 text-xs text-red-650 md:px-4">
          Entrez une url Kijiji valide
        </span>
      )}
    </>
  );
};

export default AddFeed;
