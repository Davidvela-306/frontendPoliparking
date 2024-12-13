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

const ParkingSpacesGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, onEdgesChange] = useEdgesState([]);
  const [spaceStates, setSpaceStates] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });
  const [lastActionTimes, setLastActionTimes] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });

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
    const intervalId = setInterval(() => {
      setSpaceStates((prevSpaceStates) => {
        const newSpaceStates = { ...prevSpaceStates };

        Object.keys(lastActionTimes).forEach((spaceNumber) => {
          const lastActionTime = lastActionTimes[spaceNumber];
          if (lastActionTime !== null && Date.now() - lastActionTime > 60000) {
            newSpaceStates[spaceNumber] = "0";
          }
        });

        return newSpaceStates;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastActionTimes]);

  useEffect(() => {
    const newNodes = [
      {
        id: "1",
        position: { x: 100, y: 100 },
        data: { label: "1" },
        style: {
          backgroundColor: spaceStates[1] === "1" ? "green" : "red",
          width: 150,
          height: 70,
          borderRadius: 10,
        },
      },
      {
        id: "2",
        position: { x: 100, y: 250 },
        data: { label: "2" },
        style: {
          backgroundColor: spaceStates[2] === "1" ? "green" : "red",
          width: 150,
          height: 70,
          borderRadius: 10,
        },
      },
      {
        id: "3",
        position: { x: 100, y: 400 },
        data: { label: "3" },
        style: {
          backgroundColor: spaceStates[3] === "1" ? "green" : "red",
          width: 150,
          height: 70,
          borderRadius: 10,
        },
      },
      {
        id: "4",
        position: { x: 350, y: 100 },
        data: { label: "4" },
        style: {
          backgroundColor: spaceStates[4] === "1" ? "green" : "red",
          width: 150,
          height: 70,
          borderRadius: 10,
        },
      },
      {
        id: "5",
        position: { x: 350, y: 250 },
        data: { label: "5" },
        style: {
          backgroundColor: spaceStates[5] === "1" ? "green" : "red",
          width: 150,
          height: 70,
          borderRadius: 10,
        },
      },
      {
        id: "6",
        position: { x: 350, y: 400 },
        data: { label: "6" },
        style: {
          backgroundColor: spaceStates[6] === "1" ? "green" : "red",
          width: 150,
          height: 70,
          borderRadius: 10,
        },
      },
    ];

    setNodes(newNodes);
  }, [spaceStates]);

  return (
    <div className="h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        className="h-full w-100"
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
