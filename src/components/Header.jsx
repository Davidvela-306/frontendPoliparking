import { LogoTitle } from "@components/ui/index";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { signout } = useAuth();
  return (
    <>
      <LogoTitle
        imgSrc="\src\assets\images\logoBuho.png"
        imgAlt="Logo"
        text="Poli Parking"
      />
      <div className="flex items-center gap-x-5">
        <img
          className="w-16"
          src="\src\assets\images\car.png"
          alt="Logo Poli parking"
        />
        <button
          onClick={signout}
          className="bg-amarillo-10 text-white p-2 rounded-lg w-full"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default Header;
