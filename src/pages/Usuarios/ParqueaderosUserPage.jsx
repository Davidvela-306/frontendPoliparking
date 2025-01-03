import { useEffect, useState } from "react";
import { ParkingSpacesGraph } from "@/components/common";
import parkingService from "@/services/parkingService";
import { useAuth } from "@context/AuthContext";
const ParqueaderosUserPage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    parkingService.getParking().then((response) => {
      setParkingSpaces(response);
    });
  }, [token]);
  console.log(parkingSpaces);

  if (!parkingSpaces) {
    return <p>Cargando...</p>;
  }

  if (parkingSpaces.length === 0) {
    return <p>No hay parqueaderos cargados en el sistema</p>;
  }
  console.log("parkingSpaces", parkingSpaces);
  parkingSpaces.map((parkingSpace) => {
    console.log("parkingSpace espacios", parkingSpace.espacios);
  });

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
            {/* añadir borde */}
            {parkingSpace.estado ?
              <div className="flex-1 border-solid border-2 border-azul-20  rounded-lg p-4">
                <ParkingSpacesGraph spaces={parkingSpace.espacios} />
              </div>
            : <p>El parqueadero se encuentra cerrado</p>}
          </div>
        ))}
      </div>
    </>
  );
};

export default ParqueaderosUserPage;
