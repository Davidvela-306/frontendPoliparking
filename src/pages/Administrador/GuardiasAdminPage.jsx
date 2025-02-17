import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@context/AuthContext";
import { RegistroGuardia } from "@components/Perfil/index";
import DataTable from "@/components/common/DataTable";
import adminService from "@/services/adminService";
import { Pagination } from "@/components/common/index";

/**
 * Componente que muestra la lista de guardias y permite eliminarlos o cambiar
 * su estado. También permite registrar nuevos guardias.
 *
 */
const GuardiasAdminPage = () => {
  const [filterGuardias, setFilterGuardias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);
  const { token } = useAuth();

  const fetchUsers = async (token) => {
    setIsLoading(true);
    const response = await adminService.getGuardias(token);
    setIsLoading(false);
    return response;
  };

  useEffect(() => {
    fetchUsers({ token })
      .then((fetchedUsers) => {
        setFilterGuardias(fetchedUsers);
      })
      .catch((error) => {
        alert(
          error?.response?.data?.msg ||
            "Ha ocurrido un error, vuelva a intentarlo más tarde",
        );
      });
  }, [token, render]);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "apellido", label: "Apellido" },
    { key: "cedula", label: "Cédula" },
    { key: "email", label: "Email" },
    { key: "telefono", label: "Teléfono" },
    { key: "estado", label: "Estado" },
  ];
  const actions = [
    {
      label: "Eliminar",
      style: "bg-red-500 h-10",
      onClick: (item) => handleDeleteGuardia(item._id, item.email),
    },
    {
      label: "Cambiar estado",
      style: "bg-yellow-500 h-10",
      onClick: (item) => {
        handleChangeState(item._id, item.email, !item.estado);
      },
    },
  ];

  // Filtering Logic
  const filteredUsers = useMemo(() => {
    let filtered = filterGuardias;

    // Apply search term filter if specified
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }

    return filtered;
  }, [filterGuardias, searchTerm]);

  // Pagination
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handleDeleteGuardia = (id, email) => {
    if (window.confirm(`Deseas eliminar al usuario ${email}?`)) {
      setFilterGuardias(filterGuardias.filter((user) => user._id !== id));
      adminService
        .deleteGuardia(token, id)
        .then((res) => {
          alert(res.msg);
        })
        .catch((error) => {
          alert(
            error?.response?.data?.msg ||
              "Ha ocurrido un error, vuelva a intentarlo más tarde",
          );
        });
    }
  };
  const handleChangeState = (id, email, state) => {
    if (window.confirm(`Deseas cambiar el estado del guardia ${email}?`)) {
      adminService
        .changeGuardiaState(token, id, state)
        .then((res) => {
          setRender(!render);
          alert(res.msg);
        })
        .catch((error) => {
          alert(
            error?.response?.data?.msg ||
              "Ha ocurrido un error, vuelva a intentarlo más tarde",
          );
        });
    }
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="mb-5 text-justify flex flex-col">
        <h className="text-4xl text-azul-10 font-bold">Guardias</h>
        <h className="text-1xl text-azul-10">
          Este módulo te permite gestionar guardias.
        </h>
      </div>
      <div className="flex flex-row items-center">
        {isLoading ?
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-2xl text-azul-10">Cargando...</p>
          </div>
        : <div className="container mx-auto px-4 py-8">
            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar por nombre, apellido, cédula, email o teléfono"
                className="w-full px-3 py-2 border-solid border-4 border-negro rounded"
              />
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
        }
        <div className="mt-5 text-center border-solid border-l-2 px-5 border-amarillo-10 ">
          <p className="text-2xl text-azul-10 font-bold">
            Registrar nuevo guardia
          </p>
          <RegistroGuardia setRender={setRender} render={render} />
        </div>
      </div>
    </>
  );
};

export default GuardiasAdminPage;
