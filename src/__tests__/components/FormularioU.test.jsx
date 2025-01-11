import { renderWithProviders } from "@/helpers/test-utils";
import { vi, describe, test, beforeEach, expect } from "vitest";
import { fireEvent, act } from "@testing-library/react";
import FormularioU from "@/components/Perfil/FormularioU";
import { fetchPut } from "@/helpers/request_functions";

// Mock del fetchPut
vi.mock("@/helpers/request_functions", () => ({
  fetchPut: vi.fn(),
}));

describe("FormularioU", () => {
  const mockOnUpdateSuccess = vi.fn();
  const mockUser = { _id: "674fb60dac9795f15bf00ced" };
  const mockToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGZiNjBkYWM5Nzk1ZjE1YmYwMGNlZCIsInJvbCI6InVzdWFyaW8iLCJpYXQiOjE3MzY1MTA5MTcsImV4cCI6MTczNjU5NzMxN30.PiPwCl8oZSDS5mKZYs1ro8978KRztBavpBWkCLeWYt4";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("se renderiza correctamente", () => {
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <FormularioU onUpdateSuccess={mockOnUpdateSuccess} />,
    );

    expect(getByText("Teléfono")).toBeInTheDocument();
    expect(getByText("Actualizar teléfono")).toBeInTheDocument();
    expect(getByPlaceholderText("0999999999")).toBeInTheDocument();
  });

  test("muestra error si el campo está vacío", async () => {
    const { getByText, getByRole } = renderWithProviders(
      <FormularioU onUpdateSuccess={mockOnUpdateSuccess} />,
    );

    await act(async () => {
      fireEvent.click(getByRole("button", { name: /actualizar teléfono/i }));
    });

    expect(getByText("El campo es obligatorio")).toBeInTheDocument();
  });

  test("llama a fetchPut con los valores correctos", async () => {
    const { getByPlaceholderText, getByRole } = renderWithProviders(
      <FormularioU onUpdateSuccess={mockOnUpdateSuccess} />,
    );

    const telefonoInput = getByPlaceholderText("0999999999");

    await act(async () => {
      fireEvent.change(telefonoInput, { target: { value: "0998765432" } });
      fireEvent.click(getByRole("button", { name: /actualizar teléfono/i }));
    });

    expect(fetchPut).toHaveBeenCalledWith(
      expect.anything(),
      `/${mockUser._id}`,
      { telefono: "0998765432" },
      mockToken,
    );
    expect(mockOnUpdateSuccess).toHaveBeenCalled();
  });

  test("muestra alerta de éxito después de actualizar", async () => {
    fetchPut.mockResolvedValueOnce({});

    const { getByPlaceholderText, getByRole, getByText } = renderWithProviders(
      <FormularioU onUpdateSuccess={mockOnUpdateSuccess} />,
    );

    const telefonoInput = getByPlaceholderText("0999999999");

    await act(async () => {
      fireEvent.change(telefonoInput, { target: { value: "0998765432" } });
      fireEvent.click(getByRole("button", { name: /actualizar teléfono/i }));
    });

    expect(
      getByText("Información actualizada exitosamente"),
    ).toBeInTheDocument();
  });

  test("muestra alerta de error si ocurre un problema", async () => {
    // Simula el rechazo de la promesa
    fetchPut.mockImplementationOnce(() =>
      Promise.reject(new Error("Error en la solicitud")),
    );

    const { getByPlaceholderText, getByRole, getByText } = renderWithProviders(
      <FormularioU onUpdateSuccess={mockOnUpdateSuccess} />,
    );

    const telefonoInput = getByPlaceholderText("0999999999");

    await act(async () => {
      fireEvent.change(telefonoInput, { target: { value: "0998765432" } });
      fireEvent.click(getByRole("button", { name: /actualizar teléfono/i }));
    });

    // Verifica que la función fetchPut haya sido llamada correctamente
    expect(fetchPut).toHaveBeenCalled();
    expect(fetchPut).toHaveBeenCalledWith(
      expect.anything(),
      `/${mockUser._id}`,
      { telefono: "0998765432" },
      mockToken,
    );

    // Verifica que el mensaje de error se muestra en el componente
    expect(getByText("Error al actualizar la información")).toBeInTheDocument();
  });
});
