/* eslint-disable react/prop-types */

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (number) => {
        setCurrentPage(number);
    };

    const getPageNumbers = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage === 1) {
            return [1, 2, 3];
        }

        if (totalPages === currentPage) {
            return [totalPages - 2, totalPages - 1, totalPages];
        }
        return [currentPage - 1, currentPage, currentPage + 1];
    };

    return (
        <nav className="mt-5">
            <div className="btn-group btn-group-sm d-flex">
                <button type="button" className="btn btn-outline-dark" disabled={currentPage === 1} onClick={handlePrev}>
                    <i className="bi bi-arrow-left-short" />
                    Previous
                </button>

                {getPageNumbers().map((el, i) => (
                    <button key={i} className={`btn ${el === currentPage ? "btn-dark" : "btn-outline-dark"}`} onClick={() => handlePageClick(el)}>
                        {el}
                    </button>
                ))}

                <button type="button" className="btn btn-outline-dark" disabled={currentPage === totalPages} onClick={handleNext}>
                    Next <i className="bi bi-arrow-right-short" />
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
