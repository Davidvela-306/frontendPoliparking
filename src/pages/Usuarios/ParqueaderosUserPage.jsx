import { useEffect, useState } from "react";
import { ParkingSpacesGraph } from "@/components/common";
import parkingService from "@/services/parkingService";
import { useAuth } from "@context/AuthContext";

const ParqueaderosUserPage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [estadoParqueadero, setEstadoParqueadero] = useState(null);
  const [especialSpaceState, setEspecialSpaceState] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    parkingService.getParking().then((response) => {
      setEstadoParqueadero(response[0].estado);
      setParkingSpaces(response);
      setEspecialSpaceState(response[0].espacios[5].estado);
    });
  }, [token]);

  if (!parkingSpaces) {
    return <p>Cargando...</p>;
  }

  if (parkingSpaces.length === 0) {
    return <p>No hay parqueaderos cargados en el sistema</p>;
  }

  return (
    <>
      <div className="p-4">
        <div className="mb-5 text-justify flex flex-col">
          <h className="text-4xl text-azul-10 font-bold">
            Plazas de estacionamiento
          </h>
          <h className="text-1xl text-azul-10">
            Este módulo te permite visualizar la disponibilidad de las plazas de
            estacionamiento del parqueadero de la ESFOT.
          </h>
        </div>

        {parkingSpaces.map((parkingSpace) => (
          <div className="flex h-[70vh] gap-4" key={parkingSpace._id}>
            <div className="flex-1 border-solid border-2 border-azul-20 rounded-lg p-4">
              {estadoParqueadero ?
                <ParkingSpacesGraph
                  spaces={parkingSpace.espacios}
                  specialSpaceState={especialSpaceState}
                />
              : <div className="flex justify-center items-center h-full flex-col">
                  <div className="bg-red-500 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <p className="text-3xl font-bold text-white">
                      PARQUEADERO RESERVADO
                    </p>
                    <p className="text-lg font-thin text-white-50 mt-2">
                      Este estacionamiento ha sido reservado
                    </p>
                  </div>
                  <p className="text-lg font-thin text-orange-500 mt-6">
                    Si desea más información de este suceso o desea reservar,
                    por favor comuníquese al siguiente número:
                    <span className="text-lg font-bold text-orange-500">
                      +34 123 456 789
                    </span>
                  </p>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ParqueaderosUserPage;
