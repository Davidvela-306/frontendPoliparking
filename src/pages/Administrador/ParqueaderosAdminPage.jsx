import { useEffect, useState } from "react";
import { ParkingSpacesGraph } from "@/components/common";
import { Heading } from "@/components/ui/text";
import adminService from "@/services/adminService";
import { useAuth } from "@context/AuthContext";
const ParqueaderosAdminPage = () => {
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
        <div className="mb-6 w-full border border-blue-500 rounded-lg p-4">
          <Heading level="4">Plazas de estacionamiento</Heading>
          <Heading level="1">
            Este módulo te permite gestionar las plazas de estacionamiento del
            parqueadero de la ESFOT.
          </Heading>
        </div>

        {parkingSpaces.map((parkingSpace) => (
          <div className="flex h-[70vh] gap-4" key={parkingSpace._id}>
            {/* añadir borde */}
            <div className="flex-1 border-solid border-2 border-azul-20  rounded-lg p-4">
              <ParkingSpacesGraph spaces={parkingSpace.espacios} />
            </div>
            <div className="flex-1 border  rounded-lg p-4 bg-amarillo-10">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
                maiores, at, accusamus velit ducimus omnis dolore architecto
                inventore cupiditate quas veniam molestiae deleniti. Quisquam
                unde rem error quibusdam libero sapiente.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ParqueaderosAdminPage;
