import { Add, Profile } from "../interfaces";

function registerAdd(add: any): void {
  console.log(add);
}

function FetchAdds(searchParams: Profile): void {
  console.log("dw");
  const RSS_URL = "data/mocks/k0l1700278.rss";
  /* const RSS_URL =
      config.CORS_PROXY +
      encodeURIComponent('https://www.kijiji.ca/rss-srp-laval-rive-nord/xbox-360/k0l1700278?dc=true&sort=dateDesc'); */
  fetch(RSS_URL, {})
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      console.log(data);
      registerAdd("add to Chooo vcgooo");
    });
}

export default FetchAdds;
