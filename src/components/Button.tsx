import { ReactElement } from "react";

interface Button {
  text: string;
  extraClasses?: string;
  onClick?: any;
  icon?: ReactElement;
  disabled?: boolean;
}

const Button = ({
  text,
  extraClasses = "",
  icon,
  onClick,
  disabled,
}: Button) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-7 items-center justify-center overflow-hidden bg-red-650 px-4 text-xs text-red-50 shadow-sm transition duration-200 hover:brightness-90 md:h-8 md:text-sm ${extraClasses} ${
        disabled ? "opacity-70" : ""
      } ${extraClasses.includes("rounded-r-full") ? "" : "rounded-full"}`}
      disabled={disabled}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
