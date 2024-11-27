const DataTable = ({
  columns,
  data,
  actions,
}) => {
  if (actions && actions.length === 0) {
    actions = null;
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
          {actions && (
            <th className="px-4 py-2 text-left text-amarillo-10 font-semibold">
              Acciones
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
                className="px-4 py-2 border-b border-gray-300"
              >
                {column.render ?
                  column.render(item[column.key], item)
                : item[column.key]}
              </td>
            ))}
            {actions && ( // <--- Agregamos esta condición
              <td className="px-4 py-2 border-b border-gray-300">
                {actions.map((action, index) => ( // <--- Iteramos sobre las acciones
                  <button
                    key={index}
                    onClick={() => action.onClick(item)}
                  >
                    {action.label}
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