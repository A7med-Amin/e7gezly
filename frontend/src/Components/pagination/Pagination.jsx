import React, { useState } from 'react';
import './pagination.css'; // Import the CSS file

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const [pageGroup, setPageGroup] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagesPerGroup = 7;
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const currentGroupPages = pages.slice((pageGroup - 1) * pagesPerGroup, pageGroup * pagesPerGroup);

  return (
    <div className="pagination-container">
      {pageGroup > 1 && (
        <button onClick={() => setPageGroup(pageGroup - 1)} className="pagination-button">
          Previous
        </button>
      )}
      {currentGroupPages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${page === currentPage ? 'active' : 'inactive'}`}
        >
          {page}
        </button>
      ))}
      {pageGroup < totalGroups && (
        <button onClick={() => setPageGroup(pageGroup + 1)} className="pagination-button">
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;