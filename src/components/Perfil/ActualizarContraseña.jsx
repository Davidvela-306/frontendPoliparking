import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@context/AuthContext";
import { AlertText } from "@components/ui/index";
import { Input, Button, Label } from "@components/ui";
import { fetchPut } from "@helpers/request_functions";
import { baseUsuarios, baseGuardias } from "@helpers/instances_routes";
import CustomAlert from "@components/ui/CustomAlert";

const ActualizarContraseña = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token, rol } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
    try {
      setError(null);
      setSuccess(null);
      const base = rol === "Usuario" ? baseUsuarios : baseGuardias;
      const jsonData = JSON.stringify(values);
      const res = await fetchPut(base, `/actualizar-clave`, jsonData, token);
      setSuccess(res.data.msg || "Contraseña actualizada exitosamente");
      reset(); // Limpia el formulario después de un éxito
    } catch (error) {
      setError(
        error.response?.data?.msg || "Error al actualizar la contraseña",
      );
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {error && <CustomAlert type="error" message={error} />}
      {success && <CustomAlert type="success" message={success} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full space-y-4"
      >
        <div className="w-full flex justify-between">
          <Label text="Contraseña actual" />
          {errors.actualPassword && (
            <AlertText text="El campo es obligatorio" />
          )}
        </div>
        <Input
          type="password"
          placeholder="********"
          {...register("actualPassword", { required: true })}
        />

        <div className="w-full flex justify-between">
          <Label text="Nueva contraseña" />
          {errors.nuevoPassword && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="password"
          placeholder="********"
          {...register("nuevoPassword", { required: true })}
        />

        <Button type="submit">Actualizar contraseña</Button>
      </form>
    </div>
  );
};

export default ActualizarContraseña;
