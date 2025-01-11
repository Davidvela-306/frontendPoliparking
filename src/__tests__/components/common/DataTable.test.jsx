import { describe, test, expect, vi, } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import DataTable from "@/components/common/DataTable";

describe("DataTable component", () => {
  test('Renderizar "No hemos encontrado coincidencias" cuando los datos están vacíos', () => {
    const { getByText } = render(
      <DataTable columns={[]} data={[]} actions={[]} />,
    );
    expect(getByText("No hemos encontrado coincidencias")).toBeInTheDocument();
  });

  test("muestra una tabla con datos, columnas y acciones válidos", () => {
    const columns = [
      { key: "name", label: "Name" },
      { key: "age", label: "Age" },
    ];
    const data = [{ _id: 1, name: "John Doe", age: 30 }];
    const actions = [{ label: "Edit", onClick: vi.fn() }];

    const { getByText } = render(
      <DataTable columns={columns} data={data} actions={actions} />,
    );
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Age")).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
  });
  test("muestra una tabla con datos y columnas, pero sin acciones", () => {
    const columns = [
      { key: "name", label: "Name" },
      { key: "age", label: "Age" },
    ];
    const data = [{ _id: 1, name: "John Doe", age: 30 }];

    const { getByText } = render(<DataTable columns={columns} data={data} />);
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Age")).toBeInTheDocument();
  });

  test('representa los valores booleanos de los datos como "Activo" o "Inactivo"', async () => {
    const columns = [{ key: "active", label: "Active" }];
    const data = [
      { _id: 1, active: true },
      { _id: 2, active: false },
    ];

    const { getByText } = render(
      <DataTable columns={columns} data={data} actions={[]} />,
      { ignore: false },
    );
    await waitFor(() => expect(getByText("Activo")).toBeInTheDocument());
    await waitFor(() => expect(getByText("Inactivo")).toBeInTheDocument());
  });

  test("muestra los valores de cadena de los datos tal cual", async () => {
    const columns = [
      { key: "nombre", label: "Nombre" },
      { key: "email", label: "Email" },
    ];
    const data = [
      { _id: 1, nombre: "John Doe", email: "john@example" },
      { _id: 2, nombre: "Jane Smith", email: "jane@example" },
    ];

    const { getByText } = render(
      <DataTable columns={columns} data={data} actions={[]} />,
      { ignore: false },
    );
    await waitFor(() => expect(getByText("John Doe")).toBeInTheDocument());
    await waitFor(() => expect(getByText("jane@example")).toBeInTheDocument());
  });

  test("llama al controlador onClick cuando se hace clic en el botón de acción", async () => {
    const columns = [{ key: "name", label: "Name" }];
    const data = [{ _id: 1, name: "John Doe" }];
    const actions = [{ label: "Edit", onClick: vi.fn() }];

    const { getByText } = render(
      <DataTable columns={columns} data={data} actions={actions} />,
    );
    const editButton = getByText("Edit");
    fireEvent.click(editButton);
    await waitFor(() => expect(actions[0].onClick).toHaveBeenCalledTimes(1));
  });
});
