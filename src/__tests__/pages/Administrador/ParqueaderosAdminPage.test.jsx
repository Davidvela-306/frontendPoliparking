import {
  createMockAuthContext,
  renderWithProviders,
} from "@/helpers/test-utils";
import { vi, describe, test, beforeEach, expect } from "vitest";
import { fireEvent, act, waitFor} from "@testing-library/react";
import ParqueaderosAdminPage from "@/pages/Administrador/ParqueaderosAdminPage";
import parkingService from "@/services/parkingService";
import adminService from "@/services/adminService";
import { mockUsers } from "@/helpers/test-utils";

// Mock para parkingService.updateParking
vi.mock("@/services/parkingService", () => ({
  default: {
    getParking: vi.fn(),
    updateParking: vi.fn().mockResolvedValue({}), // Asegúrate de que se resuelva correctamente
  },
}));


vi.mock("@/services/adminService", () => ({
  default: {
    getParqueaderos: vi.fn(),
  },
}));

// Mock useForm hook
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: () => ({}),
    handleSubmit: (fn) => fn,
    formState: { errors: {} },
    reset: vi.fn(),
  }),
}));

describe("ParqueaderosAdminPage", () => {
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
    adminService.getParqueaderos.mockResolvedValue(mockParking);
  });

  test("renderiza correctamente el título y la descripción", async () => {
    const authContextValue = createMockAuthContext(mockUsers.admin);
    const { getByText } = renderWithProviders(
      <ParqueaderosAdminPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    expect(getByText("Plazas de estacionamiento")).toBeInTheDocument();
    expect(
      getByText(
        "Este módulo te permite gestionar las plazas de estacionamiento del parqueadero ESFOT.",
      ),
    ).toBeInTheDocument();
  });

  test("muestra mensaje de carga mientras obtiene los datos", async () => {
    let resolvePromise;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    parkingService.getParking.mockImplementation(() => promise);

    const authContextValue = createMockAuthContext(mockUsers.admin);
    const { getByText, queryByText } = renderWithProviders(
      <ParqueaderosAdminPage />,
      authContextValue,
    );

    expect(getByText("Cargando...")).toBeInTheDocument();

    await act(async () => {
      resolvePromise(mockParking); // Resuelve la promesa con datos simulados.
    });

    await waitFor(() => {
      expect(queryByText("Cargando...")).not.toBeInTheDocument();
      expect(
        getByText(
          "Este módulo te permite gestionar las plazas de estacionamiento del parqueadero ESFOT.",
        ),
      ).toBeInTheDocument();
    });
  });


  test("muestra mensaje cuando no hay parqueaderos", async () => {
    parkingService.getParking.mockResolvedValueOnce([]);

    const authContextValue = createMockAuthContext(mockUsers.admin);
    const { getByText } = renderWithProviders(
      <ParqueaderosAdminPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    expect(
      getByText("No hay parqueaderos cargados en el sistema"),
    ).toBeInTheDocument();
  });

  test("renderiza el formulario de actualización con todos sus campos", async () => {
    const authContextValue = createMockAuthContext(mockUsers.admin);
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <ParqueaderosAdminPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    expect(getByPlaceholderText("ESFOT")).toBeInTheDocument();
    expect(getByPlaceholderText("Parqueadero de la ESFOT")).toBeInTheDocument();
    expect(getByPlaceholderText("1")).toBeInTheDocument();
    expect(getByPlaceholderText("A")).toBeInTheDocument();
    expect(getByText("Actualizar Parqueadero")).toBeInTheDocument();
  });

  test("muestra mensaje de éxito después de actualizar", async () => {
    const authContextValue = createMockAuthContext(mockUsers.admin);
    const { getByText } = renderWithProviders(
      <ParqueaderosAdminPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    parkingService.updateParking.mockResolvedValueOnce({});

    await act(async () => {
      fireEvent.click(getByText("Actualizar Parqueadero"));
    });

    await waitFor(() => {
      expect(
        getByText("Parqueadero actualizado correctamente"),
      ).toBeInTheDocument();
    });
  });

  test("maneja errores durante la actualización", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    parkingService.updateParking.mockRejectedValueOnce(
      new Error("Error de actualización"),
    );

    const authContextValue = createMockAuthContext(mockUsers.admin);
    const { getByText } = renderWithProviders(
      <ParqueaderosAdminPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    await act(async () => {
      fireEvent.click(getByText("Actualizar Parqueadero"));
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error:", expect.any(Error));
  });

  test("muestra el estado del parqueadero correctamente", async () => {
    const authContextValue = createMockAuthContext(mockUsers.admin);
    const { container } = renderWithProviders(
      <ParqueaderosAdminPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    const parkingGraph = container.querySelector(".border-solid");
    expect(parkingGraph).toBeInTheDocument();
  });

  test("muestra mensaje de parqueadero reservado cuando estado es false", async () => {
    const mockParkingReserved = [
      {
        ...mockParking[0],
        estado: false,
      },
    ];

    parkingService.getParking.mockResolvedValueOnce(mockParkingReserved);

    const authContextValue = createMockAuthContext(mockUsers.admin);
    const { getByText } = renderWithProviders(
      <ParqueaderosAdminPage />,
      authContextValue,
    );

    await act(async () => {
      await parkingService.getParking();
    });

    expect(getByText("PARQUEADERO RESERVADO")).toBeInTheDocument();
    expect(getByText("No disponible para estacionamiento")).toBeInTheDocument();
  });
});
