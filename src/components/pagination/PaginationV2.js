import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const PaginationV2 = ({
  totalRecords = null,
  pageLimit = 30,
  pageNeighbours = 0,
  onPageChanged,
  pageNumber,
}) => {
  //   const [loading, setLoading] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [projectsPerPage, setProjectPerPage] = useState(10);

  //   useEffect(() => {

  //   })

  //   const indexOfLastProject = currentPage * projectsPerPage;
  //   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  //   const currentProjects = projects.slice(
  //     indexOfFirstProject,
  //     indexOfLastProject
  //   );

  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalRecords / pageLimit)
  );

  pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
  totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

  // pageNeighbours can be: 0, 1 or 2
  pageNeighbours =
    typeof pageNeighbours === "number"
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  const fetchPageNumbers = () => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const gotoPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    const paginationData = {
      currentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords,
    };
    setCurrentPage(paginationData.currentPage);
    onPageChanged(paginationData);
  };

  const handleClick = (page) => (evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
  };

  if (!totalRecords || totalPages === 1) return null;
  const pages = fetchPageNumbers();

  return (
    <Fragment>
      <div aria-label="">
        <div className="d-flex mx-auto w-80 justify-content-center pagination-class">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE)
              return (
                <div key={index} className="me-2">
                  <Link
                    className="page-link rounded-circle py-2 px-3"
                    to="#"
                    aria-label="Previous"
                    onClick={handleMoveLeft}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    {/* <span className="sr-only">Previous</span> */}
                  </Link>
                </div>
              );

            if (page === RIGHT_PAGE)
              return (
                //   <li key={index} className="page-item rounded-circle">
                <div key={index} className="me-2">
                  <Link
                    className="page-link rounded-circle py-2 px-3"
                    to="#"
                    aria-label="Next"
                    onClick={handleMoveRight}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    {/* <span className="sr-only">Next</span> */}
                  </Link>
                </div>
              );

            return (
              <div
                key={index}
                className={`${currentPage === page ? " active" : ""} me-2`}
              >
                <Link
                  className="page-link rounded-circle py-2 px-3"
                  to="#"
                  onClick={handleClick(page)}
                >
                  {page}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default PaginationV2;
