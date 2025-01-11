import { useEffect, useState, useCallback } from "react";
import { ParkingSpacesGraph } from "@/components/common";
import parkingService from "@/services/parkingService";
import { useAuth } from "@context/AuthContext";
import guardiaService from "@/services/guardiaService";

const ParqueaderosGuardiasPage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [estadoParqueadero, setEstadoParqueadero] = useState(null);
  const [especialSpaceState, setEspecialSpaceState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    parkingService.getParking().then((response) => {
      if (response && response.length > 0) {
        setEstadoParqueadero(response[0].estado);
        setParkingSpaces(response);
        setEspecialSpaceState(response[0].espacios[5].estado);
      }
      setIsLoading(false);
    });
  }, [token]);

  const handleSpecialSpaceChange = useCallback(async () => {
    const espacioIndex = 5;
    const nuevoEstado = !especialSpaceState;

    try {
      await guardiaService.changeSpecialSpace(token, parkingSpaces[0]._id, {
        estado: nuevoEstado,
        numeroEspacio: "6",
      });

      setEspecialSpaceState(nuevoEstado);

      setParkingSpaces((prevSpaces) => {
        const newSpaces = [...prevSpaces];
        newSpaces[0] = {
          ...newSpaces[0],
          espacios: newSpaces[0].espacios.map((espacio, index) =>
            index === espacioIndex ?
              { ...espacio, estado: nuevoEstado }
            : espacio,
          ),
        };
        return newSpaces;
      });
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  }, [especialSpaceState, parkingSpaces, token]);

  useEffect(() => {
    const handleAutoRelease = async (event) => {
      if (event.detail.released && !especialSpaceState) {
        await handleSpecialSpaceChange();
      }
    };

    window.addEventListener("autoReleaseSpace6", handleAutoRelease);

    return () => {
      window.removeEventListener("autoReleaseSpace6", handleAutoRelease);
    };
  }, [especialSpaceState, handleSpecialSpaceChange]);

  if (isLoading) {
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
                `Este módulo te permite visualizar y gestionar el parqueadero de la ${parkingSpaces[0].nombre}.`
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
          <div>
            <button
              onClick={handleSpecialSpaceChange}
              className="bg-azul-10 text-white px-4 py-2 rounded"
            >
              {especialSpaceState ?
                "Discapacidad: Reservar plaza"
              : "Discapacidad: Liberar plaza"}
            </button>
          </div>
        </div>

        {parkingSpaces.map((parkingSpace) => (
          <div className="flex h-[70vh] gap-4" key={parkingSpace._id}>
            <div className="flex-1 border-solid border-2 border-azul-20 rounded-lg p-4">
              {estadoParqueadero ?
                <ParkingSpacesGraph
                  spaces={parkingSpace.espacios}
                  specialSpaceState={especialSpaceState}
                />
              : <div className="flex justify-center items-center h-full">
                  <div className="text-red-500 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
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
