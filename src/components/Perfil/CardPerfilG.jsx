import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import adminService from "@/services/adminService";


const CardPerfilG = () => {
  const { token } = useAuth();
  const [user, setUser] = useState({}); // Cambiado a un objeto vacío

  useEffect(() => {
    if (token) {
      adminService.getUser({ token }).then((data) => {
        console.log("data", data);
        setUser(data);
      });
    }
  }, [token]);

  const { nombre, apellido, cedula, email, telefono } = user;

  return (
    <div
      className="border border-slate-200 p-5 
             flex flex-col justify-center gap-y-10 text-2xl shadow-xl rounded-lg h-96"
    >
      <div className="self-start">
        <p>Nombre: {nombre || "No disponible"} </p>
      </div>
      <div className="self-start">
        <p>Apellido: {apellido || "No disponible"} </p>
      </div>
      <div className="self-start">
        <p>Cedula: {cedula || "No disponible"} </p>
      </div>
      <div className="self-start">
        <p>Email: {email || "No disponible"} </p>
      </div>
      <div className="self-start">
        <p>Telefono: {telefono || "No disponible"} </p>
      </div>
    </div>
  );
};

export default CardPerfilG;
