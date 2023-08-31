import TimeAgo from "timeago-react";
import { decode } from "html-entities";

const Ad = ({ ad }: any) => {
  const onImageError = (e: any) => {
    e.target.style.display = "none";
  };

  return (
    <div className="flex flex-row shadow-md">
      <a
        href={ad.link}
        target="_blank"
        className="group flex max-h-48 w-full overflow-hidden transition duration-200 ease-in-out hover:scale-[1.05] hover:bg-zinc-100 hover:shadow-md"
      >
        {ad.thumbnail && (
          <img
            src={ad.thumbnail}
            onError={onImageError}
            className="me-1 block w-36 self-start md:me-2"
          />
        )}
        <div className="flex-grow overflow-hidden px-1 pt-1">
          <div className="flex flex-col">
            <div className="flex w-full items-start gap-2">
              {ad.category && (
                <span className="rounded-full bg-zinc-200 px-3 py-0.5 text-xs font-bold">
                  {ad.category}
                </span>
              )}

              {ad.price && (
                <span className="ms-auto whitespace-nowrap rounded-full bg-green-500 px-3 py-0.5 text-xs font-bold text-zinc-50">
                  {ad.price} $
                </span>
              )}
            </div>
            {ad.date && (
              <time
                title={ad.date}
                className="mt-0.5 block py-0.5 text-xs text-zinc-400"
              >
                <TimeAgo datetime={ad.date} locale="fr" />
              </time>
            )}
          </div>
          <div className="relative mt-1.5 max-h-36 min-w-0 overflow-hidden after:absolute after:top-28 after:block after:h-8 after:w-full after:bg-gradient-to-t after:from-white after:transition group-hover:after:from-zinc-100 sm:mt-0.5">
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
