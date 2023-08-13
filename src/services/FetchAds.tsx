import { Ad, Profile, AdsParser } from "../interfaces";

function registerAd(ad: Ad): void {
  console.log(ad);
}

function parseAds(ads: AdsParser) {
  // based on Kijiji RSS data
  const kijijiRSS = new window.DOMParser().parseFromString(
    ads.fetchedData,
    "text/xml"
  );
  const kijijiAds = kijijiRSS.getElementsByTagName("item");
  Array.from(kijijiAds).forEach((item) => {
    const ad: Ad = {};
    const title =
      item.getElementsByTagName("title")[0]?.childNodes[0]?.nodeValue;
    const description =
      item.getElementsByTagName("description")[0]?.childNodes[0]?.nodeValue;
    const link = item.getElementsByTagName("link")[0]?.childNodes[0]?.nodeValue;
    const date =
      item.getElementsByTagName("pubDate")[0]?.childNodes[0]?.nodeValue;
    const price =
      item.getElementsByTagName("g-core:price")[0]?.childNodes[0]?.nodeValue;
    const thumbnail = item
      .getElementsByTagName("enclosure")[0]
      ?.getAttribute("url");
    const category = ads.category;
    if (title) ad.title = title;
    if (description) ad.description = description;
    if (link) ad.link = link;
    if (date) ad.date = date;
    if (price) ad.price = price.split(".")[0];
    if (category) ad.category = category;
    if (thumbnail) ad.thumbnail = thumbnail;

    registerAd(ad);
  });
}

function FetchAds(searchParams: Profile): void {
  const RSS_URL = "data/mocks/k0l1700278.rss";
  /* const RSS_URL =
      config.CORS_PROXY +
      encodeURIComponent('https://www.kijiji.ca/rss-srp-laval-rive-nord/xbox-360/k0l1700278?dc=true&sort=dateDesc'); */
  fetch(RSS_URL, {})
    .then((response) => response.text())
    .then((data: string) => {
      parseAds({
        fetchedData: data,
        category: "tester",
        excludedTermsInDescription: searchParams.excludedTermsInDescription,
        excludedTermsInTitle: searchParams.excludedTermsInTitle,
      });
    });
}

export default FetchAds;
