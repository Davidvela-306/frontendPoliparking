import { useEffect, useState, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import io from "socket.io-client";
import "@xyflow/react/dist/style.css";

const Legend = () => (
  <div className="absolute bottom-4 right-4 bg-purple-200 p-4 rounded-lg shadow-lg z-50">
    <h3 className="text-lg font-bold mb-2">Leyenda</h3>
    <div className="space-y-2">
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-blue-300 mr-2"></div>
        <p className="text-sm">Persona con capacidad diferente</p>
      </div>
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-blue-300 border-4 border-solid border-green-600 mr-2"></div>
        <p className="text-sm">Disponible</p>
      </div>
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-blue-300 border-4 border-solid border-red-500 mr-2"></div>
        <p className="text-sm">No disponible o reservado</p>
      </div>
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-green-500 mr-2"></div>
        <p className="text-sm">Disponible</p>
      </div>
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-red-500 mr-2"></div>
        <p className="text-sm">No disponible</p>
      </div>
    </div>
  </div>
);

const containerNodes = [
  {
    id: "container-1",
    position: { x: 75, y: 0 },
    data: { label: "Marcelo Dávila" },
    style: {
      backgroundColor: "#f0f0f0",
      width: 400,
      height: 300,
      border: "2px solid #ccc",
      borderRadius: 15,
      zIndex: -1,
      fontSize: "30px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "10px",
    },
    type: "default",
  },
  {
    id: "container-2",
    position: { x: 600, y: 275 },
    data: { label: "Marcelo Dávila 2" },
    style: {
      backgroundColor: "#e0f7fa",
      width: 300,
      height: 400,
      border: "2px solid #80deea",
      borderRadius: 15,
      zIndex: -1,
      fontSize: "30px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "10px",
    },
    type: "default",
  },
  {
    id: "container-3",
    position: { x: 75, y: 630 },
    data: { label: "Esfot Posterior" },
    style: {
      backgroundColor: "#ffecb3",
      width: 400,
      height: 300,
      border: "2px solid #ffd54f",
      borderRadius: 15,
      zIndex: -1,
      fontSize: "30px",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "10px",
    },
    type: "default",
  },
];

const positions = [
  { x: 100, y: 70 },
  { x: 300, y: 70 },
  { x: 665, y: 320 },
  { x: 665, y: 500 },
  { x: 100, y: 700 },
  { x: 300, y: 700 },
];

const ParkingSpacesGraph = ({ spaces, specialSpaceState }) => {
  const initialNodes = useMemo(() => {
    return spaces.map((space, index) => ({
      id: space.numeroEspacio,
      position: positions[index],
      data: { label: space.numeroEspacio },
      estado: space.estado,
    }));
  }, [spaces]);

  const [nodes, setNodes, onNodesChange] = useNodesState([
    ...initialNodes,
    ...containerNodes,
  ]);
  const [edges, onEdgesChange] = useEdgesState([]);
  const [spaceStates, setSpaceStates] = useState({});
  const [lastSensorState, setLastSensorState] = useState(null);
  const [autoReleasePending, setAutoReleasePending] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("serialData", (data) => {
      const lines = data.split("\n");

      setSpaceStates((prevSpaceStates) => {
        const newSpaceStates = { ...prevSpaceStates };

        lines.forEach((line) => {
          const [estado, valor] = line.split(":");
          const spaceNumber = estado.replace("Estado", "");

          if (spaceNumber >= 1 && spaceNumber <= 6) {
            newSpaceStates[spaceNumber] = valor;

            if (spaceNumber === "6") {
              const isNowEmpty = valor === "0";
              const wasOccupied = prevSpaceStates[spaceNumber] === "1";

              if (wasOccupied && isNowEmpty && !specialSpaceState) {
                setAutoReleasePending(true);
              }

              setLastSensorState(valor);
            }
          }
        });

        return newSpaceStates;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [specialSpaceState]);

  useEffect(() => {
    if (autoReleasePending && !specialSpaceState) {
      const event = new CustomEvent("autoReleaseSpace6", {
        detail: { released: true },
      });
      window.dispatchEvent(event);
      setAutoReleasePending(false);
    }
  }, [autoReleasePending, specialSpaceState]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (!node.id.startsWith("container")) {
          const isNarrowNode = ["1", "2", "5", "6"].includes(node.id);

          if (node.id === "6") {
            const sensorOccupied = spaceStates[6] === "1";
            const isAvailable = specialSpaceState && !sensorOccupied;

            return {
              ...node,
              data: {
                ...node.data,
                label: (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    className="h-full bg-blue-300 text-black w-full flex justify-center items-center"
                  >
                    <div>6</div>
                    <div style={{ fontSize: "20px" }}>
                      {isAvailable ? "Disponible" : "Reservado"}
                    </div>
                  </div>
                ),
              },
              style: {
                backgroundColor: isAvailable ? "green" : "red",
                width: 150,
                height: 170,
                borderRadius: 10,
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
                fontWeight: "bold",
                color: "white",
              },
            };
          }

          return {
            ...node,
            style: {
              backgroundColor: spaceStates[node.id] === "1" ? "red" : "green",
              width: isNarrowNode ? 150 : 170,
              height: isNarrowNode ? 170 : 150,
              borderRadius: 10,
              zIndex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
            },
          };
        }
        return node;
      }),
    );
  }, [spaceStates, specialSpaceState, setNodes]);

  return (
    <div className="h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        className="h-full w-100"
        minZoom={0.5}
        fitView
        fitViewOptions={{
          padding: 0.1,
          duration: 1000,
          animate: true,
        }}
      >
        <Controls className="absolute top-4 left-4" />
        <Background
          variant="dots"
          gap={12}
          size={1}
          className="h-full w-full"
        />
      </ReactFlow>
      <Legend />
    </div>
  );
};

export default ParkingSpacesGraph;
