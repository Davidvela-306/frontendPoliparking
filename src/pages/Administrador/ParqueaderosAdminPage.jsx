import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ParkingSpacesGraph } from "@/components/common";
import adminService from "@/services/adminService";
import { useAuth } from "@context/AuthContext";

import { Input, Label, Button, AlertText, Card } from "@components/ui";
import parkingService from "@/services/parkingService";

const ParqueaderosAdminPage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
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
  } = useForm({
    defaultValues: {
      nome: "",
      description: "",
      planta: "",
      bloque: "",
      tipo: "",
      espacios: "",
    },
  });
  console.log("parkingSpaces", parkingSpaces);

  const onSubmit = (data) => {
    console.log(data)
    parkingService.updateParking(token, parkingSpaces[0]._id, data);
    
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
        <div>
          <button className="bg-azul-10 text-white px-4 py-2 rounded">
            Cambiar estado de parqueadero
          </button>
        </div>
      </div>

      {parkingSpaces.map((parkingSpace) => (
        <div className="flex h-[70vh] gap-4" key={parkingSpace._id}>
          {/* Gráfico del parqueadero */}
          <div className="flex-1 border-solid border-2 border-azul-20 rounded-lg p-4">
            <ParkingSpacesGraph spaces={parkingSpace.espacios} />
          </div>

          {/* Formulario de actualización */}
          <div className="flex-1 rounded-lg p-4 border border-azul-20 bg-gray-200">
            <Card>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                {/* Nome */}
                <div>
                  <Label text="Nombre del parqueadero" />
                  <Input
                    type="text"
                    placeholder="ESFOT"
                    {...register("nome", {
                      required: "El nombre es obligatorio",
                    })}
                  />
                  {errors.nome && <AlertText text={errors.nome.message} />}
                </div>

                {/* Descripción */}
                <div>
                  <Label text="Descripción" />
                  <Input
                    type="text"
                    placeholder="Parqueadero de la ESFOT"
                    {...register("description", {
                      required: "La descripción es obligatoria",
                    })}
                  />
                  {errors.description && (
                    <AlertText text={errors.description.message} />
                  )}
                </div>

                {/* Planta */}
                <div>
                  <Label text="Planta" />
                  <Input
                    type="text"
                    placeholder="1"
                    {...register("planta", {
                      required: "La planta es obligatoria",
                    })}
                  />
                  {errors.planta && <AlertText text={errors.planta.message} />}
                </div>

                {/* Bloque */}
                <div>
                  <Label text="Bloque" />
                  <Input
                    type="text"
                    placeholder="A"
                    {...register("bloque", {
                      required: "El bloque es obligatorio",
                    })}
                  />
                  {errors.bloque && <AlertText text={errors.bloque.message} />}
                </div>

                {/* Tipo de vehículo */}
                <div>
                  <Label text="Tipo de vehículo" />
                  <select
                    {...register("tipo", {
                      required: "El tipo de vehículo es obligatorio",
                    })}
                    className="w-full p-2 rounded-md border"
                  >
                    <option value="" disabled hidden>
                      Seleccione un tipo de vehículo
                    </option>
                    <option value="moto">Moto</option>
                    <option value="vehiculo">Vehículo</option>
                  </select>
                  {errors.tipo && <AlertText text={errors.tipo.message} />}
                </div>

                {/* Espacios */}
                <div>
                  <Label text="Número de espacios" />
                  <Input
                    type="number"
                    placeholder="7"
                    {...register("espacios", {
                      required: "El número de espacios es obligatorio",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.espacios && (
                    <AlertText text={errors.espacios.message} />
                  )}
                </div>

                {/* Botón de envío */}
                <Button type="submit" className="mt-4">
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
