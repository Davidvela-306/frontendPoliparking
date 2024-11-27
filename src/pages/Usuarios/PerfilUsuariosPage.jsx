import { useState } from "react";
import {
  CardPerfilU,
  FormularioU,
  ActualizarContraseña,
} from "@components/Perfil/index";

const PerfilUsuarios = () => {
  const [formType, setFormType] = useState(null);

  const showPerfilForm = () => {
    setFormType("perfil");
  };

  const showPasswordForm = () => {
    setFormType("contraseña");
  };

  const hideForms = () => {
    setFormType(null);
  };

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-gray-500">Perfil</h1>
        <hr className="my-4" />
      </div>

      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/128/8931/8931935.png"
          alt="img-client"
          className="m-auto pb-10"
          width={120}
          height={120}
        />
      </div>

      <div className="flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <CardPerfilU />
        </div>
        {formType === "perfil" && (
          <div className="w-full md:w-1/2">
            <FormularioU />
          </div>
        )}
      </div>
      <br />
      <br />

      <div className="text-center mb-4">
        <button
          type="button"
          className="bg-cyan-600 hover:bg-cyan-900 text-white font-bold py-3 px-5 rounded"
          onClick={formType === "perfil" ? hideForms : showPerfilForm}
        >
          {formType === "perfil" ? "Cancelar" : "Actualizar"}
        </button>
      </div>

      <div className="flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap">
        {formType === "contraseña" && (
          <div className="w-full md:w-1/2">
            <ActualizarContraseña />
          </div>
        )}
      </div>
      <br />
      <div className="text-center mb-4">
        <button
          type="button"
          className="bg-cyan-600 hover:bg-cyan-900 text-white font-bold py-3 px-5 rounded"
          onClick={formType === "contraseña" ? hideForms : showPasswordForm}
        >
          {formType === "contraseña" ? "Cancelar" : "Actualizar Contraseña"}
        </button>
      </div>
    </>
  );
};

export default PerfilUsuarios;
