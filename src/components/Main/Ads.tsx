import { useState, useEffect } from "react";
import { Ad as AdType } from "../../interfaces";
import Ad from "./Ad";
import { useAdsStore } from "../../store";
import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";

timeago.register("fr", fr);

const Adds = () => {
  const adsStore = useAdsStore();
  const [ads, setAds] = useState<Array<AdType>>([]);

  function sortByDate() {
    const sortedAds = [...adsStore.ads].sort((a: AdType, b: AdType) => {
      const dateA = a.date ? Date.parse(a.date) : 0;
      const dateB = b.date ? Date.parse(b.date) : 0;
      return dateA < dateB ? 1 : dateB < dateA ? -1 : 0;
    });
    setAds(sortedAds);
  }

  function sortByCategory() {
    const sortedAds = [...adsStore.ads].sort((a: AdType, b: AdType) => {
      const categoryA = a.category || "";
      const categoryB = b.category || "";
      return categoryA > categoryB ? 1 : categoryB > categoryA ? -1 : 0;
    });
    setAds(sortedAds);
  }

  useEffect(() => {
    switch (adsStore.sortType) {
      case 1:
        sortByCategory();
        break;
      case 0:
      default:
        sortByDate();
    }
  }, [adsStore.sortType, adsStore.ads]);

  return (
    <main className="centering grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {ads.map((ad: AdType, index) => (
        <Ad ad={ad} key={index} />
      ))}
      {/*useAdsStore((state) =>
        state.ads.map((ad: AdType, index) => <Ad ad={ad} key={index} />)
      )*/}
    </main>
  );
};

export default Adds;
