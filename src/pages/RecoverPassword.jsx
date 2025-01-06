import { useForm } from "react-hook-form";
import { Card, Input, Button, Label, AlertText } from "@components/ui/index";

const RecoverPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

const endpoints = [
  "http://localhost:4000/api/recuperar-clave",
  "http://localhost:4000/api/guardias/recuperar-clave",
  "http://localhost:4000/api/administrador/recuperar-clave",
];

const onSubmit = async (data) => {
  const email = data.email;
  let success = false;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Correo de recuperación enviado exitosamente.");
        success=true;
        
        break;
      }
    } catch (error) {
      console.error(`Error al intentar con el endpoint ${endpoint}:`, error);
    }
  }

  if (!success) {
    alert(
      "No se pudo enviar el correo de recuperación. Verifica el correo ingresado o intenta más tarde.",
    );
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-400">
      <Card className="p-6 w-full max-w-md shadow-xl bg-white rounded-lg">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Recupera tu Contraseña
        </h1>
        {/* Description */}
        <p className="text-sm text-center text-gray-600 mb-4">
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          {/* Email Input */}
          <div className="w-full flex justify-between items-center mt-4 mb-2">
            <Label text="Correo Electrónico" className="text-gray-700" />
            {errors.email && (
              <AlertText
                text={errors.email.message}
                className="text-red-500 text-sm"
              />
            )}
          </div>
          <Input
            type="email"
            placeholder="ejemplo@correo.com"
            className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo electrónico no válido",
              },
            })}
          />
          <br />

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Enviar correo de recuperación
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RecoverPassword;
