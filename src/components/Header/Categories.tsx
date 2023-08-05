import CheckBox from "./CheckBox";
import { useProfileStore } from "../../store";
import { Feed } from "../../interfaces";

const Category = () => {
  const profileStore = useProfileStore();

  function toggleChecked(feed: Feed, feeds: Array<Feed>) {
    const newFeeds = feeds.map((f) => {
      if (f.url === feed.url) f.checked = !f.checked;
      return f;
    });
    profileStore.setFeeds(newFeeds);
  }

  return (
    <>
      {useProfileStore((state) =>
        state.feeds.map((feed: Feed, index) => (
          <CheckBox
            key={`category${index}`}
            id={`category${index}`}
            text={feed.keyword}
            state={feed.checked}
            onChange={() => {
              toggleChecked(feed, state.feeds);
            }}
            style="category"
          />
        ))
      )}
    </>
  );
};

export default Category;
