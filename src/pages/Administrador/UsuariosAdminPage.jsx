import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import adminService from "@/services/adminService";
import { Pagination, DataTable } from "@/components/common/index";
import { Heading } from "@/components/ui/text/index";
import RegisterAdminUser from "@/components/RegisterAdminUser";

/**
 * This component renders a page for managing external users.
 * It allows you to view the list of users, filter them by role and delete them,
 * and also register a new user if they are administrative or teaching staff.
 */
const UsuariosAdminPage = () => {
  const [filterUsers, setFilterUsers] = useState([]);
  const [render, setRender] = useState(false);

  const { token } = useAuth();

  const fetchUsers = async (token) => {
    const response = await adminService.getExternalUsers(token);
    return response;
  };

  useEffect(() => {
    fetchUsers({ token }).then((fetchedUsers) => {
      setFilterUsers(fetchedUsers);
    });
  }, [token, render]);

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
  ];
  const actions = [
    {
      label: "Eliminar",
      style: "bg-red-500",
      onClick: (item) => handleDeleteUser(item._id, item.email),
    },
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

  const handleDeleteUser = (id, email) => {
    if (window.confirm(`Deseas eliminar al usuario ${email}?`)) {
      setFilterUsers(filterUsers.filter((user) => user._id !== id));
      adminService
        .deleteExternalUser(token, id)
        .then(() => {
          alert("Usuario eliminado correctamente");
        })
        .catch((error) => {
          alert("Error al eliminar el usuario:", error);
        });
    }
  };

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
      <div className="mb-6 w-full">
        <Heading level={4}>Usuarios externos</Heading>
        <Heading level={1}>
          Este módulo te permite gestionar usuarios externos( personal
          administrativo, docente e invitado)
        </Heading>
      </div>
      <div className="flex flex-row">
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

          {/* DataTable */}
          <DataTable
            columns={columns}
            data={paginatedUsers}
            actions={actions}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
        <div className="mt-5 text-center border-solid border-l-2 px-5 border-amarillo-10 ">
          <Heading level={2}>Registrar usario externo</Heading>
          <RegisterAdminUser setRender={setRender} render={render} />
        </div>
      </div>
    </>
  );
};

export default UsuariosAdminPage;
