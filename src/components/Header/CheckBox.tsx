interface CheckBox {
  id: string;
  state?: boolean;
  onChange?: any;
  ariaLabel?: string;
  text?: string;
  style?: "button" | "category";
}

const styles = {
  button: "bg-red-650 text-white",
  category: "bg-zinc-50",
};

const CheckBox = ({
  id,
  state,
  onChange,
  ariaLabel,
  text,
  style = "button",
}: CheckBox) => {
  return (
    <>
      <label
        aria-label={ariaLabel}
        htmlFor={id}
        className={`relative flex h-8 cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full px-4 text-sm shadow-sm transition duration-200 hover:brightness-90 ${styles[style]}`}
        aria-hidden="true"
      >
        <input
          checked={state}
          id={id}
          onChange={onChange}
          type="checkbox"
          className="cursor-pointer"
        />
        {text}
      </label>
    </>
  );
};

export default CheckBox;
