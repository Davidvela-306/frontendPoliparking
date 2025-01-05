import { useState, useEffect } from "react";
import {
  FormularioG,
  CardPerfilG,
  ActualizarContraseña,
} from "@components/Perfil/index";
import guardiaService from "@/services/guardiaService";
import { useAuth } from "../../context/AuthContext";

const PerfilGuardiasPage = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    if (token) {
      const data = await guardiaService.getUser({ token });
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

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
          <CardPerfilG userData={userData} />
        </div>

        <div className="flex-1 self-center">
          <FormularioG onUpdateSuccess={fetchUserData} />
          <div className="mt-4">
            <ActualizarContraseña />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilGuardiasPage;
