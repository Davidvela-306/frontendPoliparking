import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { AlertText } from "../../components/ui/AlertText";
import { Input, Button, Label } from "../../components/ui";
import { fetchPut } from "../../helpers/request_functions";
import { baseUsuarios } from "../../helpers/instances_routes";
const FormularioU = () => {
  const { user, token, setToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    try {
      const response = await fetchPut(
        baseUsuarios,
        `/${user._id}`,
        values,
        token,
      );
      console.log(response);
      setToken(token);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="w-full flex justify-between">
          <Label text="Nombre" />
          {errors.nombre && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="nombre"
          placeholder="Juan"
          {...register("nombre", { required: true })}
        />

        <div className="w-full flex justify-between">
          <Label text="Apellido" />
          {errors.apellido && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="apellido"
          placeholder="Perez"
          {...register("apellido", { required: true })}
        />

        <div className="w-full flex justify-between">
          <Label text="Email" />
          {errors.email && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="email"
          placeholder="Juan@gmail.com"
          {...register("email", { required: true })}
        />

        <div className="w-full flex justify-between">
          <Label text="Placa del vehículo" />
          {errors.apellido && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="string"
          placeholder="AAA-222"
          {...register("placa_vehiculo", { required: true })}
        />

        <div className="w-full flex justify-between">
          <Label text="Teléfono" />
          {errors.telefono && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="number"
          placeholder="0998645878"
          {...register("telefono", { required: true })}
        />

        <Button type="submit">Actualizar Perfil</Button>
      </form>
    </>
  );
};

export default FormularioU;
