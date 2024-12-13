import { useForm } from "react-hook-form";
import { AlertText, Button, Label, Input } from "@components/ui/index";
import { useAuth } from "../../context/AuthContext";
import adminService from "@/services/adminService";

/**
 * Component for registering a new Guard in the platform.
 *
 * It is responsible for displaying a form so that the administrator can register a new guard.
 * After the form is submitted, a request is made to the server to create the guard.
 * If the request is successful, the component that is in the `render` state is rendered.
 * If the request fails, an error message is displayed.
 *
 * @param {function} setRender Function to change the `render` state.
 * @param {boolean} render `render` state.
 * @returns {JSX.Element} A form to register a new guard.
 */
const RegistroGuardia = ({ setRender, render }) => {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (values) => {
    try {
      const user = { ...values, estado: true };
      console.log("Sending user data:", user);
      const response = await adminService.createGuardia({ token, user });

      console.log("Received response:", response);

      if (response) {
        setRender(!render);
        alert("Guardia creado correctamente");
      } else {
        alert("Error al crear el Guardia: no se recibió una respuesta válida");
      }
    } catch (error) {
      console.error("Full error details:", error);
      alert(`Error al crear el Guardia: ${error.message}`);
    }
  };

  const fields = [
    { label: "Nombre", name: "nombre", type: "text" },
    { label: "Apellido", name: "apellido", type: "text" },
    { label: "Cédula", name: "cedula", type: "number" },
    { label: "Email", name: "email", type: "email" },
    { label: "Contraseña", name: "password", type: "password" },
    { label: "Teléfono", name: "telefono", type: "number" },
  ];

  return (
    <div className="flex flex-col w-full gap-4 align-middle justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        {fields.map((field, index) => (
          <div key={index} className="w-full flex justify-between my-1">
            <Label
              text={field.label}
              className="flex text-azul-10 justify-center items-center"
            />
            <Input
              type={field.type}
              placeholder={field.label}
              className={`border ${
                errors[field.name] ? "border-red-500" : "border-gray-300"
              } rounded-md p-2`}
              {...register(field.name, {
                required: "Este campo es obligatorio",
              })}
            />
          </div>
        ))}
        {Object.keys(errors).length > 0 && (
          <AlertText text="Debe llenar todos los campos correctamente" />
        )}
        <Button type="submit" disabled={!isValid}>
          Registrar
        </Button>
      </form>
    </div>
  );
};

export default RegistroGuardia;
