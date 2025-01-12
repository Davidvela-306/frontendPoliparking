import { Link } from "react-router-dom";
import { ButtonMenu } from "./ui";
import { GeneralNavData } from "../assets/data/NavData";
import logoEsfotBuho from "@images/logo_esfot_buho.png";

const NavBar = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 w-full bg-azul-10 text-white px-10 py-1 z-50 flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src={logoEsfotBuho}
              alt=""
              className="w-20"
            />
          </Link>
        </div>
        <ul className="flex">
          {GeneralNavData.map((item) => (
            <ButtonMenu key={item.id} item={item} />
          ))}
        </ul>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1 mt-[calc(theme(space.11)+theme(space.1))] overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default NavBar;
