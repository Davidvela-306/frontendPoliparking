import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@context/AuthContext";
import carretera from "@images/carretera.png";
import logoBuho from "@images/logoBuho.png";
import {
  LogoTitle,
  Mensaje,
  Input,
  Button,
  Card,
  Label,
  AlertText,
} from "@components/ui";
import { EyeIcon, EyeSlashIcon } from "@components/ui/icons/index";
import { Link } from "react-router-dom";

const LOGIN_ROLES = [
  { value: "Usuario", label: "Usuario externo" },
  { value: "Administrador", label: "Administrador" },
  { value: "Guardia", label: "Guardia" },
];

/**
 * Component that renders the login screen.
 *
 * The component includes a form with the role, email and password fields.
 * The fields are mandatory and have an additional validation for the email (correct format) and the password (minimum 6 characters).
 * and password (minimum of 6 characters).
 *
 * When selecting a role, the `setRol` function of the `useAuth` hook is called to set the role in the authentication context.
 * in the authentication context.
 *
 When the "Login" button is clicked, the `signin` function of the `useAuth` hook is called with the values of the form and * the `signin` function of the `useAuth` hook is called.
 * with the values of the form and handle errors that may occur during the process.
 *
 * The component also displays an error or success message depending on the result of the process.
 */
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rol: "",
      email: "",
      password: "",
    },
  });

  const [mensaje, setMensaje] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { signin, setRol } = useAuth();

  // Memoized toggle function to prevent unnecessary re-renders
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Handle role change with useEffect removed, using watch directly
  const selectedRol = watch("rol");
  React.useEffect(() => {
    setRol(selectedRol);
  }, [selectedRol, setRol]);

  const onSubmit = async (values) => {
    try {
      const response = await signin(values);
      const { nombre } = response.data;
      setMensaje({
        respuesta: `Bienvenido ${nombre}`,
        tipo: true,
      });
    } catch (error) {
      console.error("Login Error:", error);
      setMensaje({
        respuesta:
          error.response?.data?.msg || "Ha ocurrido un error, intente de nuevo",
        tipo: false,
      });
      reset();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <div className="h-screen lg:w-2/3 bg-celeste-20 flex flex-col items-center justify-center gap-5 px-4 sm:px-10">
        <LogoTitle
          imgSrc={logoBuho}
          imgAlt="Logo"
          text="Poli Parking"
        />

        {mensaje.respuesta && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold text-azul-10">
          Ingresar
        </h1>

        <div className="w-full max-w-md">
          <Card>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full mb-3"
              data-testid="login-form"
            >
              {/* Rol Selection */}
              <div className="w-full flex justify-between mb-1">
                <Label htmlFor="rol" text="Rol" />
                {errors.rol && <AlertText text="Rol es obligatorio" />}
              </div>
              <select
                id="rol"
                className={`w-full p-2 rounded-md border ${
                  selectedRol ? "text-black" : "text-slate-400"
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

              {/* Email Input */}
              <div className="w-full flex justify-between mt-4 mb-1">
                <Label htmlFor="email" text="Email" />
                {errors.email && <AlertText text="El email es obligatorio" />}
              </div>
              <Input
                id="email"
                type="email"
                placeholder="JuanPerez@gmail.com"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
              />

              {/* Password Input */}
              <div className="w-full flex justify-between mt-4 mb-1">
                <Label htmlFor="password" text="Contraseña" />
                {errors.password && (
                  <AlertText
                    text={
                      errors.password.message || "La contraseña es obligatoria"
                    }
                  />
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="***********"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-2 right-3 flex"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ?
                    <EyeSlashIcon size="size-4" />
                  : <EyeIcon size="size-4" />}
                </button>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="mt-6">
                Ingresar
              </Button>
            </form>
            <Link
              to="/recuperar-contrasena"
              className="text-center text-azul-10 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Card>
        </div>
      </div>

      {/* Background Image */}
      <div className="hidden h-0 md:flex md:w-1/3">
        <img
          src={carretera}
          alt="carretera"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
