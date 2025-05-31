import React, { useState } from "react";
export default function Pagination({
  data = [],
  itemsPerPage = 3,
  renderItem,
  itemsWrapperClass = "grid grid-cols-1 md:grid-cols-2 gap-6 mt-10",
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {/* Grid wrapper for all items */}
      <div className={itemsWrapperClass}>
        {currentItems.map((item, index) => renderItem(item, index))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-green-600 text-white"
                  : "bg-yellow-400 hover:bg-green-600"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
