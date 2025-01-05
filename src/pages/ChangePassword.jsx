import { useForm } from "react-hook-form";
import { Card, Input, Button, Label, AlertText } from "@components/ui/index";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmarPassword: "",
    },
  });

  const [recoveryToken, setRecoveryToken] = useState(null);
  const location = useLocation();

//   // Endpoints para los tres tipos de usuarios
//   const endpoints = [
//     "http://localhost:4000/api/administrador/recuperar-clave", // Administrador
//     "http://localhost:4000/api/guardias/recuperar-clave", // Guardia
//     "http://localhost:4000/api/recuperar-clave", // Usuario externo
//   ];

//   const endpointsNuevaClave = [
//     "http://localhost:4000/api/administrador/nueva-clave", // Administrador
//     "http://localhost:4000/api/guardias/nueva-clave", // Guardia
//     "http://localhost:4000/api/nueva-clave", // Usuario externo
//   ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    console.log("Token from URL:", tokenFromUrl); // Para depuración

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
     console.log("recoveyToken", recoveryToken);
     console.log("Data Contraseña", data);
     

//    let tokenValid = false;

//    // Iterar a través de los tres endpoints para validar el token
//    for (const endpoint of endpoints) {
//      try {
//        const response = await fetch(`${endpoint}/${recoveryToken}`, {
//          method: "GET",
//          headers: { "Content-Type": "application/json" },
//        });

//        if (response.ok) {
//          tokenValid = true;
//          break; // Si el token es válido en cualquiera de los endpoints, salimos del bucle
//        } else {
//          console.error(
//            `Error de validación en ${endpoint}:`,
//            await response.text(),
//          );
//        }
//      } catch (error) {
//        console.error(`Error al validar token con ${endpoint}:`, error);
//      }
//    }

//    if (!tokenValid) {
//      alert("El token de recuperación es inválido o ha expirado.");
//      return;
//    }

//    const { password, confirmarPassword } = data;

//    // Iterar a través de los tres endpoints para cambiar la contraseña
//    for (const endpoint of endpointsNuevaClave) {
//      try {
//        const response = await fetch(`${endpoint}/${recoveryToken}`, {
//          method: "PUT",
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({ password, confirmarPassword }),
//        });

//        const responseData = await response.json();
//        if (response.ok) {
//          alert(
//            "Contraseña cambiada exitosamente. Ahora puedes iniciar sesión.",
//          );
//          window.location.href = "/signin";
//          return;
//        } else {
//          console.error(
//            `Error al cambiar la contraseña en ${endpoint}:`,
//            responseData,
//          );
//          alert(
//            responseData.message ||
//              "Ocurrió un error al cambiar la contraseña. Inténtalo nuevamente.",
//          );
//        }
//      } catch (error) {
//        console.error(`Error al cambiar la contraseña con ${endpoint}:`, error);
//        alert("Error de red. Por favor, inténtalo más tarde.");
//      }
//    }
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
