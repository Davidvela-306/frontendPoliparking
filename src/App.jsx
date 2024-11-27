import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useLocation } from "react-router-dom";

import {
  AdminLayout,
  DefaultLayout,
  GuardiaLayout,
  UsuarioLayout,
} from "./layouts/SideBar";

import { ProtectedRoute } from "@components/index";
import { Login, Inicio, LandingPage } from "@pages/index";
import {
  GuardiasAdminPage,
  ParqueaderosAdminPage,
  UsuariosAdminPage,
} from "@pages/Administrador/index";
import {
  ParqueaderosGuardiasPage,
  PerfilGuardiasPage,
} from "@pages/Guardias/index";

import {
  ParqueaderosUsuariosPage,
  PerfilUsuariosPage,
} from "@pages/Usuarios/index";

import { NotFound } from "./pages/index";

import "./index.css";

function App() {
  const { isAuth, rol } = useAuth();

  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Rutas públicas */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!isAuth}
              redirectTo={
                rol === "Administrador" ? "/administrador"
                : rol === "Guardia" ?
                  "/guardias"
                : rol === "Usuario" ?
                  "/usuarios"
                : "/"
              }
            />
          }
        >
          <Route
            path="/singin"
            element={
              <DefaultLayout isAuth={isAuth} location={location}>
                <Login />
              </DefaultLayout>
            }
          />
          <Route
            path="/"
            element={
              <DefaultLayout isAuth={isAuth} location={location}>
                <LandingPage />
              </DefaultLayout>
            }
          />
        </Route>

        {/* Rutas protegidas */}
        {rol === "Administrador" && (
          <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/" />}>
            {/* Rutas del administrador */}
            <Route
              path="/administrador"
              element={
                <AdminLayout>
                  <Inicio />
                </AdminLayout>
              }
            />
            <Route
              path="/administrador/usuarios"
              element={
                <AdminLayout>
                  <UsuariosAdminPage />
                </AdminLayout>
              }
            />
            <Route
              path="/administrador/guardias"
              element={
                <AdminLayout>
                  <GuardiasAdminPage />
                </AdminLayout>
              }
            />
            <Route
              path="/administrador/parqueaderos"
              element={
                <AdminLayout>
                  <ParqueaderosAdminPage />
                </AdminLayout>
              }
            />
          </Route>
        )}

        {rol === "Guardia" && (
          <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/" />}>
            {/* Rutas del Guardia */}

            <Route
              path="/guardias"
              element={
                <GuardiaLayout>
                  <Inicio />
                </GuardiaLayout>
              }
            />
            <Route
              path="/guardias/perfil"
              element={
                <GuardiaLayout>
                  <PerfilGuardiasPage />
                </GuardiaLayout>
              }
            />
            <Route
              path="/guardias/parqueaderos"
              element={
                <GuardiaLayout>
                  <ParqueaderosGuardiasPage />
                </GuardiaLayout>
              }
            />
          </Route>
        )}
        {rol === "Usuario" && (
          <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/" />}>
            {/* Rutas del Usuario */}

            <Route
              path="/usuarios"
              element={
                <UsuarioLayout>
                  <Inicio />
                </UsuarioLayout>
              }
            />

            <Route
              path="/usuarios/perfil"
              element={
                <UsuarioLayout>
                  <PerfilUsuariosPage />
                </UsuarioLayout>
              }
            />

            <Route
              path="/usuarios/parquedero"
              element={
                <UsuarioLayout>
                  <ParqueaderosUsuariosPage />
                </UsuarioLayout>
              }
            />
          </Route>
        )}
        {/* Otras rutas */}
        <Route
          path="/singup"
          element={<Navigate to="/usuarios/singup" replace />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
