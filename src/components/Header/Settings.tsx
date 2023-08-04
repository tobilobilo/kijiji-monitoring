import { useState, useEffect } from "react";
import Categories from "./Categories";
import AddFeed from "./AddFeed";
import Button from "../Button";
import CheckBox from "./CheckBox";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useProfileStore } from "../../store";
import config from "../../config";

interface Menu {
  menuState: boolean;
}

const Settings = ({ menuState }: Menu) => {
  const iconsClasses = "me-1 h-5 text-white font-bold";

  const [allCategories, setAllCategories] = useState(false);
  const [automatic, setAutomatic] = useState(false);

  const automaticAnimationClass = automatic ? "animate-automatic" : "";
  const automaticAnimationDelay = {
    animationDuration: config.AUTOMATIC_TIMER + "s",
  };

  const profileStore = useProfileStore();

  function toggleAllCheckboxes() {
    const newState = !allCategories;
    const feeds = profileStore.feeds;
    const newFeeds = feeds.map((f) => {
      f.checked = newState;
      return f;
    });

    setAllCategories(newState);
    profileStore.setFeeds(newFeeds);
  }

  return (
    <>
      <div className="overflow-hidden bg-zinc-300">
        <div
          className={`centering grid transition-all duration-500 ${
            menuState ? "grid-rows-1" : "grid-rows-0"
          }`}
        >
          <div className="mx-auto w-full max-w-4xl pb-3 md:pb-4">
            <AddFeed />
            <div className="flex flex-col items-start pt-3 sm:flex-row md:pt-4">
              <div className="mb-2 w-full border-b border-zinc-400/30 pb-2 sm:mb-0 sm:me-3 sm:w-auto sm:border-b-0 sm:border-r sm:pb-0 sm:pe-3 md:me-4 md:pe-4">
                <CheckBox
                  id="toogle"
                  state={allCategories}
                  onChange={toggleAllCheckboxes}
                  ariaLabel="Basculer toutes les catégories"
                  extraClasses="w-full"
                />
              </div>
              <Categories />
            </div>
            <div className="mt-2 flex flex-wrap gap-3 border-t border-zinc-400/30 pt-2 md:mt-3 md:gap-3 md:pt-3">
              <Button
                text="Rechercher"
                icon={<MagnifyingGlassIcon className={iconsClasses} />}
              />
              <Button
                text="Trier"
                extraClasses="ms-auto"
                icon={<ArrowUpTrayIcon className={iconsClasses} />}
              />
              <CheckBox
                id="automaat"
                state={automatic}
                onChange={() => setAutomatic(!automatic)}
                text="Auto"
              />
            </div>
          </div>
        </div>
        <div className="h-0.5 bg-white">
          <div
            className={`h-full w-0 bg-red-650/90 ${automaticAnimationClass}`}
            style={automaticAnimationDelay}
          >
            &nbsp;
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
