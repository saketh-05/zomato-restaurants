import "./Pagination.css";

function Pagination({paginate, page, totalPages}) {
  return (
    <div className='pagination'>
      {(() => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const pagesPerSet = isMobile ? 3 : 10; // Show 10 pages at a time
        const currentSet = Math.floor((page - 1) / pagesPerSet); // Determine the current set of 10 pages
        const startPage = currentSet * pagesPerSet + 1;
        const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

        return (
          <>
            {/* Previous Button (Disable if on first set) */}
            {currentSet > 0 && (
              <button onClick={() => paginate(startPage - 1)}>«</button>
            )}

            {startPage > pagesPerSet && (
              <button onClick={() => paginate(1)}>1</button>
            )}
            {startPage > pagesPerSet && <p>...</p>}

            {/* Render the pages dynamically */}
            {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
              <button
                key={startPage + index}
                className={page === startPage + index ? "active" : ""}
                onClick={() => paginate(startPage + index)}
              >
                {startPage + index}
              </button>
            ))}

            {/* Render the last page if not already rendered */}
            {endPage < totalPages && <p>...</p>}
            {endPage < totalPages && (
              <button onClick={() => paginate(totalPages)}>{totalPages}</button>
            )}
            {/* Next Button (Disable if on last set) */}
            {endPage < totalPages && (
              <button onClick={() => paginate(endPage + 1)}>»</button>
            )}
          </>
        );
      })()}
    </div>
  );
}

export default Pagination;
