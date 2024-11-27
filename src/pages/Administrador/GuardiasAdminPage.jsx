import { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import { fetchGet } from "@helpers/request_functions";
import { baseAdmin } from "@helpers/instances_routes";
import { RegistroGuardia } from "@components/Perfil/index";

const GuardiasAdminPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [formType, setFormType] = useState(null);

  useEffect(() => {
    if (token) {
      getUsers();
    }
  }, [token]);

  const getUsers = async () => {
    try {
      const response = await fetchGet(baseAdmin, "/listar-guardias", token);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const showPerfilForm = () => {
    setFormType("perfil");
  };

  const hideForms = () => {
    setFormType(null);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 text-azul-10">Guardias</h1>
      <div className="h-[90vh]">
        <div className="text-center mb-4">
          <button
            type="button"
            className="bg-green-700 hover:bg-green-500 text-white font-bold py-3 px-5 rounded"
            onClick={formType === "perfil" ? hideForms : showPerfilForm}
          >
            {formType === "perfil" ? "Cancelar" : "Registrar Guardia"}
          </button>
        </div>
        <hr />
        {formType === "perfil" && (
          <div className="w-full md:w-1/2 mx-auto mt-4">
            <RegistroGuardia />
          </div>
        )}
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead className="bg-azul-20 text-white border-solid border-t-2 border-gray-300">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Nombre</th>
              <th className="px-4 py-2 text-left font-semibold">Apellido</th>
              <th className="px-4 py-2 text-left font-semibold">Cédula</th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className="hover:bg-gray-100 border-solid border-t-2 border-gray-300"
                key={user._id}
              >
                <td className="px-4 py-2 border-b border-gray-300">
                  {user.nombre}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {user.apellido}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {user.cedula}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {user.telefono}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GuardiasAdminPage;
