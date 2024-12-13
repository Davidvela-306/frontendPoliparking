import { FormularioG, CardPerfilG } from "@components/Perfil/index";
import { Heading } from "@/components/ui/text";

const PerfilGuardiasPage = () => {
  return (
    <div className=" mt-10 flex flex-col items-center justify-start ">
      <div className="mb-6 w-full">
        <Heading level={4}>Perfil</Heading>
        <Heading level={1}>
          Este módulo te permite gestionar tu perfil personal.
        </Heading>
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
