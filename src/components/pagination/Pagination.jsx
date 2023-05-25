import Button from "react-bootstrap/Button";

import "./Pagination.scss";

function Pagination({ currentPage, handlePageClick, totalPages }) {
    const paginationRange = 5;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const startIndex = Math.max(
        currentPage - Math.floor(paginationRange / 2),
        0
    );
    const endIndex = Math.min(
        startIndex + paginationRange - 1,
        pageNumbers.length - 1
    );
    const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex + 1);
    return (
        <div className="pagination-box">
            <Button
                className="pagination-previous-btn"
                variant="secondary"
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                Prev
            </Button>
            {visiblePageNumbers.map((page) => (
                <Button
                    className={`pagination-circle-btn ${
                        pageNumbers === currentPage ? "active" : ""
                    }`}
                    key={`page-${page}`}
                    variant="secondary"
                    onClick={() => handlePageClick(page)}
                    active={currentPage === page}
                >
                    {page}
                </Button>
            ))}
            <Button
                className="pagination-next-btn"
                variant="secondary"
                disabled={currentPage === totalPages}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;
