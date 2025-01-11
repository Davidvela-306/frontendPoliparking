import { renderWithProviders } from "@/helpers/test-utils";
import { GuardiaLayout } from "@/layouts/SideBar";
import { vi, describe, test, beforeEach, expect } from "vitest";
import { act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import guardiaService from "@/services/guardiaService";
import { UsuariosGuardiasPage } from "@/pages/Guardias";

// Mock the guardiaService
vi.mock("@/services/guardiaService", () => ({
  default: {
    getExternalUsers: vi.fn(),
    deleteExternalUser: vi.fn(),
  },
}));

// Mock sample data
const mockUsers = [
  {
    _id: "1",
    nombre: "John",
    apellido: "Doe",
    email: "john@example.com",
    placa_vehiculo: "ABC-123",
    telefono: "1234567890",
    rol: "Administrativo",
  },
  {
    _id: "2",
    nombre: "Jane",
    apellido: "Smith",
    email: "jane@example.com",
    placa_vehiculo: "XYZ-789",
    telefono: "0987654321",
    rol: "Docente",
  },
];

describe("UsuariosGuardiasPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    guardiaService.getExternalUsers.mockResolvedValue(mockUsers);
  });

  test("se renderiza correctamente", async () => {
    let container;

    await act(async () => {
      const rendered = renderWithProviders(
        <GuardiaLayout>
          <UsuariosGuardiasPage />
        </GuardiaLayout>,
      );
      container = rendered.container;
    });

    await waitFor(() => {
      expect(guardiaService.getExternalUsers).toHaveBeenCalled();
    });

    expect(container).toBeTruthy();
  });

  test("maneja la búsqueda y filtrado correctamente", async () => {
      let rendered;
  
      await act(async () => {
        rendered = renderWithProviders(
          <GuardiaLayout>
            <UsuariosGuardiasPage />
          </GuardiaLayout>,
        );
      });
  
      const { getByPlaceholderText, getAllByRole } = rendered;
  
      await waitFor(() => {
        const searchInput = getByPlaceholderText(/Buscar por nombre/i);
        expect(searchInput).toBeTruthy();
      });
  
      await waitFor(() => {
        const buttons = getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
      });
  
      // Test search functionality
      const searchInput = getByPlaceholderText(/Buscar por nombre/i);
      await act(async () => {
        searchInput.value = "John";
        searchInput.dispatchEvent(new Event("change"));
      });
    });

  test("maneja la paginación correctamente", async () => {
      let rendered;
  
      await act(async () => {
        rendered = renderWithProviders(
          <GuardiaLayout>
            <UsuariosGuardiasPage />
          </GuardiaLayout>,
        );
      });
  
      const { getAllByRole } = rendered;
  
      await waitFor(() => {
        const buttons = getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
      });
  
      // Test pagination functionality
      const paginationButton = getAllByRole("button")[1];
      await act(async () => {
        paginationButton.dispatchEvent(new Event("click"));
      });
  
      await waitFor(() => {
        expect(rendered.container).toHaveTextContent("2");
      });
    });

  test("maneja la filtración por rol correctamente", async () => {
      let rendered;
  
      await act(async () => {
        rendered = renderWithProviders(
          <GuardiaLayout>
            <UsuariosGuardiasPage />
          </GuardiaLayout>,
        );
      });
  
      const { getAllByRole } = rendered;
  
      await waitFor(() => {
        const buttons = getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
      });
  
      // Test filter by role functionality
      const filterButton = getAllByRole("button")[2];
      await act(async () => {
        filterButton.dispatchEvent(new Event("click"));
      });
  
      await waitFor(() => {
        expect(rendered.container).toHaveTextContent("Administrativo");
      });
    });
});
