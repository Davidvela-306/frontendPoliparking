import { useForm } from "react-hook-form";
import { useAuth } from "@context/AuthContext";
import { AlertText } from "@components/ui/index";
import { Input, Button, Label } from "@components/ui";
import { fetchPut } from "@helpers/request_functions";
import { baseUsuarios } from "@helpers/instances_routes";
const ActualizarContraseña = () => {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    try {
      console.log("values", values);
      const jsonData = JSON.stringify(values);
      console.log("jsonData", jsonData);
      const response = await fetchPut(
        baseUsuarios,
        `/actualizar-password`,
        jsonData,
        token,
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="w-full flex justify-between ">
          <Label text="Contraseña actual" />
          {errors.nombre && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="contraseña"
          placeholder="********"
          {...register("actualPassword", { required: true })}
        />

        <div className="w-full flex justify-between">
          <Label text="Nueva contraseña" />
          {errors.apellido && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="contraseña"
          placeholder="********"
          {...register("nuevoPassword", { required: true })}
        />
        <Button type="submit">Actualizar Contraseña</Button>
      </form>
    </>
  );
};

export default ActualizarContraseña;
