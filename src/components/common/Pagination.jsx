const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-azul-10 text-white rounded disabled:bg-gray-300"
      >
        Anterior
      </button>
      <span className="text-gray-700">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-azul-10 text-white rounded disabled:bg-gray-300"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
