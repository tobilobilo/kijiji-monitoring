import Ad from "./Ad";
import { useAdsStore } from "../../store";

const Adds = () => {
  return (
    <div>
      {useAdsStore((state) =>
        state.urls.map((url: string, index) => <p key={index}>{url}</p>)
      )}
    </div>
  );
};

export default Adds;
