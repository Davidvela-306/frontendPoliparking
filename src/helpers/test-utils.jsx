// test-utils.js
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { vi } from "vitest";

// Mock values para diferentes tipos de usuarios
export const mockUsers = {
  admin: {
    _id: "674eb60dac9795f15bf00ced",
    nombre: "Admin",
    apellido: "User",
    telefono: "123456789",
    email: "admin@example.com",
    rol: "Administrador",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDU1MTQ2OTljMDg0YmE2NTcxZmQ2MyIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MzYzNTM2OTAsImV4cCI6MTczNjQ0MDA5MH0.Nqo4O2A-vnzV199MZ7hnKnIHr8dqHkIgPVUVMT1-GEw",
  },
  guardia: {
    _id: "674fb60dac9795f15bf00cad",
    nombre: "Guardia",
    apellido: "User",
    telefono: "987654321",
    email: "guardia@example.com",
    rol: "Guardia",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDdlYTg4NmZmOTViNDljMTIzZWE4NSIsInJvbCI6Imd1YXJkaWEiLCJpYXQiOjE3MzYzNTM2NTYsImV4cCI6MTczNjQ0MDA1Nn0.7SJUQzhB-VRE_BJW13B5MQ0IeEJMCzwqRubKAT-G1is",
  },
  usuario: {
    _id: "674fb60dac9795f15bf00ced",
    nombre: "Usuario",
    apellido: "Normal",
    telefono: "1122334455",
    email: "usuario@example.com",
    rol: "Usuario",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGZiNjBkYWM5Nzk1ZjE1YmYwMGNlZCIsInJvbCI6InVzdWFyaW8iLCJpYXQiOjE3MzY1MTA5MTcsImV4cCI6MTczNjU5NzMxN30.PiPwCl8oZSDS5mKZYs1ro8978KRztBavpBWkCLeWYt4",
  },
};

// Función para crear un contexto de autenticación mock
export const createMockAuthContext = (user = mockUsers.usuario) => ({
  user,
  rol: user.rol,
  isAuth: true,
  signin: vi.fn(),
  signout: vi.fn(),
  token: user.token,
  setToken: vi.fn(),
  setRol: vi.fn(),
});

// Función para renderizar componentes con los providers necesarios
export const renderWithProviders = (
  ui,
  authContextValue = createMockAuthContext(),
) => {
  return {
    ...render(
      <MemoryRouter>
        <AuthContext.Provider value={authContextValue}>
          {ui}
        </AuthContext.Provider>
      </MemoryRouter>,
    ),
  };
};

// Helper para verificar si un usuario está autenticado
export const mockAuthenticatedUser = (role = "Usuario") => {
  const user = mockUsers[role.toLowerCase()] || mockUsers.usuario;
  return createMockAuthContext(user);
};

// Custom test matchers si los necesitas
export const customMatchers = {
  toHaveRole: (received, role) => {
    const hasRole = received.rol === role;
    return {
      pass: hasRole,
      message: () => `expected ${received.rol} to be ${role}`,
    };
  },
};
