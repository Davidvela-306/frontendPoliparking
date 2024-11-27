
const TableComponent = ({
  columns,
  data,
  actions,
  onPageChange,
  currentPage,
  totalPages,
  searchTerm,
  onSearch,
}) => {
  return (
    <div className="table-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar..."
        />
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {actions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
              {actions && (
                <td>
                  {actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => action.onClick(row)}
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
      <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)}>Anterior</button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={() => onPageChange(currentPage + 1)}>Siguiente</button>
      </div>
    </div>
  );
};

export default TableComponent;
