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
      className={`relative flex h-8 items-center justify-center overflow-hidden rounded-full bg-red-650 px-4 text-sm text-white shadow-sm transition duration-200 hover:brightness-90 ${extraClasses}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
