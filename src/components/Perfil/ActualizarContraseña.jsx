import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@context/AuthContext";
import { AlertText } from "@components/ui/index";
import { Input, Button, Label } from "@components/ui";
import { fetchPut } from "@helpers/request_functions";
import { baseUsuarios, baseGuardias } from "@helpers/instances_routes";
import CustomAlert from "@components/ui/CustomAlert";
import { EyeSlashIcon } from "../ui/icons";
import { EyeIcon } from "lucide-react";

const ActualizarContraseña = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  const { token, rol } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const togglePasswordVisibilityOne = useCallback(() => {
    setShowPasswordOne((prev) => !prev);
  }, []);

  const togglePasswordVisibilityTwo = useCallback(() => {
    setShowPasswordTwo((prev) => !prev);
  }, []);

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
        <div className="relative">
          <Input
            type={showPasswordOne ? "text" : "password"}
            placeholder="********"
            {...register("actualPassword", {
              required: true,
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          <button
            type="button"
            onClick={togglePasswordVisibilityOne}
            className="absolute inset-y-2 right-3 flex"
            aria-label={
              showPasswordOne ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPasswordOne ?
              <EyeSlashIcon size="size-4" />
            : <EyeIcon size="size-4" />}
          </button>
        </div>

        <div className="w-full flex justify-between">
          <Label text="Nueva contraseña" />
          {errors.nuevoPassword && <AlertText text="El campo es obligatorio" />}
        </div>
        <div className="relative ">
          <Input
            type={showPasswordTwo ? "text" : "password"}
            placeholder="********"
            {...register("nuevoPassword", {
              required: true,
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          <button
            type="button"
            onClick={togglePasswordVisibilityTwo}
            className="absolute inset-y-2 right-3 flex"
            aria-label={
              showPasswordTwo ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPasswordTwo ?
              <EyeSlashIcon size="size-4" />
            : <EyeIcon size="size-4" />}
          </button>
        </div>

        <Button type="submit">Actualizar contraseña</Button>
      </form>
    </div>
  );
};

export default ActualizarContraseña;
