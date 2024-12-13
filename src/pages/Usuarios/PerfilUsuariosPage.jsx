import {
  CardPerfilU,
  FormularioU,
  ActualizarContraseña,
} from "@components/Perfil/index";
import { Heading } from "@/components/ui/text";

const PerfilUsuarios = () => {
  return (
    <div className=" mt-10 flex flex-col items-center justify-start ">
      <div className="mb-6 w-full">
        <Heading level="4">Perfil</Heading>
        <Heading level="1">
          Este módulo te permite gestionar tu perfil personal.
        </Heading>
      </div>

      <div className="flex justify-center align-center flex-row gap-8 md:gap-12 w-full max-w-7xl mx-auto">
        {/* Card Perfil */}
        <div className="flex-1 self-center justify-center">
          <CardPerfilU />
          <br />
          <div className="flex-1 justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap">
            <ActualizarContraseña />
          </div>
        </div>

        {/* Formulario */}
        <div className="flex-1 self-end">
          <FormularioU />
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuarios;
