import { useState, useEffect } from "react";
import {
  ActualizarContraseña,
  CardPerfilU,
  FormularioU,
} from "@components/Perfil/index";
import userService from "@/services/userService";
import { useAuth } from "../../context/AuthContext";

const PerfilUsuariosPage = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    if (token) {
      const data = await userService.getUser({ token });
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);
  console.log("userData", userData);
  

  return (
    <div className="mt-10 flex flex-col items-center justify-start h-[70vh] px-5">
      <div className="mb-5 flex flex-col w-full">
        <h className="text-4xl text-azul-10 font-bold text-left w-3/4">
          Perfil
        </h>
        <h className="text-1xl text-azul-10 text-left w-3/4">
          Este módulo te permite gestionar tu perfil personal.
        </h>
      </div>

      <div className="flex justify-center align-center flex-row gap-4 md:gap-6 w-full max-w-7xl h-full mx-auto">
        <div className="flex-1 self-center justify-center">
          <CardPerfilU userData={userData} />
        </div>

        <div className="flex-1 self-center">
          <FormularioU onUpdateSuccess={fetchUserData} />
          <div className="mt-4">
            <ActualizarContraseña />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuariosPage;
