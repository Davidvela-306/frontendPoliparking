import { useEffect, useState } from "react";
import { ParkingSpacesGraph } from "@/components/common";
import adminService from "@/services/adminService";
import { useAuth } from "@context/AuthContext";
import guardiaService from "@/services/guardiaService";
const ParqueaderosGuardiasPage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [estadoParqueadero, setEstadoParqueadero] = useState(null);
  const { token } = useAuth();
  useEffect(() => {
    adminService.getParqueaderos({ token }).then((response) => {
      setParkingSpaces(response);
      setEstadoParqueadero(response[0].estado);
    });
  }, [token]);
  console.log(parkingSpaces);

  if (!parkingSpaces) {
    return <p>Cargando...</p>;
  }

  if (parkingSpaces.length === 0) {
    return <p>No hay parqueaderos cargados en el sistema</p>;
  }

  return (
    <>
      <div className="p-4">
        <div className="mb-5 text-center flex flex-row gap-4 justify-between items-center">
          <div className="mb-5 text-justify flex flex-col">
            <h1 className="text-4xl text-azul-10 font-bold">
              Plazas de estacionamiento
            </h1>
            <p className="text-1xl text-azul-10">
              {parkingSpaces && parkingSpaces.length > 0 ?
                `Este módulo te permite visualizar la disponibilidad de las plazas de estacionamiento y reservar el parqueadero ${parkingSpaces[0].nombre}.`
              : "No hay parqueaderos cargados en el sistema"}
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                let state = {
                  estado: !estadoParqueadero,
                };
                guardiaService.changeStatus(token, parkingSpaces[0]._id, state);
                setEstadoParqueadero(state.estado);
              }}
              className="bg-azul-10 text-white px-4 py-2 rounded"
            >
              {estadoParqueadero ?
                "Reservar parqueadero"
              : "Liberar parqueadero"}
            </button>
          </div>
        </div>

        {parkingSpaces.map((parkingSpace) => (
          <div className="flex h-[70vh] gap-4" key={parkingSpace._id}>
            {/* añadir borde */}
            <div className="flex-1 border-solid border-2 border-azul-20  rounded-lg p-4">
              {estadoParqueadero ?
                <ParkingSpacesGraph />
              : <div className="flex justify-center items-center h-full">
                  <div className=" text-red-500 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <p className="text-2xl font-bold">PARQUEADERO RESERVADO</p>
                    <p className="text-lg font-thin text-white-50">
                      No disponible para estacionamiento
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ParqueaderosGuardiasPage;
