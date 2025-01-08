/**
 * Component that renders a table with the given data.
 * @param {object} props - Object with the following properties:
 * @param {array} props.columns - Array of objects representing the columns of the table.
 * @param {string} props.columns[].key - Column key.
 * @param {string} props.columns[].label - Column title.
 * @param {array} props.data - Array of objects representing the table rows.
 * @param {object} props.data[] - Object representing a table row.
 * @param {array} [props.actions] - Array of objects representing the actions that can be performed in each row.
 * @param {string} props.actions[].label - Title of the action.
 * @param {string} props.actions[].style - CSS styles for the action button.
 * @param {function} props.actions[].onClick - Function to be executed when the action button is clicked.
 * @returns {ReactElement} - A JSX element representing the table.
 */

const DataTable = ({ columns, data, actions }) => {
  if (!data || data.length === 0) {
    return <p>No hemos encontrado coincidencias</p>;
  }
  if (!columns || columns.length === 0) {
    return <p>columns</p>;
  }
  if (actions && actions.length === 0) {
    return <p>actions</p>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-azul-20 text-white border-solid border-t-2 border-gray-300">
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-4 py-2 text-left font-semibold">
              {column.label}
            </th>
          ))}
          {actions && actions.length > 0 && (
            <th className="px-4 py-2 text-center text-amarillo-10 font-semibold">
              {actions.length > 1 ? "Acciones" : "Acción"}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            className="hover:bg-gray-100 border-solid border-t-2 border-gray-300"
            key={item._id}
          >
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-1 py-2 border-b border-gray-300 ${
                  typeof item[column.key] === "boolean" ?
                    item[column.key] ?
                      "text-green-500"
                    : "text-gray-500"
                  : ""
                }`}
              >
                {typeof item[column.key] === "string" ?
                  item[column.key]
                : typeof item[column.key] === "boolean" ?
                  item[column.key] ?
                    "Activo"
                  : "Inactivo"
                : item[column.key]}
              </td>
            ))}
            {actions && (
              <td className="px-4 py-2 border-b border-gray-300 flex items-center justify-center align-middle self-center">
                {actions.map((action, index) => (
                  <button
                    className={`bg-azul-10 text-white px-2 py-1 mr-2 w-full rounded-md ${action.style}`}
                    key={index}
                    onClick={() => action.onClick(item)}
                  >
                    {action.label}
                    {action.icon}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
