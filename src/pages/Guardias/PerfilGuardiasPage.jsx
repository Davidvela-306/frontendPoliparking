import { useState } from "react";
import { FormularioG, CardPerfilG } from "@components/Perfil/index";

const PerfilGuardiasPage = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">Perfil</h1>
        <hr className="my-4" />
      </div>

      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4898/4898073.png"
          alt="img-client"
          className="m-auto"
          width={120}
          height={120}
        />
      </div>

      <div className="flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <CardPerfilG />
        </div>
        {showForm && (
          <div className="w-full md:w-1/2">
            <FormularioG />
          </div>
        )}
      </div>
      <br />
      <br />
      <div className="text-center mb-4">
        <button
          type="button"
          className="bg-cyan-600 hover:bg-cyan-900 text-white font-bold py-3 px-5 rounded"
          onClick={toggleForm}
        >
          {showForm ? "Cancelar" : "Actualizar"}
        </button>
      </div>
    </>
  );
};

export default PerfilGuardiasPage;
