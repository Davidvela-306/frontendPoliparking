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
  const { token } = useAuth();

  useEffect(() => {
    adminService.getParqueaderos({ token }).then((response) => {
      setParkingSpaces(response);
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
      tipo: "",
      espacios: "",
    },
  });
  console.log("parkingSpaces", parkingSpaces);

  const onSubmit = (data) => {
    console.log(data);
    const objToSend = {
      ...data,
      //  TODO:  ELIMINAR ESTOS CAMPOS DESDE EL BACK Y FRONT:
      tipo: "Automóvil y motos",
      espacios: 9,
      estado: true,
    };
    parkingService
      .updateParking(token, parkingSpaces[0]._id, objToSend)
      .then(() => {
        setSubmitted(true);
        reset();
        // Actualiza la información del parqueadero en la pantalla
        adminService.getParqueaderos({ token }).then((response) => {
          setParkingSpaces(response);
        });
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!parkingSpaces) {
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
          {/* Gráfico del parqueadero */}
          <div className="flex-1 border-solid border-2 border-azul-20 rounded-lg p-4">
            <ParkingSpacesGraph spaces={parkingSpace.espacios} />
          </div>

          {/* Formulario de actualización */}
          <div className="flex-1 rounded-lg p-8 border border-blue-200 bg-sky-200 shadow-sm flex justify-center items-center">
            <Card className="bg-white w-full max-w-md">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 p-4"
              >
                {/* Nombre */}
                <div className="space-y-2">
                  <Label
                    text="Nombre del parqueadero"
                    className="text-gray-700 font-medium"
                  />
                  <Input
                    type="text"
                    placeholder="ESFOT"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  {errors.nombre && <AlertText text={errors.nombre.message} />}
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <Label
                    text="Descripción"
                    className="text-gray-700 font-medium"
                  />
                  <Input
                    type="text"
                    placeholder="Parqueadero de la ESFOT"
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    {...register("description", {
                      required: "La descripción es obligatoria",
                    })}
                  />
                  {errors.description && (
                    <AlertText text={errors.description.message} />
                  )}
                </div>

                {/* Grid para Planta y Bloque */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Planta */}
                  <div className="space-y-2">
                    <Label
                      text="Planta"
                      className="text-gray-700 font-medium"
                    />
                    <Input
                      type="text"
                      placeholder="1"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      {...register("planta", {
                        required: "La planta es obligatoria",
                      })}
                    />
                    {errors.planta && (
                      <AlertText text={errors.planta.message} />
                    )}
                  </div>

                  {/* Bloque */}
                  <div className="space-y-2">
                    <Label
                      text="Bloque"
                      className="text-gray-700 font-medium"
                    />
                    <Input
                      type="text"
                      placeholder="A"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                {
                  //formulario enviado correctamente
                  submitted && (
                    <div className="flex justify-center">
                      <p className="text-green-500 font-bold">
                        Parqueadero actualizado correctamente
                      </p>
                    </div>
                  )
                }
                <Button
                  type="submit"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
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
