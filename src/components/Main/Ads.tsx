import { Ad } from "../../interfaces";
import { useAdsStore } from "../../store";

const Adds = () => {
  return (
    <main className="centering grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {useAdsStore((state) =>
        state.ads.map((ad: Ad, index) => (
          <div key={index} className="flex flex-row">
            <a
              href={ad.link}
              target="_blank"
              className="flex items-start gap-2 transition duration-300 ease-in-out hover:bg-zinc-100 hover:shadow-md sm:gap-3"
            >
              {ad.thumbnail && <img src={ad.thumbnail} width="100" />}
              <div className="overflow-hidden pr-1 pt-1">
                <div className="flex flex-row items-start">
                  <div>
                    {ad.category && (
                      <span className="rounded-full bg-zinc-200 px-3 py-0.5 text-xs font-bold">
                        {ad.category}
                      </span>
                    )}
                    {ad.date && (
                      <time
                        title={ad.date}
                        className="px-1.5 py-0.5 text-xs sm:block"
                      >
                        Il y a 20 minutes
                      </time>
                    )}
                  </div>
                  {ad.price && (
                    <span className="ms-auto rounded-full bg-green-500 px-3 py-0.5 text-xs font-bold text-zinc-50 md:text-sm">
                      {ad.price} $
                    </span>
                  )}
                </div>
                <div className="mt-2 max-h-24 min-w-0 overflow-hidden sm:mt-1">
                  {ad.title && (
                    <h2 className="text-xs font-bold md:text-sm">{ad.title}</h2>
                  )}
                  {ad.description && (
                    <p className="text-xs">{ad.description}</p>
                  )}
                </div>
              </div>
            </a>
          </div>
        ))
      )}
    </main>
  );
};

export default Adds;
