import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchGet } from "../../helpers/request_functions";
import { baseUsuarios } from "../../helpers/instances_routes";
const CardPerfilU = () => {
  const { token } = useAuth();
  const [user, setUser] = useState([]);
  console.log(token);

  useEffect(() => {
    getUser();
  }, [token]);

  const getUser = async () => {
    try {
      const response = await fetchGet(baseUsuarios, "/perfil", token);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("user: ", user);
  const { nombre, apellido, email, placa_vehiculo, telefono } = user;
  return (
    <div
      className="border border-slate-200 p-5 
             flex flex-col justify-center gap-y-10 text-2xl shadow-xl rounded-lg  h-96"
    >
      <div className="self-start">
        <p>Nombre: {nombre} </p>
      </div>
      <div className="self-start">
        <p>Apellido: {apellido} </p>
      </div>
      <div className="self-start">
        <p>Email: {email}</p>
      </div>
      <div className="self-start">
        <p>Placa_vehiculo: {placa_vehiculo} </p>
      </div>
      <div className="self-start">
        <p>Telefono: {telefono} </p>
      </div>
    </div>
  );
};

export default CardPerfilU;
