import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

interface CheckBox {
  id: string;
  state?: boolean;
  onChange?: any;
  ariaLabel?: string;
  text?: string;
  style?: "button" | "category";
  extraClasses?: string;
}

const styles = {
  button: "bg-red-650 text-white border-transparent hover:bg-red-700",
  category: "bg-white border-zinc-200 hover:bg-zinc-100",
};

const CheckBox = ({
  id,
  state,
  onChange,
  ariaLabel,
  text,
  style = "button",
  extraClasses,
}: CheckBox) => {
  return (
    <>
      <label
        aria-label={ariaLabel}
        htmlFor={id}
        className={`relative flex h-7 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full border px-3 text-xs shadow-sm transition duration-200  sm:gap-3 md:h-8 md:px-4 md:text-sm ${
          styles[style]
        } ${extraClasses} ${
          !state && style === "category" ? "bg-zinc-100 text-zinc-350" : ""
        }`}
        aria-hidden="true"
      >
        <input
          checked={state}
          id={id}
          onChange={onChange}
          type="checkbox"
          className="custom_checkbox absolute left-4 cursor-pointer opacity-0"
        />
        <FontAwesomeIcon
          icon={state ? faCheckSquare : faSquare}
          className="text-base"
        />
        {text}
      </label>
    </>
  );
};

export default CheckBox;
