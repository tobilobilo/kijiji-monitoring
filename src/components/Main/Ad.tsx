import { Ad as AdType } from "../../interfaces";
import TimeAgo from "timeago-react";
import { decode } from "html-entities";

const Ad = ({ ad }: any) => {
  const onImageError = (e: any) => {
    e.target.style.display = "none";
  };

  return (
    <div className="flex flex-row">
      <a
        href={ad.link}
        target="_blank"
        className="group flex max-h-48 gap-2 overflow-hidden transition duration-200 ease-in-out hover:scale-[1.05] hover:bg-zinc-100 hover:shadow-md sm:gap-3"
      >
        {ad.thumbnail && (
          <img
            src={ad.thumbnail}
            onError={onImageError}
            className="block w-28 self-start"
          />
        )}
        <div className="overflow-hidden pr-1 pt-1">
          <div className="flex flex-row items-start">
            <div className="flex flex-row items-start sm:flex-col">
              {ad.category && (
                <span className="rounded-full bg-zinc-200 px-3 py-0.5 text-xs font-bold">
                  {ad.category}
                </span>
              )}
              {ad.date && (
                <time
                  title={ad.date}
                  className="px-1.5 py-0.5 text-xs sm:block sm:px-0"
                >
                  <TimeAgo datetime={ad.date} locale="fr" />
                </time>
              )}
            </div>
            {ad.price && (
              <span className="ms-auto rounded-full bg-green-500 px-3 py-0.5 text-xs font-bold text-zinc-50">
                {ad.price} $
              </span>
            )}
          </div>
          <div className="relative mt-2 max-h-36 min-w-0 overflow-hidden after:absolute after:top-28 after:block after:h-8 after:w-full after:bg-gradient-to-t after:from-white after:transition group-hover:after:from-zinc-100 sm:mt-1">
            {ad.title && (
              <h2 className="text-xs font-bold md:text-sm">
                {decode(ad.title)}
              </h2>
            )}
            {ad.description && (
              <p className="mt-2 text-xs sm:mt-1">{decode(ad.description)}</p>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default Ad;
