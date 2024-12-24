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

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "1" },
  },
  {
    id: "2",
    position: { x: 350, y: 100 },
    data: { label: "2" },
  },
  {
    id: "3",
    position: { x: 450, y: 300 },
    data: { label: "3" },
  },
  {
    id: "4",
    position: { x: 450, y: 500 },
    data: { label: "4" },
  },
  {
    id: "5",
    position: { x: 350, y: 650 },
    data: { label: "5" },
  },
  {
    id: "6",
    position: { x: 100, y: 650 },
    data: { label: "6" },
  },
];

/**
 * A React component that displays a graph of parking spaces, with each node representing
 * a parking space and its color indicating whether it is occupied or not.
 *
 * The component connects to a socket.io server at http://localhost:3000 to receive
 * updates about the parking space states. The server should emit a "serialData" event
 * with the current state of each parking space as a string in the form "EstadoX:Y",
 * where X is the number of the parking space (1-6) and Y is the state of the parking
 * space (0 or 1).
 *
 * The component also implements a 1-minute timeout, so if it does not receive any
 * updates from the server for 1 minute, it will assume that the parking space is
 * unoccupied.
 *
 * @return {JSX.Element} A React component that displays a graph of parking spaces.
 */
const ParkingSpacesGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
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
    const socket = io("http://localhost:3000");

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
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          backgroundColor: spaceStates[node.id] === "1" ? "green" : "red",
          width: 150,
          height: 70,
          borderRadius: 10,
        },
      })),
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
