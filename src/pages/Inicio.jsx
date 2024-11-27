import { useAuth } from "@/context/AuthContext";
const Inicio = () => {
  const { user } = useAuth();
  console.log("user", user);
  return (
    <>
      <div className="relative w-full flex justify-center items-center h-[80vh]  bg-opacity-50">
        {/* Texto sobrepuesto */}
        <h1 className="absolute text-6xl font-bold text-azul-10 z-10">
          Bienvenid@ {user.nombre}
        </h1>

        {/* Imagen con opacidad */}
        <div className="w-1/2">
          <img
            src="/src/assets/images/parking-amico.svg"
            alt="Parking illustration"
            className="object-cover w-full h-full opacity-30"
          />
        </div>
      </div>
    </>
  );
};

export default Inicio;
