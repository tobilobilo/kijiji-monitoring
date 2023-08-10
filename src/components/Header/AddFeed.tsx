import { useState } from "react";
import { removeSubstring } from "../../utils/string";
import { writeLocalStorageFeed, readLocalStorage } from "../../utils/storage";
import { Feed } from "../../interfaces";
import { useProfileStore } from "../../store";

const AddFeed = () => {
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [url, setUrl] = useState("");
  const profileStore = useProfileStore();

  function inputChange(inputValue: string) {
    setUrl(inputValue);
    setIsValidUrl(validateKijijiUrl(inputValue));
  }

  function validateKijijiUrl(url: string) {
    return url.includes("kijiji.ca/rss"); // basic url validation
  }

  function addFeed() {
    const urlBySections = removeSubstring("https://", url).split("/");
    const feedKeyword = decodeURIComponent(urlBySections[2]);
    const feedUrl = decodeURI(url)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setUrl("");
    setIsValidUrl(false);

    const feedsInStorage = readLocalStorage("CUSTOM_FEEDS");
    if (
      feedsInStorage &&
      JSON.parse(feedsInStorage).some((feed: Feed) => feed.url === feedUrl)
    )
      return;
    if (!validateKijijiUrl(feedUrl)) return;

    const feed: Feed = {
      url: feedUrl,
      keyword: feedKeyword,
      checked: true,
    };
    writeLocalStorageFeed(feed);
    profileStore.addFeed(feed);
  }

  return (
    <>
      <div className="flex pt-3 md:pt-4">
        <input
          type="text"
          className={`block h-8 w-full rounded-lg border border-zinc-200 px-3 py-1 text-sm placeholder-zinc-350 shadow-sm outline-red-650 md:h-10 md:px-4 md:py-3 ${
            isValidUrl ? "rounded-e-none" : "rounded-e-lg"
          }`}
          placeholder="Ajouter un feed RSS Kijiji"
          value={url}
          onChange={(e) => inputChange(e.target.value)}
        />
        <button
          className={`rounded-e-md bg-red-650 px-4 text-sm text-white shadow-sm ${
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
