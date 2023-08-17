import { Ad as AdType } from "../../interfaces";
import Ad from "./Ad";
import { useAdsStore } from "../../store";
import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";

timeago.register("fr", fr);

const Adds = () => {
  return (
    <main className="centering grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {useAdsStore((state) =>
        state.ads.map((ad: AdType, index) => <Ad ad={ad} key={index} />)
      )}
    </main>
  );
};

export default Adds;
