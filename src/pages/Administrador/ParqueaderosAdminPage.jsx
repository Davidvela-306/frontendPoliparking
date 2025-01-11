import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ParkingSpacesGraph } from "@/components/common";
import adminService from "@/services/adminService";
import { useAuth } from "@context/AuthContext";
import { Input, Label, Button, AlertText, Card } from "@components/ui";
import parkingService from "@/services/parkingService";

const ParqueaderosAdminPage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [especialSpaceState, setEspecialSpaceState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    setIsLoading(true);

    parkingService.getParking().then((response) => {
      setParkingSpaces(response);
      if (response && response.length > 0 && response[0].espacios) {
        setEspecialSpaceState(response[0].espacios[5].estado);
      }
      setIsLoading(false);
    });
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      description: "",
      planta: "",
      bloque: "",
    },
  });

  const onSubmit = (data) => {
    parkingService
      .updateParking(token, parkingSpaces[0]._id, data)
      .then(() => {
        // Actualizar el estado local inmediatamente
        setParkingSpaces((prevSpaces) =>
          prevSpaces.map((space) =>
            space._id === parkingSpaces[0]._id ? { ...space, ...data } : space,
          ),
        );

        setSubmitted(true);
        reset();

        // Actualizar los datos desde el servidor como respaldo
        adminService.getParqueaderos({ token }).then((response) => {
          setParkingSpaces(response);
          if (response && response.length > 0 && response[0].espacios) {
            setEspecialSpaceState(response[0].espacios[5].estado);
          }
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (parkingSpaces.length === 0) {
    return <p>No hay parqueaderos cargados en el sistema</p>;
  }

  return (
    <div className="p-4">
      <div className="mb-5 text-center flex flex-row gap-4 justify-between items-center">
        <div className="mb-5 text-justify flex flex-col">
          <h1 className="text-4xl text-azul-10 font-bold">
            Plazas de estacionamiento
          </h1>
          <p className="text-1xl text-azul-10">
            {parkingSpaces && parkingSpaces.length > 0 ?
              `Este módulo te permite gestionar las plazas de estacionamiento del parqueadero ${parkingSpaces[0].nombre}.`
            : "No hay parqueaderos cargados en el sistema"}
          </p>
        </div>
      </div>

      {parkingSpaces.map((parkingSpace) => (
        <div className="flex h-[70vh] gap-4" key={parkingSpace._id}>
          {/* Gráfico del parqueadero - ahora ocupa 3/4 del espacio */}
          <div className="w-3/4 border-solid border-2 border-azul-20 rounded-lg p-4">
            {parkingSpace.estado ?
              <ParkingSpacesGraph
                spaces={parkingSpace.espacios}
                specialSpaceState={especialSpaceState}
              />
            : <div className="flex justify-center items-center h-full">
                <div className="text-red-500 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                  <p className="text-2xl font-bold">PARQUEADERO RESERVADO</p>
                  <p className="text-lg font-thin text-white-50">
                    No disponible para estacionamiento
                  </p>
                </div>
              </div>
            }
          </div>

          {/* Formulario de actualización - ahora ocupa 1/4 del espacio */}
          <div className="w-1/4 rounded-lg p-4 border border-blue-200 bg-sky-200 shadow-sm flex justify-center items-center">
            <Card className="bg-white w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-4"
              >
                {/* Nombre */}
                <div className="space-y-1">
                  <Label
                    text="Nombre del parqueadero"
                    className="text-gray-700 font-medium"
                  />
                  <Input
                    type="text"
                    placeholder="ESFOT"
                    className="w-full px-3 py-1 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  {errors.nombre && <AlertText text={errors.nombre.message} />}
                </div>

                {/* Descripción */}
                <div className="space-y-1">
                  <Label
                    text="Descripción"
                    className="text-gray-700 font-medium"
                  />
                  <Input
                    type="text"
                    placeholder="Parqueadero de la ESFOT"
                    className="w-full px-3 py-1 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    {...register("description", {
                      required: "La descripción es obligatoria",
                    })}
                  />
                  {errors.description && (
                    <AlertText text={errors.description.message} />
                  )}
                </div>

                {/* Grid para Planta y Bloque */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Planta */}
                  <div className="space-y-1">
                    <Label
                      text="Planta"
                      className="text-gray-700 font-medium"
                    />
                    <Input
                      type="text"
                      placeholder="1"
                      className="w-full px-3 py-1 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      {...register("planta", {
                        required: "La planta es obligatoria",
                      })}
                    />
                    {errors.planta && (
                      <AlertText text={errors.planta.message} />
                    )}
                  </div>

                  {/* Bloque */}
                  <div className="space-y-1">
                    <Label
                      text="Bloque"
                      className="text-gray-700 font-medium"
                    />
                    <Input
                      type="text"
                      placeholder="A"
                      className="w-full px-3 py-1 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      {...register("bloque", {
                        required: "El bloque es obligatorio",
                      })}
                    />
                    {errors.bloque && (
                      <AlertText text={errors.bloque.message} />
                    )}
                  </div>
                </div>

                {/* Botón de envío */}
                {submitted && (
                  <div className="flex justify-center">
                    <p className="text-green-500 font-bold text-sm">
                      Parqueadero actualizado correctamente
                    </p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
                >
                  Actualizar Parqueadero
                </Button>
              </form>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParqueaderosAdminPage;
