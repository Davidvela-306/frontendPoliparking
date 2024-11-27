import { CustomLink } from "@components/ui/index";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-azul-10 px-4">
      <div className="p-4 sm:p-8 lg:p-10 border-solid border-2 border-amarillo-10 rounded-lg text-center">
        {/* Título */}
        <p className="text-3xl sm:text-5xl lg:text-6xl text-celeste-10 pb-6">
          NotFound - 404
        </p>

        {/* Enlace */}
        <div className="flex justify-center">
          <CustomLink
            route="/"
            text="Volver al inicio"
            className="!text-white text-sm sm:text-base lg:text-lg hover:!text-amarillo-10 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
