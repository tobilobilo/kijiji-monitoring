import { useState } from "react";
import Categories from "./Categories";
import AddFeed from "./AddFeed";
import Button from "../Button";
import CheckBox from "./CheckBox";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

interface Menu {
  menuState: boolean;
}

const Settings = ({ menuState }: Menu) => {
  const iconsClasses = "me-1 h-5 text-white font-bold";

  const [allCategories, setAllCategories] = useState(false);
  const [automatic, setAutomatic] = useState(false);

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
            <div className="flex items-start pt-3 md:pt-4">
              <div className="me-3 border-r border-zinc-400/30 pe-3 md:me-4 md:pe-4">
                <CheckBox
                  id="toogle"
                  state={allCategories}
                  onChange={() => setAllCategories(!allCategories)}
                  ariaLabel="Basculer toutes les catégories"
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
        <div className="h-1 bg-white">
          <div className="h-full w-1/2 bg-red-650">&nbsp;</div>
        </div>
      </div>
    </>
  );
};

export default Settings;
