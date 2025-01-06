import { useEffect, useState } from "react";
import io from "socket.io-client";

const Espacios = ({ onAllOccupied }) => {
  const [estado1, setEstado1] = useState(null);
  const [estado2, setEstado2] = useState(null);
  const [estado3, setEstado3] = useState(null);
  const [estado4, setEstado4] = useState(null);
  const [estado5, setEstado5] = useState(null);
  const [estado6, setEstado6] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("serialData", (data) => {
      const lines = data.split("\n");
      lines.forEach((line) => {
        const [estado, valor] = line.split(":");
        switch (estado) {
          case "Estado1":
            setEstado1(valor);
            break;
          case "Estado2":
            setEstado2(valor);
            break;
          case "Estado3":
            setEstado3(valor);
            break;
          case "Estado4":
            setEstado4(valor);
            break;
          case "Estado5":
            setEstado5(valor);
            break;
          case "Estado6":
            setEstado6(valor);
            break;
          default:
            break;
        }
      });
    });

    // Verifica si todos los espacios están ocupados o si hay alguno disponible
    const allOccupied =
      parseInt(estado1) === 1 &&
      parseInt(estado2) === 1 &&
      parseInt(estado3) === 1 &&
      parseInt(estado4) === 1 &&
      parseInt(estado5) === 1 &&
      parseInt(estado6) === 1;

    onAllOccupied(allOccupied);

    return () => {
      socket.disconnect();
    };
  }, [estado1, estado2, estado3, estado4, estado5, estado6, onAllOccupied]);

  return (
    <>
      <table className="table-auto w-1/2 mx-auto mt-5 text-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border bg-gray-100">Lugar</th>
            <th className="px-4 py-2 border bg-gray-100">Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          {[estado1, estado2, estado3, estado4, estado5, estado6].map(
            (estado, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border text-center">
                  Lugar {index + 1}
                </td>
                <td
                  className={`${
                    parseInt(estado) === 1 ?
                      "px-4 py-2 border text-red-600 font-bold text-center"
                    : "px-4 py-2 border text-green-600 font-bold text-center"
                  }`}
                >
                  {parseInt(estado) === 1 ? "No disponible" : "Disponible"}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </>
  );
};

export default Espacios;
