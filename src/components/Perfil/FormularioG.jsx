import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { AlertText } from "../../components/ui/AlertText";
import { Input, Button, Label } from "../../components/ui";
import CustomAlert from "@components/ui/CustomAlert";
import { fetchPut } from "../../helpers/request_functions";
import { baseGuardias } from "../../helpers/instances_routes";

const FormularioG = ({ onUpdateSuccess }) => {
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState(null);

  const onSubmit = async (values) => {
    try {
      await fetchPut(baseGuardias, `/${user._id}`, values, token);
      setAlert({
        type: "success",
        message: "Teléfono actualizado exitosamente",
      });
      onUpdateSuccess();
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } catch (error) {
      console.error(error);
      setAlert({ type: "error", message: "Error al actualizar el teléfono" });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  return (
    <div className="w-full">
      {alert && <CustomAlert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="w-full flex justify-between">
          <Label text="Telefono" />
          {errors.telefono && <AlertText text="El campo es obligatorio" />}
        </div>
        <Input
          type="number"
          placeholder="0999999999"
          {...register("telefono", { required: true })}
        />
        <Button type="submit">Actualizar teléfono</Button>
      </form>
    </div>
  );
};

export default FormularioG;
