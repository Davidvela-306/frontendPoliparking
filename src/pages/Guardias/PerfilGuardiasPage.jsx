import { FormularioG, CardPerfilG } from "@components/Perfil/index";

const PerfilGuardiasPage = () => {
  return (
    <div className=" mt-10 flex flex-col items-center justify-start ">
      <div className="mb-5 text-justify flex flex-col">
        <h className="text-4xl text-azul-10 font-bold">Perfil</h>
        <h className="text-1xl text-azul-10">
          Este módulo te permite gestionar tu perfil personal.
        </h>
      </div>

      <div className="flex justify-center align-center flex-row gap-8 md:gap-12 w-full max-w-7xl mx-auto">
        {/* Card Perfil */}
        <div className="flex-1 self-center justify-center">
          <CardPerfilG />
          <br />
          <div className="flex-1 justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap"></div>
        </div>

        {/* Formulario */}
        <div className="flex-1 self-end">
          <FormularioG />
        </div>
      </div>
    </div>
  );
};

export default PerfilGuardiasPage;
