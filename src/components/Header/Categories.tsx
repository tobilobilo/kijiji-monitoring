import CheckBox from "./CheckBox";

const Category = () => {
  return (
    <div className="checkboxes flex gap-3" id="checkboxes">
      <CheckBox id="toogle2" text="nintendo" style="category" />
      <div className="relative flex h-8 items-center justify-center overflow-hidden rounded-full bg-zinc-50 px-4 text-sm shadow-sm">
        <input
          type="checkbox"
          id="checkbox-nintendo"
          className="cursor-pointer"
          data-value="https://www.kijiji.ca/rss-srp-buy-sell/quebec/nintendo/k0c10l9001"
        />
        <label
          title="https://www.kijiji.ca/rss-srp-buy-sell/quebec/nintendo/k0c10l9001"
          htmlFor="checkbox-nintendo"
          className="ms-2 cursor-pointer text-zinc-800"
        >
          nintendo
        </label>
      </div>
    </div>
  );
};

export default Category;
