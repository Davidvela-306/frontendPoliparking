import { screen } from "@testing-library/react";
import SideBar, {
  AdminLayout,
  GuardiaLayout,
  UsuarioLayout,
} from "@/layouts/SideBar";
import {
  adminNavData,
  guardiaNavData,
  usuarioNavData,
} from "@/assets/data/NavData";
import { expect, describe, test } from "vitest";
import {
  renderWithProviders,
  mockUsers,
  createMockAuthContext,
} from "@/helpers/test-utils";

describe("SideBar", () => {
  test("se renderiza correctamente", () => {
    renderWithProviders(<SideBar />);
  });

  test("Renderiza valores por defecto cuando no se proporcionan props", () => {
    renderWithProviders(<SideBar />);
    expect(screen.getByText("Default Header")).toBeInTheDocument();
    expect(screen.getByText("Default Left Side")).toBeInTheDocument();
    expect(screen.getByText("Default Body Content")).toBeInTheDocument();
  });

  test("Renderiza correctamente cuando se proporcionan props", () => {
    const header = <h1>Custom Header</h1>;
    const leftSide = <h2>Custom Left Side</h2>;
    const children = (
      <>
        <p>Custom Body Content</p>
        <img src="/api/placeholder/400/320" alt="camaleon" />
      </>
    );
    renderWithProviders(
      <SideBar header={header} leftSide={leftSide}>
        {children}
      </SideBar>,
    );
    expect(screen.getByText("Custom Header")).toBeInTheDocument();
    expect(screen.getByText("Custom Left Side")).toBeInTheDocument();
    expect(screen.getByText("Custom Body Content")).toBeInTheDocument();
  });
});

describe("Layouts con AuthProvider y Router", () => {
  test("AdminLayout se renderiza correctamente cuando el usuario es admin", () => {
    const authContext = createMockAuthContext(mockUsers.admin);
    renderWithProviders(<AdminLayout>Admin Content</AdminLayout>, authContext);

    expect(screen.getByText("Admin Content")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    adminNavData.forEach((item) => {
      if (item.title) {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      }
    });
  });

  test("GuardiaLayout se renderiza correctamente cuando el usuario es guardia", () => {
    const authContext = createMockAuthContext(mockUsers.guardia);
    renderWithProviders(
      <GuardiaLayout>Guardia Content</GuardiaLayout>,
      authContext,
    );

    expect(screen.getByText("Guardia Content")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    guardiaNavData.forEach((item) => {
      if (item.title) {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      }
    });
  });

  test("UsuarioLayout se renderiza correctamente cuando el usuario es un usuario externo", () => {
    const authContext = createMockAuthContext(mockUsers.usuario);
    renderWithProviders(
      <UsuarioLayout>Usuario Content</UsuarioLayout>,
      authContext,
    );

    expect(screen.getByText("Usuario Content")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    usuarioNavData.forEach((item) => {
      if (item.title) {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      }
    });
  });
});
