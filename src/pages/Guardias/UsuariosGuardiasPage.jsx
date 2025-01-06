import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import { Pagination, DataTable } from "@/components/common/index";
import RegisterGuardiaUser from "@/components/RegisterGuardiaUser";
import guardiaService from "@/services/guardiaService";

/**
 * This component renders a page for managing external users.
 * It allows you to view the list of users, filter them by role and delete them,
 * and also register a new user if they are administrative or teaching staff.
 */
const UsuariosAdminPage = () => {
  const [filterUsers, setFilterUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [hablitados, setHabilitados] = useState(true);

  const { token } = useAuth();

  const fetchUsers = async (token) => {
    const response = await guardiaService.getExternalUsers(token);
    return response;
  };

  useEffect(() => {
    fetchUsers({ token }).then((fetchedUsers) => {
      setFilterUsers(fetchedUsers);
      setHabilitados(fetchedUsers[0].estado);
    });
  }, [token, render, hablitados]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "apellido", label: "Apellido" },
    { key: "email", label: "Email" },
    { key: "placa_vehiculo", label: "Placa del Vehiculo" },
    { key: "telefono", label: "Telefono" },
    { key: "rol", label: "Rol" },
    { key: "estado", label: "Estado" },
  ];

  // Filtering Logic
  const filteredUsers = useMemo(() => {
    let filtered = filterUsers;

    // Apply role filter if specified
    if (filterRole) {
      filtered = filtered.filter((user) =>
        user.rol?.toLowerCase().includes(filterRole.toLowerCase()),
      );
    }

    // Apply search term filter if specified
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    return filtered;
  }, [filterUsers, searchTerm, filterRole]);

  // Pagination Logic
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handleFilterByRole = (role) => {
    setFilterRole(role);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="mb-5 text-justify flex flex-col">
        <h className="text-4xl text-azul-10 font-bold">Usuarios Externos</h>
        <h className="text-1xl text-azul-10">
          Este módulo te permite gestionar usuarios externos( Estudiantes e
          invitados) de la ESFOT.
        </h>
      </div>
      <div className="flex flex-row items-center">
        <div className="container mx-auto px-4 py-8">
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por nombre, apellido, email, placa de vehículo, teléfono..."
              className="w-full px-3 py-2 border-solid border-4 border-negro rounded"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-row justify-between">
            <div className="mb-4">
              <button
                className="px-4 py-2 bg-amarillo-10 text-black focus:bg-azul-20 focus:text-white rounded mr-2"
                onClick={() => {
                  setCurrentPage(1);
                  setFilterRole("");
                }}
              >
                Todos
              </button>
              <button
                className="px-4 py-2 bg-amarillo-10 text-black focus:bg-azul-20 focus:text-white rounded mr-2"
                onClick={() => handleFilterByRole("Administrativo")}
              >
                administrativo
              </button>
              <button
                className="px-4 py-2 bg-amarillo-10 text-black focus:bg-azul-20 focus:text-white rounded mr-2"
                onClick={() => handleFilterByRole("Estudiante")}
              >
                estudiante
              </button>
              <button
                className="px-4 py-2 bg-amarillo-10 text-black focus:bg-azul-20 focus:text-white rounded mr-2"
                onClick={() => handleFilterByRole("docente")}
              >
                docente
              </button>
            </div>
            <div>
              <button
                className="px-4 py-2 bg-azul-10 text-white border-solid border-2 border-amarillo-10 focus:bg-azul-20 focus:text-white rounded mr-2"
                onClick={async () => {
                  try {
                    setHabilitados(!hablitados);
                    const response = await guardiaService.enableUsers(token);
                    console.log(response);
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
              >
                {
                  hablitados ? "Restringir acceso" : "Habilitar acceso"
                }
              </button>
            </div>
          </div>

          {/* DataTable */}
          {hablitados ?
            <p className="text-green-500">
              Los usuarios se encuntran habilitados para ingresar al sistema
            </p>
          : <p className="text-red-500">
              Los usuarios no se encuntran habilitados para ingresar al sistema
            </p>
          }
          <br />
          <DataTable columns={columns} data={paginatedUsers} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
        <div className="mt-5 text-center border-solid border-l-2 px-5 border-amarillo-10 ">
          <p className="text-2xl text-azul-10 font-bold">
            Registrar usario externo
          </p>
          <RegisterGuardiaUser setRender={setRender} render={render} />
        </div>
      </div>
    </>
  );
};

export default UsuariosAdminPage;
