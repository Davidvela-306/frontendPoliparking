import {
  createMockAuthContext,
  renderWithProviders,
} from "@/helpers/test-utils";
import { vi, describe, test, beforeEach, expect } from "vitest";
import { fireEvent, act } from "@testing-library/react";
import ParqueaderosGuardiasPage from "@/pages/Guardias/ParqueaderosGuardiasPage";
import parkingService from "@/services/parkingService";
import guardiaService from "@/services/guardiaService";
import { mockUsers } from "@/helpers/test-utils";

vi.mock("@/services/parkingService", () => ({
  default: {
    getParking: vi.fn(),
  },
}));

vi.mock("@/services/guardiaService", () => ({
  default: {
    changeStatus: vi.fn(),
    changeSpecialSpace: vi.fn(),
  },
}));

window.alert = vi.fn();

describe("ParqueaderosGuardiasPage", () => {
  const mockParking = [
    {
      _id: "6779483f42e0511f4fdef6f0",
      nombre: "ESFOT",
      description: "Parqueadero de la ESFOT",
      planta: "1",
      bloque: "A",
      espacios: [
        { numeroEspacio: "1", estado: true, _id: "6779483f42e0511f4fdef6f1" },
        { numeroEspacio: "2", estado: true, _id: "6779483f42e0511f4fdef6f2" },
        { numeroEspacio: "3", estado: true, _id: "6779483f42e0511f4fdef6f3" },
        { numeroEspacio: "4", estado: true, _id: "6779483f42e0511f4fdef6f4" },
        { numeroEspacio: "5", estado: true, _id: "6779483f42e0511f4fdef6f5" },
        { numeroEspacio: "6", estado: true, _id: "6779483f42e0511f4fdef6f6" },
      ],
      estado: true,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    parkingService.getParking.mockResolvedValue(mockParking);
  });

  test("renderiza correctamente el parqueadero y sus botones", async () => {
    const authContextValue = createMockAuthContext(mockUsers.guardia);
    const { getByText } = renderWithProviders(
      <ParqueaderosGuardiasPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    expect(getByText("Reservar parqueadero")).toBeInTheDocument();
    expect(getByText("Discapacidad: Reservar plaza")).toBeInTheDocument();
  });

  test("puede cambiar el estado general del parqueadero", async () => {
    const authContextValue = createMockAuthContext(mockUsers.guardia);
    const { getByText } = renderWithProviders(
      <ParqueaderosGuardiasPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    await act(async () => {
      fireEvent.click(getByText("Reservar parqueadero"));
    });

    expect(guardiaService.changeStatus).toHaveBeenCalledWith(
      mockUsers.guardia.token,
      mockParking[0]._id,
      { estado: false },
    );
  });

  test("puede cambiar el estado del espacio para discapacitados", async () => {
    const authContextValue = createMockAuthContext(mockUsers.guardia);
    const { getByText } = renderWithProviders(
      <ParqueaderosGuardiasPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    await act(async () => {
      fireEvent.click(getByText("Discapacidad: Reservar plaza"));
    });

    expect(guardiaService.changeSpecialSpace).toHaveBeenCalledWith(
      mockUsers.guardia.token,
      mockParking[0]._id,
      {
        estado: false,
        numeroEspacio: "6",
      },
    );
  });

  test("muestra mensaje de carga mientras obtiene los datos", async () => {
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    parkingService.getParking.mockImplementation(() => promise);

    const authContextValue = createMockAuthContext(mockUsers.guardia);
    const { queryByText } = renderWithProviders(
      <ParqueaderosGuardiasPage />,
      authContextValue,
    );

    expect(queryByText("Cargando...")).toBeInTheDocument();

    await act(async () => {
      resolvePromise(mockParking);
      await promise;
    });
  });

  test("muestra mensaje cuando no hay parqueaderos", async () => {
    const authContextValue = createMockAuthContext(mockUsers.guardia);
    parkingService.getParking.mockResolvedValueOnce([]);

    const { getByText } = renderWithProviders(
      <ParqueaderosGuardiasPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    expect(
      getByText("No hay parqueaderos cargados en el sistema"),
    ).toBeInTheDocument();
  });

  test("maneja errores al cambiar el estado del parqueadero", async () => {
    const authContextValue = createMockAuthContext(mockUsers.guardia);
    guardiaService.changeStatus.mockRejectedValueOnce(
      new Error("Error de red"),
    );

    const { getByText } = renderWithProviders(
      <ParqueaderosGuardiasPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    await act(async () => {
      fireEvent.click(getByText("Reservar parqueadero"));
    });

    expect(guardiaService.changeStatus).toHaveBeenCalled();
  });

  test("maneja errores al cambiar el estado del espacio para discapacitados", async () => {
    const authContextValue = createMockAuthContext(mockUsers.guardia);
    guardiaService.changeSpecialSpace.mockRejectedValueOnce(
      new Error("Error de red"),
    );

    const { getByText } = renderWithProviders(
      <ParqueaderosGuardiasPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    await act(async () => {
      fireEvent.click(getByText("Discapacidad: Reservar plaza"));
    });

    expect(guardiaService.changeSpecialSpace).toHaveBeenCalled();
  });
});
