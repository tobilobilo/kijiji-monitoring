const Category = () => {
  return (
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
  );
};

export default Category;
