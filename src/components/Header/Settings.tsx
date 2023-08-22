import { useState, useEffect } from "react";
import Categories from "./Categories";
import AddFeed from "./AddFeed";
import CheckBox from "./CheckBox";
import { useProfileStore } from "../../store";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import Sort from "./Sort";

interface Menu {
  menuState: boolean;
}

const Settings = ({ menuState }: Menu) => {
  const iconsClasses = "me-2 h-4 text-white";
  const profileStore = useProfileStore();

  const [allCategories, setAllCategories] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(0);
  const [countdown, setCountdown] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();

  const automaticAnimationClass =
    automatic && !loading ? "animate-automatic" : "";
  const automaticAnimationDelay = {
    animationDuration: config.AUTOMATIC_TIMER + "s",
  };

  function toggleAllCheckboxes() {
    const newState = !allCategories;
    const feeds = profileStore.feeds;
    const newFeeds = feeds.map((feed) => {
      feed.checked = newState;
      return feed;
    });

    setAllCategories(newState);
    profileStore.setFeeds(newFeeds);
  }

  function initCountdown() {
    setCountdown(
      setTimeout(() => {
        setTriggerSearch((trigger) => trigger + 1);
      }, config.AUTOMATIC_TIMER * 1000)
    );
  }

  function cancelCountdown() {
    clearTimeout(countdown);
  }

  useEffect(() => {
    automatic ? initCountdown() : cancelCountdown();
  }, [automatic]);

  useEffect(() => {
    if (!loading && automatic) {
      cancelCountdown();
      initCountdown();
    }
  }, [loading]);

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
              <Search
                triggerSearch={triggerSearch}
                iconsClasses={iconsClasses}
                setLoading={setLoading}
              />

              <Sort iconsClasses={iconsClasses} />
              <CheckBox
                id="automatic"
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
