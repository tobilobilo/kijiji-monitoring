import logo from "../assets/svg/k.svg";
import Settings from "./Settings";
import { useState } from "react";

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);

  function toggleSettings() {
    setMenuOpened(!menuOpened);
  }

  return (
    <>
      <header className="bg-zinc-800">
        <div className="centering">
          <div className="flex flex-wrap items-center gap-3 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-red-650">
              <img src={logo} alt="Logo" className="block w-3" />
            </span>
            <h1 className="me-auto text-xl font-medium text-white">
              Kijiji Monitoring
            </h1>
            <button className="text-white" onClick={toggleSettings}>
              <span className="flex items-center text-sm">
                Paramètres de recherche{" "}
                <i
                  className={`ms-3 h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-red-650 transition-all duration-500 ${
                    menuOpened ? "rotate-0" : "rotate-180"
                  }`}
                ></i>
              </span>
            </button>
          </div>
        </div>
      </header>
      <Settings menuState={menuOpened} />
    </>
  );
}

export default Header;
