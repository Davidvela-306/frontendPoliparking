import { renderWithProviders } from "@/helpers/test-utils";
import { vi, describe, test, beforeEach, expect } from "vitest";
import RegisterAdminUser from "@/components/RegisterAdminUser";
import {  fireEvent, act } from "@testing-library/react";

// Mock the adminService
vi.mock("@/services/adminService", () => ({
  createExternalUser: vi.fn(),
}));

describe("RegisterAdminUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("se renderiza correctamente", async () => {
    const renderState = false;
    const setRender = vi.fn();

    const { getByText } = renderWithProviders(
      <RegisterAdminUser setRender={setRender} render={renderState} />,
    );
    expect(getByText("Nombre")).toBeInTheDocument();
    expect(getByText("Apellido")).toBeInTheDocument();
    expect(getByText("Cedula")).toBeInTheDocument();
    expect(getByText("Email")).toBeInTheDocument();
    expect(getByText("Contraseña")).toBeInTheDocument();
    expect(getByText("Telefono")).toBeInTheDocument();
    expect(getByText("Placa")).toBeInTheDocument();
    expect(getByText("Rol")).toBeInTheDocument();
  });

  // funcionan los inputs:
  test("se envia los datos correctamente", async () => {
    const renderState = false;
    const setRender = vi.fn();

    const { getByLabelText } = renderWithProviders(
      <RegisterAdminUser setRender={setRender} render={renderState} />,
    );

    const nombreInput = getByLabelText("Nombre");
    const apellidoInput = getByLabelText("Apellido");
    const cedulaInput = getByLabelText("Cedula");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Contraseña");
    const telefonoInput = getByLabelText("Telefono");
    const placaInput = getByLabelText("Placa");
    const rolSelect = getByLabelText("Rol");

    await act(async () => {
      fireEvent.change(nombreInput, { target: { value: "John" } });
      fireEvent.change(apellidoInput, { target: { value: "Doe" } });
      fireEvent.change(cedulaInput, { target: { value: "0498733281" } });
      fireEvent.change(emailInput, { target: { value: "john@example" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.change(telefonoInput, { target: { value: "1234567890" } });
      fireEvent.change(placaInput, { target: { value: "ABC-123" } });
      fireEvent.change(rolSelect, { target: { value: "administrativo" } });
    });

    expect(nombreInput.value).toBe("John");
    expect(apellidoInput.value).toBe("Doe");
    expect(cedulaInput.value).toBe("0498733281");
    expect(emailInput.value).toBe("john@example");
    expect(passwordInput.value).toBe("password");
    expect(telefonoInput.value).toBe("1234567890");
    expect(placaInput.value).toBe("ABC-123");
    expect(rolSelect.value).toBe("administrativo");
  });
  
});
