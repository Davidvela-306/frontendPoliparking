import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import adminService from "@/services/adminService";
import { Pagination, DataTable } from "@/components/common/index";
import { Heading } from "@/components/ui/text/index";

const UsuariosAdminPage = () => {
  const [filterUsers, setFilterUsers] = useState([]);
  const { token } = useAuth();

  const fetchUsers = async (token) => {
    const response = await adminService.getExternalUsers(token);
    return response;
  };

  useEffect(() => {
    fetchUsers({ token }).then((fetchedUsers) => {
      setFilterUsers(fetchedUsers);
    });
  }, [token]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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
      onClick: (item) => handleDeleteUser(item._id, item.email),
    },
  ];

  // Filtering Logic
  const filteredUsers = useMemo(() => {
    let filtered = filterUsers;

    // Apply role filter if specified
    if (filterRole) {
      filtered = filtered.filter(
        (user) => user.rol?.toLowerCase().includes(filterRole.toLowerCase()), // Ensure to safely access `rol`
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
      <div className="container mx-auto px-4 py-8">
       <div className="mb-5 text-justify gap-y-10">
         <Heading level={4}>Usuarios</Heading>
         <Heading level={1}>
           Este módulo está diseñada para que puedas gestionar los usuarios externos.
           <br />
           Podrás ver la lista de usuarios, filtrarlos por rol y eliminarlos, además puedes registrar un nuevo usuario siempre que sea administrativo o personal docente.
         </Heading>
       </div>
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar..."
            className="w-full px-3 py-2 border rounded"
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
            Administrativo
          </button>
          <button
            className="px-4 py-2 bg-amarillo-10 text-black focus:bg-azul-20 focus:text-white rounded mr-2"
            onClick={() => handleFilterByRole("Estudiante")}
          >
            Estudiante
          </button>
          <button
            className="px-4 py-2 bg-amarillo-10 text-black focus:bg-azul-20 focus:text-white rounded mr-2"
            onClick={() => handleFilterByRole("Personal docente")}
          >
            Personal docente
          </button>
        </div>

        {/* DataTable */}
        <DataTable columns={columns} data={paginatedUsers} actions={actions} />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
      <div>Registrar usuario externo</div>
    </>
  );
};

export default UsuariosAdminPage;
