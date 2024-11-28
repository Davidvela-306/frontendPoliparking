import { FormularioG, CardPerfilG } from "@components/Perfil/index";
import { Heading } from "@/components/ui/text";

const PerfilGuardiasPage = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center ">
      <div className="text-center mb-6">
        <Heading level={4}>Perfil</Heading>
        <Heading level={1}>
          Aquí Puedes ver tus datos de perfil y actualizarlos
        </Heading>
      </div>

      <div className="flex justify-center align-center flex-row gap-8 md:gap-12 w-full max-w-7xl mx-auto">
        {/* Card Perfil */}
        <div className="flex-1 h-full self-center justify-center">
          <CardPerfilG />
        </div>

        {/* Formulario */}
        <div className="flex-1 h-full self-center">
          <FormularioG />
        </div>
      </div>
    </div>
  );
};

export default PerfilGuardiasPage;
