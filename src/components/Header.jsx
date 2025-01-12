import { LogoTitle } from "@components/ui/index";
import { useAuth } from "@context/AuthContext";
import carImage from "@images/car.png";
import logoBuho from "@images/logoBuho.png";


const Header = () => {
  const { signout } = useAuth();
  return (
    <>
      <LogoTitle
        imgSrc={logoBuho}
        imgAlt="Logo"
        text="Poli Parking"
      />
      <div className="flex items-center gap-x-5">
        <img
          className="w-16"
          src={carImage}
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
