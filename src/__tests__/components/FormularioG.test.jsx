import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FormularioG from "@/components/Perfil/FormularioG";
import { useAuth } from "@/context/AuthContext";
import { fetchPut } from "@/helpers/request_functions";

vi.mock("@/context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/helpers/request_functions", () => ({
  fetchPut: vi.fn(),
}));

describe("FormularioG", () => {
  const mockOnUpdateSuccess = vi.fn();
  const mockFetchPut = fetchPut;

  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({
      user: { _id: "674fb60dac9795f15bf00cad" },
      token: "test-token",
    });
  });

  it("llama a fetchPut con los valores correctos", async () => {
    render(<FormularioG onUpdateSuccess={mockOnUpdateSuccess} />);

    const input = screen.getByPlaceholderText("0999999999");
    const button = screen.getByText(/actualizar teléfono/i);

    fireEvent.change(input, { target: { value: "0998765432" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockFetchPut).toHaveBeenCalledWith(
        expect.anything(),
        "/674fb60dac9795f15bf00cad",
        { telefono: "0998765432" },
        "test-token",
      );
      expect(mockOnUpdateSuccess).toHaveBeenCalled();
    });
  });

  it("muestra alerta de éxito después de actualizar", async () => {
    mockFetchPut.mockResolvedValueOnce({});
    render(<FormularioG onUpdateSuccess={mockOnUpdateSuccess} />);

    const input = screen.getByPlaceholderText("0999999999");
    const button = screen.getByText(/actualizar teléfono/i);

    fireEvent.change(input, { target: { value: "0998765432" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText(/teléfono actualizado exitosamente/i),
      ).toBeInTheDocument(),
    );
  });

  it("muestra alerta de error si ocurre un problema", async () => {
    mockFetchPut.mockRejectedValueOnce(new Error("Error en la solicitud"));
    render(<FormularioG onUpdateSuccess={mockOnUpdateSuccess} />);

    const input = screen.getByPlaceholderText("0999999999");
    const button = screen.getByText(/actualizar teléfono/i);

    fireEvent.change(input, { target: { value: "0998765432" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText(/error al actualizar el teléfono/i),
      ).toBeInTheDocument(),
    );
  });
});
