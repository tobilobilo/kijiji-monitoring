import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faClock } from "@fortawesome/free-solid-svg-icons";
import { useAdsStore } from "../../store";

interface Sort {
  iconsClasses?: string;
}

const Sort = ({ iconsClasses }: Sort) => {
  const adsStore = useAdsStore();
  const sortIcons = [faClock, faTag];

  function sort() {
    const cycleType = (adsStore.sortType += 1) > 1 ? 0 : adsStore.sortType;
    adsStore.setSortType(cycleType);
  }

  return (
    <Button
      text={`Trier`}
      extraClasses="ms-auto"
      onClick={sort}
      icon={
        <FontAwesomeIcon
          icon={sortIcons[adsStore.sortType]}
          className={iconsClasses}
        />
      }
    />
  );
};

export default Sort;
