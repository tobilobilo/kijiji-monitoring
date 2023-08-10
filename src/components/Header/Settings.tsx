import { useState } from "react";
import Categories from "./Categories";
import AddFeed from "./AddFeed";
import Button from "../Button";
import CheckBox from "./CheckBox";
import { useProfileStore } from "../../store";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountUpAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import FetchAdds from "../../services/FetchAdds";

interface Menu {
  menuState: boolean;
}

const Settings = ({ menuState }: Menu) => {
  const iconsClasses = "me-1 h-4 text-white";
  const profileStore = useProfileStore();

  const [allCategories, setAllCategories] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [loading, setLoading] = useState(false);

  const automaticAnimationClass = automatic ? "animate-automatic" : "";
  const automaticAnimationDelay = {
    animationDuration: config.AUTOMATIC_TIMER + "s",
  };

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

  function search() {
    setLoading(true);
    FetchAdds({
      feeds: profileStore.feeds.filter((f) => f.checked === true),
      excludedTermsInDescription: profileStore.excludedTermsInDescription,
      excludedTermsInTitle: profileStore.excludedTermsInTitle,
    });
    setTimeout(() => setLoading(false), 3000);
  }

  return (
    <>
      <div className="overflow-hidden shadow-md">
        <div
          className={`centering grid transition-all duration-500 ${
            menuState ? "grid-rows-1" : "grid-rows-0"
          }`}
        >
          <div className="mx-auto w-full max-w-4xl pb-3 md:pb-4">
            <AddFeed />
            <div
              className="checkboxes space-between justify-left flex flex-wrap gap-2 pt-3 sm:gap-3 md:pt-4"
              id="checkboxes"
            >
              <CheckBox
                id="toogle"
                state={allCategories}
                onChange={toggleAllCheckboxes}
                ariaLabel={allCategories ? "Tout cocher" : "Tout décocher"}
              />
              <Categories />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
              <Button
                text="Rechercher"
                icon={
                  <FontAwesomeIcon icon={faSearch} className={iconsClasses} />
                }
                onClick={search}
              />
              <Button
                text="Trier"
                extraClasses="ms-auto"
                icon={
                  <FontAwesomeIcon
                    icon={faSortAmountUpAlt}
                    className={iconsClasses}
                  />
                }
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
      <div className="flex h-10 items-center justify-center md:h-14">
        {loading && (
          <FontAwesomeIcon
            icon={faCircleNotch}
            spin
            className="h-6 text-red-650 md:h-8"
          />
        )}
      </div>
    </>
  );
};

export default Settings;
