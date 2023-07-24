import { useState } from "react";
import { removeSubstring } from "../../utils/string";
import { writeLocalStorageFeed } from "../../utils/storage";

const AddFeed = () => {
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [url, setUrl] = useState("");

  function inputChange(inputValue: string) {
    setUrl(inputValue);
    setIsValidUrl(validateKijijiUrl(inputValue));
  }

  function validateKijijiUrl(url: string) {
    return url.includes("kijiji.ca/rss"); // basic url validation
  }

  function addFeed() {
    const urlBySections = removeSubstring("https://", url).split("/");
    const feedKeyword = decodeURIComponent(urlBySections[3]);
    const feedUrl = decodeURI(url)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    writeLocalStorageFeed(feedKeyword, feedUrl, true);
    setUrl("");
  }

  return (
    <>
      <div className="flex pt-3 md:pt-4">
        <input
          type="text"
          className={`block w-full rounded-s-full bg-zinc-50 px-3 py-1 text-sm shadow-sm outline-red-650 md:px-4 md:py-3 ${
            isValidUrl ? "rounded-e-none" : "rounded-e-full"
          }`}
          placeholder="Ajouter un feed RSS Kijiji"
          value={url}
          onChange={(e) => inputChange(e.target.value)}
        />
        <button
          className={`rounded-e-full bg-red-650 px-4 text-sm text-white shadow-sm ${
            isValidUrl ? "" : "hidden"
          }`}
          onClick={addFeed}
        >
          Ajouter
        </button>
      </div>
      {!isValidUrl && url !== "" && (
        <span className="block px-3 py-1 text-xs text-red-650 md:px-4">
          Entrez une url Kijiji valide
        </span>
      )}
    </>
  );
};

export default AddFeed;
