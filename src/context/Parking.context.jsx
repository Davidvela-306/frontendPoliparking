import { createContext, useContext } from "react";

export const ParkingContext = createContext();

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error("useParking must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  return (
    <ParkingContext.Provider value={() => {}}>
      {children}
    </ParkingContext.Provider>
  );
}
