import { describe, test, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "@/pages/Login";
import { renderWithProviders } from "@/helpers/test-utils";

// Mock del módulo de react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

describe("Login Component", () => {
  const mockSignin = vi.fn();
  const mockSetRol = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    renderWithProviders(<Login />, {
      user: null,
      rol: "",
      isAuth: false,
      signin: mockSignin,
      signout: vi.fn(),
      token: "",
      setToken: vi.fn(),
      setRol: mockSetRol,
    });
  });
  test("se renderiza correctamente", () => {
    renderWithProviders(<Login />);
  });

  test("muestra mensajes de error cuando se intenta enviar el formulario vacío", async () => {
    const submitButton = screen.getByRole("button", { name: "Ingresar" });
    await userEvent.click(submitButton);

    expect(screen.getByText("Rol es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("El email es obligatorio")).toBeInTheDocument();
    expect(
      screen.getByText("La contraseña es obligatoria"),
    ).toBeInTheDocument();
  });

  test("toggle de visibilidad de contraseña funciona correctamente", async () => {
    const passwordInput = screen.getByPlaceholderText("***********");
    const toggleButton = screen.getByLabelText("Mostrar contraseña");

    expect(passwordInput.type).toBe("password");
    await userEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");
    await userEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  test("maneja correctamente el cambio de rol", async () => {
    const rolSelect = screen.getByRole("combobox");
    await userEvent.selectOptions(rolSelect, "Administrador");

    expect(mockSetRol).toHaveBeenCalledWith("Administrador");
    expect(rolSelect.value).toBe("Administrador");
  });

  test("maneja el envío exitoso del formulario", async () => {
    mockSignin.mockResolvedValueOnce({
      data: { nombre: "Juan" },
    });

    await userEvent.selectOptions(screen.getByRole("combobox"), "Usuario");
    await userEvent.type(
      screen.getByPlaceholderText("JuanPerez@gmail.com"),
      "test@example.com",
    );
    await userEvent.type(screen.getByPlaceholderText("***********"), "123456");

    const submitButton = screen.getByRole("button", { name: "Ingresar" });
    await userEvent.click(submitButton);

    expect(mockSignin).toHaveBeenCalledWith({
      rol: "Usuario",
      email: "test@example.com",
      password: "123456",
    });

    await waitFor(() => {
      expect(screen.getByText("Bienvenido Juan")).toBeInTheDocument();
    });
  });

  test("maneja errores en el envío del formulario", async () => {
    mockSignin.mockRejectedValueOnce({
      response: {
        data: {
          msg: "Credenciales inválidas",
        },
      },
    });

    await userEvent.selectOptions(screen.getByRole("combobox"), "Usuario");
    await userEvent.type(
      screen.getByPlaceholderText("JuanPerez@gmail.com"),
      "test@example.com",
    );
    await userEvent.type(screen.getByPlaceholderText("***********"), "123456");

    const submitButton = screen.getByRole("button", { name: "Ingresar" });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
    });
  });
});
