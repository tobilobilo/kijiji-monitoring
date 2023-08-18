import { useState, Dispatch, SetStateAction } from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useProfileStore, useAdsStore } from "../../store";
import { Ad, Profile, AdsParser } from "../../interfaces";
import { containsTerms } from "../../utils/string";
import config from "../../config";

interface Search {
  iconsClasses?: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const Search = ({ iconsClasses, setLoading }: Search) => {
  const adsStore = useAdsStore();
  const profileStore = useProfileStore();

  const [searchBtnIsActive, setSearchBtnIsActive] = useState(true);

  function disableSearchButton() {
    setSearchBtnIsActive(false);
    setTimeout(() => setSearchBtnIsActive(true), 3000);
  }

  function registerToStore(ads: Array<Ad>, urls: Array<string>): void {
    adsStore.registerAds(ads);
    adsStore.registerUrls(urls);
  }

  function parseAds(ads: AdsParser) {
    // based on Kijiji RSS data
    const kijijiRSS = new window.DOMParser().parseFromString(
      ads.fetchedData,
      "text/xml"
    );
    const kijijiAds = kijijiRSS.getElementsByTagName("item");

    const arrayAds: Array<Ad> = [];
    const arrayUrls: Array<string> = [];
    Array.from(kijijiAds).forEach((item) => {
      const link =
        item.getElementsByTagName("link")[0]?.childNodes[0]?.nodeValue;

      if (link && adsStore.urls.includes(link)) return; // if the ad has already been registered, return
      if (link) arrayUrls.push(link); // add url in the list even if the ad insn't registered at the end (eg. excluded because a banned terms has been found in the title or description)

      const title =
        item.getElementsByTagName("title")[0]?.childNodes[0]?.nodeValue;
      const description =
        item.getElementsByTagName("description")[0]?.childNodes[0]?.nodeValue;

      if (title && containsTerms(title, ads.excludedTermsInTitle)) return;
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
      if (category) ad.category = category;
      if (thumbnail) ad.thumbnail = thumbnail;

      arrayAds.push(ad);
    });

    registerToStore(arrayAds, arrayUrls);
  }

  function FetchAds(searchParams: Profile): void {
    console.log(searchParams.feeds);
    const feeds = [
      {
        checked: true,
        keyword: "nintendo",
        url: "data/mocks/k0c623l9001.rss",
      },
      {
        checked: true,
        keyword: "xbox 360",
        url: "data/mocks/k0l1700278.rss",
      },
    ];
    const fetchPromisses: Promise<string | void>[] = [];
    feeds.map((feed) => {
      fetchPromisses.push(
        fetch(feed.url, {})
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
    Promise.all(fetchPromisses).then((values) => {
      console.log(values);
      setLoading(false);
    });

    const RSS_URL = "data/mocks/k0l1700278.rss";
    // const RSS_URL =
    //    config.CORS_PROXY +
    //    encodeURIComponent('https://www.kijiji.ca/rss-srp-laval-rive-nord/xbox-360/k0l1700278?dc=true&sort=dateDesc');
    /*fetch(RSS_URL, {})
      .then((response) => response.text())
      .then((data: string) => {
        parseAds({
          fetchedData: data,
          category: "tester",
          excludedTermsInDescription: searchParams.excludedTermsInDescription,
          excludedTermsInTitle: searchParams.excludedTermsInTitle,
        });
      });*/
    /*const fetchExternalData = () => {
      return Promise.all([
        fetch("data/mocks/k0c623l9001.rss"),
        fetch("data/mocks/k0l1700278.rss"),
      ]).then((results) => Promise.all(results.map((result) => result.text())));
    };
    fetchExternalData().then((response) => {
      console.log(response);
      // [file1data, file2data]
    });*/
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
