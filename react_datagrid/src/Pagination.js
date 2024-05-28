import React from "react";

function Pagination({ currentPage, totalItems, itemsPerPage, handlePageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        &lt; 上一頁
      </button>
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        下一頁 &gt;
      </button>
    </div>
  );
}

export default Pagination;
