import Button from "react-bootstrap/Button";

function Pagination({
    currentPage,

    handlePageClick,
    totalPages,
}) {
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
        <div className="pagination">
            <Button
                variant="primary"
                disabled={currentPage === 1}
                onClick={() => handlePageClick(currentPage - 1)}
            >
                Prev
            </Button>
            {visiblePageNumbers.map((page) => (
                <Button
                    key={`page-${page}`}
                    variant="primary"
                    onClick={() => handlePageClick(page)}
                    active={currentPage === page}
                >
                    {page}
                </Button>
            ))}
            <Button
                variant="primary"
                disabled={currentPage === totalPages}
                onClick={() => handlePageClick(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;
