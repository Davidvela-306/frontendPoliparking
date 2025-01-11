import { createMockAuthContext, mockUsers, renderWithProviders } from "@/helpers/test-utils"; // Asegúrate de tener este helper para envolver con el provider de contexto
import { vi, describe, test, beforeEach, expect } from "vitest";
import { fireEvent, act } from "@testing-library/react";
import RegistroGuardia from "@/components/Perfil/RegistroGuardia";
import adminService from "@/services/adminService"; // Mockeamos el servicio adminService

window.alert = vi.fn();

// Mock de adminService
vi.mock("@/services/adminService", () => ({
  default: {
    createGuardia: vi.fn(),
  },
}));

describe("RegistroGuardia - Administrador", () => {
  const mockSetRender = vi.fn();
  const mockRender = true;
  beforeEach(() => {
    vi.clearAllMocks(); // Limpiar los mocks antes de cada test
  });

  test("se renderiza correctamente el formulario", () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <RegistroGuardia setRender={mockSetRender} render={mockRender} />,
    );

    // Verificar si los campos del formulario están presentes
    expect(getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(getByPlaceholderText("Apellido")).toBeInTheDocument();
    expect(getByPlaceholderText("Cédula")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(getByPlaceholderText("Teléfono")).toBeInTheDocument();
    expect(getByText("Registrar")).toBeInTheDocument();
  });

  test("muestra error si algún campo está vacío", async () => {
    const { getByRole, getByText } = renderWithProviders(
      <RegistroGuardia setRender={mockSetRender} render={mockRender} />,
    );

    // Hacer clic en el botón de registrar sin llenar los campos
    await act(async () => {
      fireEvent.click(getByRole("button", { name: /Registrar/i }));
    });

    // Verificar si aparece el mensaje de error
    expect(
      getByText("Debe llenar todos los campos correctamente"),
    ).toBeInTheDocument();
  });

  test("llama a adminService.createGuardia con los valores correctos al registrar", async () => {
    // Crear contexto de autenticación con usuario administrador
    const authContextValue = createMockAuthContext(mockUsers.admin);

    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <RegistroGuardia setRender={mockSetRender} render={mockRender} />,
      authContextValue, // Pasar el contexto de administrador
    );

    // Completar los campos del formulario
    fireEvent.change(getByPlaceholderText("Nombre"), {
      target: { value: "Juan" },
    });
    fireEvent.change(getByPlaceholderText("Apellido"), {
      target: { value: "Pérez" },
    });
    fireEvent.change(getByPlaceholderText("Cédula"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "juan.perez@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByPlaceholderText("Teléfono"), {
      target: { value: "0998765432" },
    });

    // Hacer clic en el botón de registrar
    await act(async () => {
      fireEvent.click(getByRole("button", { name: /Registrar/i }));
    });

    // Verificar que adminService.createGuardia fue llamado con los valores correctos
    expect(adminService.createGuardia).toHaveBeenCalledWith({
      token: mockUsers.admin.token, // Usar el token del admin directamente
      user: {
        nombre: "Juan",
        apellido: "Pérez",
        cedula: "1234567890",
        email: "juan.perez@example.com",
        password: "password123",
        telefono: "0998765432",
        estado: true,
      },
    });
  });

  test("muestra mensaje de éxito después de crear un guardia correctamente", async () => {
    adminService.createGuardia.mockResolvedValueOnce(true); // Mock exitoso de la creación del guardia

    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <RegistroGuardia setRender={mockSetRender} render={mockRender} />,
    );

    // Completar los campos del formulario
    fireEvent.change(getByPlaceholderText("Nombre"), {
      target: { value: "Juan" },
    });
    fireEvent.change(getByPlaceholderText("Apellido"), {
      target: { value: "Pérez" },
    });
    fireEvent.change(getByPlaceholderText("Cédula"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "juan.perez@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByPlaceholderText("Teléfono"), {
      target: { value: "0998765432" },
    });

    // Hacer clic en el botón de registrar
    await act(async () => {
      fireEvent.click(getByRole("button", { name: /Registrar/i }));
    });

    // Verificar que el mensaje de éxito se muestra
    expect(window.alert).toHaveBeenCalledWith("Guardia creado correctamente");
  });

  test("muestra mensaje de error si falla la creación del guardia", async () => {
    adminService.createGuardia.mockRejectedValueOnce(new Error("Error de red")); // Simula error en la creación del guardia

    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <RegistroGuardia setRender={mockSetRender} render={mockRender} />,
    );

    // Completar los campos del formulario
    fireEvent.change(getByPlaceholderText("Nombre"), {
      target: { value: "Juan" },
    });
    fireEvent.change(getByPlaceholderText("Apellido"), {
      target: { value: "Pérez" },
    });
    fireEvent.change(getByPlaceholderText("Cédula"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "juan.perez@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByPlaceholderText("Teléfono"), {
      target: { value: "0998765432" },
    });

    // Hacer clic en el botón de registrar
    await act(async () => {
      fireEvent.click(getByRole("button", { name: /Registrar/i }));
    });

    // Verificar que el mensaje de error se muestra
    expect(window.alert).toHaveBeenCalledWith(
      "Error al crear el Guardia: Error de red",
    );
  });
});
