import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPost } from "../helpers/request_functions";
import {
  baseUsuarios,
  baseAdmin,
  baseGuardias,
} from "../helpers/instances_routes";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [rol, setRol] = useState(null);
  const [token, setToken]=useState(null);
  // const [userData, setUserData]=useState({
  //   user: null,
  //   isAuth: false,
  //   rol: null,
  //   token: null,
  // });

  const setUserData = (userData, thisToken) => {
    if (userData && thisToken) {
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", thisToken);
      setUser(userData);
      setIsAuth(true);
      setRol(userData.rol || null);
    } else {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      setUser(null);
      setIsAuth(false);
      setRol(null);
    }
  };

  const signin = async (data) => {
    try {
      let response;
      if (rol === "Usuario") {
        response = await fetchPost(baseUsuarios, "/login", data);
      } else if (rol === "Administrador") {
        response = await fetchPost(baseAdmin, "/login", data);
      } else if (rol === "Guardia") {
        response = await fetchPost(baseGuardias, "/login", data);
      } else {
        throw new Error("Rol no valido");
      }

      const {
        nombre,
        apellido,
        telefono,
        token: thisToken,
        _id,
        email,
      } = response.data;
      const userData = { nombre, apellido, telefono, _id, email, rol };
      setUserData(userData, thisToken);
      setToken(thisToken);
      return response;
    } catch (error) {
      setUserData(null, null);
      setToken(null);
      throw error;
    }
  };
  const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem("userData");
    const thisToken = localStorage.getItem("token");
    if (userData && thisToken) {
      const parsedUser = JSON.parse(userData);
      setToken(thisToken);
      setUser(parsedUser);
      setIsAuth(true);
      setRol(parsedUser.rol || null);
    } else {
      setUser(null);
      setIsAuth(false);
      setRol("Usuario");
    }
  };


  const signout = async () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
    setRol(null);
    setToken(null);
    navigate("/");
  };

  useEffect(() => {
    loadUserFromLocalStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        rol,
        setRol,
        isAuth,
        signin,
        signout,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
