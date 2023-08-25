import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useProfileStore, useAdsStore } from "../../store";
import { Ad, Ads, Profile, AdsParser } from "../../interfaces";
import { containsTerms } from "../../utils/string";
import config from "../../config";

interface Search {
  iconsClasses?: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  triggerSearch: number;
}

const Search = ({ iconsClasses, setLoading, triggerSearch }: Search) => {
  const adsStore = useAdsStore();
  const profileStore = useProfileStore();

  const arrayAds: Ads = {};
  const arrayIds: Array<string> = [];

  const [searchBtnIsActive, setSearchBtnIsActive] = useState(true);

  useEffect(() => {
    if (triggerSearch) {
      search();
    }
  }, [triggerSearch]);

  function disableSearchButton() {
    setSearchBtnIsActive(false);
    setTimeout(() => setSearchBtnIsActive(true), 5000);
  }

  function registerToStore2(ads: Ads, ids: Array<string>): void {
    adsStore.registerAds(ads);
    adsStore.registerIds(ids);
  }

  function parseAds(ads: AdsParser) {
    // based on Kijiji RSS data
    const kijijiRSS = new window.DOMParser().parseFromString(
      ads.fetchedData,
      "text/xml"
    );
    const kijijiAds = kijijiRSS.getElementsByTagName("item");

    Array.from(kijijiAds).forEach((item) => {
      const link =
        item.getElementsByTagName("link")[0]?.childNodes[0]?.nodeValue;

      if (link) {
        const id = link.split("/").pop() || "";
        if (adsStore.ids.includes(id) || arrayIds.includes(id)) return; // if the ad has already been registered or is to queue to be registered, return
        arrayIds.push(id); // add url in the list even if the ad insn't registered at the end (eg. excluded because a banned terms has been found in the title or description)
      }

      const title =
        item.getElementsByTagName("title")[0]?.childNodes[0]?.nodeValue;
      if (title && containsTerms(title, ads.excludedTermsInTitle)) return;

      const description =
        item.getElementsByTagName("description")[0]?.childNodes[0]?.nodeValue;
      if (
        description &&
        containsTerms(description, ads.excludedTermsInDescription)
      )
        return;

      const date =
        item.getElementsByTagName("pubDate")[0]?.childNodes[0]?.nodeValue;
      const price =
        item.getElementsByTagName("g-core:price")[0]?.childNodes[0]?.nodeValue;
      const thumbnail = item
        .getElementsByTagName("enclosure")[0]
        ?.getAttribute("url");
      const category = ads.category;

      const ad: Ad = {};
      if (link) ad.link = link;
      if (title) ad.title = title;
      if (description) ad.description = description;
      if (date) ad.date = date;
      if (price) ad.price = price.split(".")[0];
      if (thumbnail) ad.thumbnail = thumbnail;
      ad.category = category;

      if (!arrayAds[category]) arrayAds[category] = [];
      arrayAds[category].push(ad);
    });
  }

  function FetchAds(searchParams: Profile): void {
    const feeds = searchParams.feeds;
    const fetchPromisses: Promise<string | void>[] = [];
    feeds.map((feed) => {
      const fetchPrefix = feed.url.startsWith("http") ? config.CORS_PROXY : "";
      fetchPromisses.push(
        fetch(fetchPrefix + feed.url, {})
          .then((response) => response.text())
          .then((data: string) => {
            parseAds({
              fetchedData: data,
              category: feed.keyword,
              excludedTermsInDescription:
                searchParams.excludedTermsInDescription,
              excludedTermsInTitle: searchParams.excludedTermsInTitle,
            });
          })
      );
    });
    Promise.all(fetchPromisses).then(() => {
      setLoading(false);
      registerToStore2(arrayAds, arrayIds);
    });
  }

  function search() {
    disableSearchButton();
    setLoading(true);
    FetchAds({
      feeds: profileStore.feeds.filter((f) => f.checked === true),
      excludedTermsInDescription: profileStore.excludedTermsInDescription,
      excludedTermsInTitle: profileStore.excludedTermsInTitle,
    });
  }

  return (
    <>
      <Button
        text="Rechercher"
        icon={<FontAwesomeIcon icon={faSearch} className={iconsClasses} />}
        onClick={search}
        disabled={!searchBtnIsActive}
      />
    </>
  );
};

export default Search;
