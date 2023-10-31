import SelectInput from "../../../components/input/SelectInput";
import Spinner from "../../../components/spinner/Spinner";
import ProjectDataCard from "../components/ProjectDataCard";
import Pagination from "../../../components/pagination/Pagination";
import PaginationV2 from "../../../components/pagination/PaginationV2";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Mobile = ({
  loading,
  selectedTab,
  count,
  selectedSortItem,
  projects,
  currentPage,
  sortItems,
  handleSelectedSortItem,
  handlePageChanged,
  handleArchive,
  handleFavourite,
  map,
  handleProjectDetailCLick,
  authenticatedUser,
}) => {
  const { user } = useSelector((state) => state.userDetails);
  return (
    <>
      {selectedTab === "list" ? (
        <>
          <div className="mt-4">
            <h4 className="text-start font-oswald lead-text">Projects Board</h4>

            <div className="d-flex text-10 align-items-center justify-content-between mb-5">
              <div className="">Showing {count} Results.</div>

              <div className="d-flex px-0 col-4 align-items-center justify-content-between">
                <p className="mb-0 fw-bolder">Sort by:</p>
                <div className="project-board-drop-filter ms-auto">
                  <DropdownButton
                    id="dropdown-item-button"
                    title={selectedSortItem}
                  >
                    {sortItems.map((item) => (
                      <Dropdown.Item
                        key={item.id}
                        onClick={() => handleSelectedSortItem(item.id)}
                        className="cursor-pointer select-input-item py-2 ps-4"
                        as="button"
                      >
                        {" "}
                        {item.value}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                  {/*<SelectInput selectedItem={selectedSortItem}>*/}
                  {/*  {sortItems.map((item) => (*/}
                  {/*    <div*/}
                  {/*      key={item.id}*/}
                  {/*      onClick={() => handleSelectedSortItem(item.id)}*/}
                  {/*      className="cursor-pointer select-input-item py-2 ps-4"*/}
                  {/*    >*/}
                  {/*      {item.value}*/}
                  {/*    </div>*/}
                  {/*  ))}*/}
                  {/*</SelectInput>*/}
                </div>
              </div>
              {user && (
                <div className="col-3 d-flex px-0 align-items-center">
                  <Link
                    to="/myganarpro/favorites"
                    className="text-decoration-none"
                  >
                    {" "}
                    <p className="fw-bolder m-0">
                      {" "}
                      {user?.project_favorites.length} Saved Project
                    </p>{" "}
                  </Link>
                </div>
              )}
            </div>

            <div>
              {loading ? (
                <div className="m-auto">
                  <Spinner />
                </div>
              ) : (
                projects?.map((project) => (
                  <ProjectDataCard
                    key={project.id}
                    handleArchive={handleArchive}
                    handleFavourite={handleFavourite}
                    handleProjectDetailCLick={handleProjectDetailCLick}
                    {...project}
                    authenticatedUser={authenticatedUser}
                  />
                ))
              )}
            </div>
          </div>
          <div className="col-10 mx-auto">
            {loading ? (
              ""
            ) : (
              // <Pagination
              //   totalRecords={count}
              //   pageLimit={10}
              //   pageNeighbours={0}
              //   onPageChanged={handlePageChanged}
              //   pageNumber={currentPage}
              // />
              <PaginationV2
                totalRecords={projects?.length}
                pageLimit={10}
                pageNeighbours={1}
                onPageChanged={handlePageChanged}
                pageNumber={currentPage}
              />
            )}
          </div>
        </>
      ) : (
        <div>
          <div className="col-12 mb-4" style={{ height: "90vh" }}>
            {map}
          </div>
        </div>
      )}
      {/* <div className="col-10 mx-auto">
        {loading ? (
          ""
        ) : (
          <Pagination
            totalRecords={count}
            pageLimit={10}
            pageNeighbours={0}
            onPageChanged={handlePageChanged}
            pageNumber={currentPage}
          />
        )}
      </div> */}
    </>
  );
};

export default Mobile;
