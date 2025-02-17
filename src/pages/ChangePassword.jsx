import { useForm } from "react-hook-form";
import { Card, Input, Button, Label, AlertText } from "@components/ui/index";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import adminService from "@/services/adminService";
import guardiaService from "@/services/guardiaService";
import userService from "@/services/userService";

const LOGIN_ROLES = [
  { value: "Usuario", label: "Usuario externo" },
  { value: "Administrador", label: "Administrador" },
  { value: "Guardia", label: "Guardia" },
];

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      rol: "", // Añadir el rol en los valores predeterminados
      password: "",
      confirmarPassword: "",
    },
  });

  const [recoveryToken, setRecoveryToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");

    if (tokenFromUrl) {
      setRecoveryToken(tokenFromUrl);
    }
  }, [location]);

  const onSubmit = async (data) => {
    if (!recoveryToken) {
      alert("El token de recuperación es inválido o no está disponible.");
      window.location.href = "/recuperar-contrasena";
      return;
    }

    const { rol } = data;

    if (rol === "Guardia") {
      guardiaService
        .confirmChangePassword(recoveryToken)
        .then(() => {
          return guardiaService.recoverPassword(data, recoveryToken);
        })
        .then(() => {
          alert(
            "Contraseña cambiada exitosamente. Inicia sesión con tu nueva contraseña.",
          );
          window.location.href = "/singin";
        })
        .catch((error) => {
          alert(
            error?.response?.data?.msg ||
              "Ha ocurrido un error, vuelva a intentarlo más tarde",
          );
        });
    }

    if (rol === "Administrador") {
      adminService
        .confirmChangePassword(recoveryToken)
        .then(() => {
          return adminService.recoverPassword(data, recoveryToken);
        })
        .then(() => {
          alert(
            "Contraseña cambiada exitosamente. Inicia sesión con tu nueva contraseña.",
          );
          window.location.href = "/singin";
        })
        .catch((error) => {
          alert(
            error?.response?.data?.msg ||
              "Ha ocurrido un error, vuelva a intentarlo más tarde",
          );
        });
    }

    if (rol === "Usuario") {
      userService
        .confirmChangePassword(recoveryToken)
        .then(() => {
          return userService.recoverPassword(data, recoveryToken);
        })
        .then(() => {
          alert(
            "Contraseña cambiada exitosamente. Inicia sesión con tu nueva contraseña.",
          );
          window.location.href = "/singin";
        })
        .catch((error) => {
          alert(
            error?.response?.data?.msg ||
              "Ha ocurrido un error, vuelva a intentarlo más tarde",
          );
        });
    }
  };

  const watchPassword = watch("password", "");

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-400">
      <Card className="p-6 w-full max-w-md shadow-xl bg-white rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Cambiar Contraseña
        </h1>
        <p className="text-sm text-center text-gray-600 mb-4">
          Ingresa una nueva contraseña y confirma el cambio.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          {/* Rol Selection */}
          <div className="w-full flex justify-between mt-4 mb-1">
            <Label text="Rol" />
            {errors.rol && <AlertText text="Rol es obligatorio" />}
          </div>
          <select
            className={`w-full p-2 rounded-md border ${
              watch("rol") ? "text-black" : "text-slate-400"
            }`}
            {...register("rol", { required: true })}
          >
            <option value="" disabled hidden>
              Seleccione un rol
            </option>
            {LOGIN_ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>

          {/* Nueva Contraseña */}
          <div className="w-full flex justify-between items-center mt-4 mb-2">
            <Label text="Nueva Contraseña" className="text-gray-700" />
            {errors.password && (
              <AlertText
                text={errors.password.message}
                className="text-red-500 text-sm"
              />
            )}
          </div>
          <Input
            type="password"
            placeholder="Escribe tu nueva contraseña"
            className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres.",
              },
            })}
          />

          {/* Confirmar Contraseña */}
          <div className="w-full flex justify-between items-center mt-4 mb-2">
            <Label text="Confirmar Contraseña" className="text-gray-700" />
            {errors.confirmarPassword && (
              <AlertText
                text={errors.confirmarPassword.message}
                className="text-red-500 text-sm"
              />
            )}
          </div>
          <Input
            type="password"
            placeholder="Confirma tu nueva contraseña"
            className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            {...register("confirmarPassword", {
              required: "La confirmación de la contraseña es obligatoria",
              validate: (value) =>
                value === watchPassword || "Las contraseñas no coinciden",
            })}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Cambiar contraseña
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
