import { useEffect, useState } from "react";
import { ParkingSpacesGraph } from "@/components/common";
import adminService from "@/services/adminService";
import { useAuth } from "@context/AuthContext";
const ParqueaderosUserPage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    adminService.getParqueaderos({ token }).then((response) => {
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
            <div className="flex-1 border-solid border-2 border-azul-20  rounded-lg p-4">
              <ParkingSpacesGraph spaces={parkingSpace.espacios} />
            </div>
            {/* <div className="flex-1 border rounded-lg p-4 bg-amarillo-10 flex items-center">
              <p className="text-1xl text-azul-10 text-center">
                Las plazas de estacionamiento de color verde son libres y las de color rojo ocupadas. Tenlo en cuenta al momento de llegar al parqueadero de la facultad.
              </p>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default ParqueaderosUserPage;
