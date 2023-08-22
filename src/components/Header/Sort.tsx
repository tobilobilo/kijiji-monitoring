import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faClock } from "@fortawesome/free-solid-svg-icons";
import { useAdsStore } from "../../store";

interface Sort {
  iconsClasses?: string;
}

const Sort = ({ iconsClasses }: Sort) => {
  const adsStore = useAdsStore();
  const sortIcons = [
    {
      icon: faClock,
      label: "Plus récents",
    },
    {
      icon: faTag,
      label: "Par catégories",
    },
  ];

  function sort() {
    const cycleType = (adsStore.sortType += 1) > 1 ? 0 : adsStore.sortType;
    adsStore.setSortType(cycleType);
  }

  return (
    <span className="ms-auto flex flex-row">
      <span className="flex h-7 items-center justify-center rounded-l-lg border-r border-red-800 bg-red-650 px-3 text-xs text-red-50 shadow-sm md:h-8 md:text-sm">
        Trier
      </span>
      <Button
        text={sortIcons[adsStore.sortType].label}
        extraClasses="rounded-r-full"
        onClick={sort}
        icon={
          <FontAwesomeIcon
            icon={sortIcons[adsStore.sortType].icon}
            className={iconsClasses}
          />
        }
      />
    </span>
  );
};

export default Sort;
