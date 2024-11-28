import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@context/AuthContext";
import { fetchGet, fetchPatch } from "@helpers/request_functions";
import { baseGuardias } from "@helpers/instances_routes";
import { Espacios } from "@components/ui/index";
import { Input } from "@components/ui/index";

const fetchParkingPlaces = async (token) => {
  const response = await fetchGet(
    baseGuardias,
    "/parqueaderos-disponibles",
    token,
  );
  return response.data;
};

const updateParkingPlaceStatus = async ({
  token,
  parkingPlaceId,
  newStatus,
}) => {
  const response = await fetchPatch(
    baseGuardias,
    `/${parkingPlaceId}`,
    { estado: newStatus },
    token,
  );
  return response.data;
};

const ParqueaderoGuardiasPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [selectedParkingPlace, setSelectedParkingPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const {
    data: parkingPlaces = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["parkingPlaces", token],
    queryFn: () => fetchParkingPlaces(token),
    enabled: !!token,
  });

  

  const updateParkingPlaceMutation = useMutation({
    mutationFn: updateParkingPlaceStatus,
    onSuccess: (_, { parkingPlaceId, newStatus }) => {
      queryClient.setQueryData(["parkingPlaces", token], (oldData) =>
        oldData.map((place) =>
          place._id === parkingPlaceId ?
            { ...place, estado: newStatus }
          : place,
        ),
      );
    },
  });

 const handleShowEspacios = (parkingPlace) => {
   if (selectedParkingPlace && selectedParkingPlace._id === parkingPlace._id) {
     return;
   }
   setSelectedParkingPlace(parkingPlace);
 };

  const handleAllOccupied = (allOccupied) => {
    if (selectedParkingPlace) {
      const nuevoEstado = !allOccupied;
      updateParkingPlaceMutation.mutate({
        token,
        parkingPlaceId: selectedParkingPlace._id,
        newStatus: nuevoEstado,
      });
    }
  };

  // Filtrar los parqueaderos por el término de búsqueda
  const filteredParkingPlaces = parkingPlaces.filter((place) =>
    Object.values(place).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParkingPlaces = filteredParkingPlaces.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredParkingPlaces.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedParkingPlace(null);
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los parqueaderos</div>;

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 text-azul-10">Parqueaderos</h1>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar parqueaderos..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Resetear a la primera página al buscar
          }}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="h-[80vh]">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-azul-20 text-white border-solid border-t-2 border-gray-300">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Nombre</th>
              <th className="px-4 py-2 text-left font-semibold">Descripción</th>
              <th className="px-4 py-2 text-left font-semibold">Planta</th>
              <th className="px-4 py-2 text-left font-semibold">Bloque</th>
              <th className="px-4 py-2 text-left font-semibold">Tipo</th>
              <th className="px-4 py-2 text-left font-semibold">Estado</th>
              <th className="px-4 py-2 text-left font-semibold">
                Ver espacios
              </th>
            </tr>
          </thead>
          <tbody>
            {currentParkingPlaces.length > 0 ?
              currentParkingPlaces.map((parkingPlace) => (
                <tr
                  className="hover:bg-gray-100 border-solid border-t-2 border-gray-300"
                  key={parkingPlace._id}
                >
                  <td className="px-4 py-2 border-b border-gray-300">
                    {parkingPlace.nombre}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {parkingPlace.description}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {parkingPlace.planta}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {parkingPlace.bloque}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {parkingPlace.tipo}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {parkingPlace.estado ? "Disponible" : "No disponible"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <button
                      type="button"
                      onClick={() => handleShowEspacios(parkingPlace)}
                      className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-3 rounded"
                    >
                      Espacios disponibles
                    </button>
                  </td>
                </tr>
              ))
            : <tr>
                <td
                  colSpan="7"
                  className="text-center px-4 py-2 border-b border-gray-300"
                >
                  No se encontraron resultados
                </td>
              </tr>
            }
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-azul-20 text-white rounded disabled:bg-gray-300"
          >
            Anterior
          </button>
          <span className="text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-azul-20 text-white rounded disabled:bg-gray-300"
          >
            Siguiente
          </button>
        </div>

        {selectedParkingPlace && (
          <div className="w-full flex justify-center">
            <Espacios onAllOccupied={handleAllOccupied} />
          </div>
        )}
      </div>
    </>
  );
};

export default ParqueaderoGuardiasPage;
