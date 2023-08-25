import { useState, useEffect } from "react";
import { Ad as AdType } from "../../interfaces";
import Ad from "./Ad";
import { useAdsStore, useProfileStore } from "../../store";
import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";

timeago.register("fr", fr);

const Adds = () => {
  const adsStore = useAdsStore();
  const profileStore = useProfileStore();
  const [ads, setAds] = useState<Array<AdType>>([]);

  function filterByCheckedCategory(): Array<AdType> {
    const filteredAds: Array<AdType> = [];
    profileStore.feeds.forEach((feed) => {
      if (feed.checked) {
        if (adsStore.ads[feed.keyword])
          filteredAds.push(...adsStore.ads[feed.keyword]);
      }
    });
    return filteredAds;
  }

  function sortByDate(filteredAds: Array<AdType>) {
    const sortedAds = filteredAds.sort((a: AdType, b: AdType) => {
      const dateA = a.date ? Date.parse(a.date) : 0;
      const dateB = b.date ? Date.parse(b.date) : 0;
      return dateA < dateB ? 1 : dateB < dateA ? -1 : 0;
    });
    setAds(sortedAds);
  }

  function sortByCategory(filteredAds: Array<AdType>) {
    const sortedAds = filteredAds.sort((a: AdType, b: AdType) => {
      const categoryA = a.category ?? "";
      const categoryB = b.category ?? "";
      return categoryA > categoryB ? 1 : categoryB > categoryA ? -1 : 0;
    });
    setAds(sortedAds);
  }

  useEffect(() => {
    const filteredAds = filterByCheckedCategory();
    switch (adsStore.sortType) {
      case 1:
        sortByCategory(filteredAds);
        break;
      case 0:
      default:
        sortByDate(filteredAds);
    }
  }, [adsStore.sortType, adsStore.ads, profileStore.feeds]);

  return (
    <main className="centering grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {ads.map((ad: AdType, index) => (
        <Ad ad={ad} key={index} />
      ))}
    </main>
  );
};

export default Adds;
