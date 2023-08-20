import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountUpAlt } from "@fortawesome/free-solid-svg-icons";
import { useAdsStore } from "../../store";

interface Sort {
  iconsClasses?: string;
}

const Sort = ({ iconsClasses }: Sort) => {
  const adsStore = useAdsStore();

  function sort() {
    const cycleType = (adsStore.sortType += 1);
    adsStore.setSortType(cycleType > 1 ? 0 : cycleType);
  }

  return (
    <Button
      text="Trier"
      extraClasses="ms-auto"
      onClick={sort}
      icon={
        <FontAwesomeIcon icon={faSortAmountUpAlt} className={iconsClasses} />
      }
    />
  );
};

export default Sort;
