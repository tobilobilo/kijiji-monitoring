import Category from "./Category";
import AddFeed from "./AddFeed";
import Button from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

interface Menu {
  menuState: boolean;
}

const Settings = ({ menuState }: Menu) => {
  const iconsClasses = "me-1 h-5 text-white font-bold";

  function toggleCategories() {
    console.log("categories toggle");
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
            <div className="flex items-start pt-3 md:pt-4">
              <div className="me-3 border-r border-zinc-400/30 pe-3 md:me-4 md:pe-4">
                <div
                  className="relative flex h-8 items-center justify-center overflow-hidden rounded-full bg-red-650 px-4 text-sm shadow-sm"
                  aria-label="Basculer toutes les catégories"
                >
                  <input
                    id="toggle-all"
                    onChange={toggleCategories}
                    type="checkbox"
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="toggle-all"
                    className="absolute left-0 top-0 block h-full w-full cursor-pointer"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </label>
                </div>
              </div>
              <div className="checkboxes" id="checkboxes">
                <Category />
              </div>
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
              <div className="relative flex h-8 items-center justify-center overflow-hidden rounded-full bg-red-650 px-4 text-sm text-white shadow-sm">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  id="is-auto"
                />
                <label className="ms-3 cursor-pointer" htmlFor="is-auto">
                  Auto
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
