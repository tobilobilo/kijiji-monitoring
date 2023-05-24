import { ReactElement } from "react";

interface Button {
  text: string;
  extraClasses?: string;
  icon?: ReactElement;
}

const Button = ({ text, extraClasses, icon }: Button) => {
  return (
    <button
      type="button"
      className={`relative flex h-8 items-center justify-center overflow-hidden rounded-full bg-red-650 px-4 text-sm text-white shadow-sm ${extraClasses}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
