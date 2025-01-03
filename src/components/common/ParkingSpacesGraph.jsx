import { useEffect, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import io from "socket.io-client";
import "@xyflow/react/dist/style.css";

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

const ParkingSpacesGraph = ({ spaces }) => {
  const initialNodes = spaces.map((space, index) => ({
    id: space.numeroEspacio,
    position: positions[index],
    data: { label: space.numeroEspacio },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState([
    ...initialNodes,
    ...containerNodes,
  ]);
  const [edges, onEdgesChange] = useEdgesState([]);
  const [spaceStates, setSpaceStates] = useState({});
  const [lastActionTimes, setLastActionTimes] = useState({});

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("serialData", (data) => {
      const lines = data.split("\n");
      setSpaceStates((prevSpaceStates) => {
        const newSpaceStates = { ...prevSpaceStates };
        setLastActionTimes((prevLastActionTimes) => {
          const newLastActionTimes = { ...prevLastActionTimes };

          lines.forEach((line) => {
            const [estado, valor] = line.split(":");
            const spaceNumber = estado.replace("Estado", "");

            if (spaceNumber >= 1 && spaceNumber <= 6) {
              newSpaceStates[spaceNumber] = valor;
              newLastActionTimes[spaceNumber] = Date.now();
            }
          });

          return newLastActionTimes;
        });
        return newSpaceStates;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (!node.id.startsWith("container")) {
          const isNarrowNode = ["1", "2", "5", "6"].includes(node.id);
          return {
            ...node,
            style: {
              backgroundColor: spaceStates[node.id] === "1" ? "green" : "red",
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
  }, [spaceStates, setNodes]);

  return (
    <div className="h-full">
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
    </div>
  );
};

export default ParkingSpacesGraph;
