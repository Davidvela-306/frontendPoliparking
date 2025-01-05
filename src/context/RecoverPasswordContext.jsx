import { createContext, useContext, useState, useMemo } from "react";

export const RecoverPasswordContext = createContext();

export const useRecoverPassword = () => {
  const context = useContext(RecoverPasswordContext);
  if (!context) {
    throw new Error("useRecoverPassword must be used within an AuthProvider");
  }
  return context;
};

export function RecoverPasswordProvider({ children }) {
  const [recoveryToken, setRecoveryToken] = useState(null);

  const value = useMemo(() => ({
    token: recoveryToken,
    setToken: setRecoveryToken,
  }), [recoveryToken, setRecoveryToken]);

  return (
    <RecoverPasswordContext.Provider value={value}>
      {children}
    </RecoverPasswordContext.Provider>
  );
}