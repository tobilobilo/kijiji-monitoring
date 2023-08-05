import { ReactElement } from "react";

interface Button {
  text: string;
  extraClasses?: string;
  onClick?: any;
  icon?: ReactElement;
}

const Button = ({ text, extraClasses = "", icon, onClick }: Button) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-7 items-center justify-center overflow-hidden rounded-full bg-red-650 px-4 text-xs text-white shadow-sm transition duration-200 hover:brightness-90 md:h-8 md:text-sm ${extraClasses}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
