import { useForm } from "react-hook-form";
import { AlertText, Button, Label, Input } from "@components/ui/index";
import adminService from "@/services/adminService";
import { useAuth } from "@context/AuthContext";

/**
 * Component for registering a new user in the platform.
 *
 * It is responsible for displaying a form so that the administrator can register a new user.
 * After the form is submitted, a request is made to the server to create the user.
 * If the request is successful, the component that is in the `render` state is rendered.
 * If the request fails, an error message is displayed.
 *
 * @param {function} setRender Function to change the `render` state.
 * @param {boolean} render `render` state.
 * @returns {JSX.Element} A form to register a new user.
 */
const RegisterAdminUser = ({ setRender, render }) => {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const USER_ROLES = [
    { value: "administrativo", label: "Administrativo" },
    { value: "docente", label: "Docente" },
  ];

  const onSubmit = async (values) => {
    try {
      const user = { ...values, estado: true };
      const response = await adminService.createExternalUser({ token, user });


      if (response) {
        setRender(!render);
        alert("Usuario creado correctamente");
      } else {
        alert("Error al crear el usuario: no se recibió una respuesta válida");
      }
    } catch (error) {
      console.error("Full error details:", error);
      alert(`Error al crear el usuario: ${error.message}`);
    }
  };

  const fields = [
    { label: "Nombre", name: "nombre", type: "text", placeholder:"Joe" },
    { label: "Apellido", name: "apellido", type: "text", placeholder:"Doe" },
    { label: "Cedula", name: "cedula", type: "number", placeholder:"0498733281" },
    { label: "Email", name: "email", type: "email", placeholder:"joeDoe@gmail.com" },
    { label: "Contraseña", name: "password", type: "password", placeholder:"********" },
    { label: "Telefono", name: "telefono", type: "number", placeholder:"0987654321" },
    { label: "Placa", name: "placa_vehiculo", type: "text", placeholder:"ABC-123" },
    {
      label: "Rol",
      name: "rol",
      type: "select",
    },
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
            {field.type === "select" ?
              <select
                className={`w-1/2 rounded-md p-2 border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
                {...register(field.name, {
                  required: "Este campo es obligatorio",
                })}
              >
                <option value="" disabled hidden>
                  Seleccione un rol
                </option>
                {USER_ROLES.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            : <Input
                type={field.type}
                placeholder={field.placeholder}
                className={` border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-md p-2`}
                {...register(field.name, {
                  required: "Este campo es obligatorio",
                })}
              />
            }
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

export default RegisterAdminUser;
