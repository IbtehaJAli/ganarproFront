import { useEffect, useState } from "react";
import SelectInput from "../../../components/input/SelectInput";
import Spinner from "../../../components/spinner/Spinner";
import ProjectDataCard from "../components/ProjectDataCard";
import Pagination from "../../../components/pagination/Pagination";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PaginationV2 from "../../../components/pagination/PaginationV2";
import MapLoader from "../../../assets/img/map-loader.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const LargeScreen = ({
  loading,
  selectedTab,
  count,
  selectedSortItem,
  projects,
  currentPage,
  sortItems,
  favouriteProjects,
  handleSelectedSortItem,
  handlePageChanged,
  handleArchive,
  handleFavourite,
  map,
  handleProjectDetailCLick,
  authenticatedUser,
  firstTimeLoading,
}) => {
  const { user } = useSelector((state) => state.userDetails);
  const checkFav = (id) => {
    const isFavourite = user?.project_favorites?.find(
      (project) => project?.id === id
    );
    if (isFavourite) {
      return true;
    }
    return false;
  };

  const indexOfLastProject = currentPage * 10;
  const indexOfFirstProject = indexOfLastProject - 10;
  const currentProjects = projects?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  return (
    <>
      {/* <div className="col-6 ps-0">{map}</div> */}
      {/* {!currentProjects && !loading ? ( */}
      {firstTimeLoading ? (
        <div className="m-auto large-screen-pag full-loader">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="col-6 ps-0 map-section" style={{ top: "-70px" }}>
            {/* {currentProjects && !loading ? ( */}
            {firstTimeLoading ? (
              <img src={MapLoader} alt="map" className="w-100 h-100" />
            ) : (
              map
            )}
          </div>

          <div className="col-6 row-cols-2 justify-content-between my-2 project-list-div">
            <div className="col-12 mt-4 mt-lg-5 row row-cols-2 mb-5 large-screen-details">
              <div className="d-flex px-0 col-5 align-items-center">
                <h4 className="text-start me-3 font-oswald lead-text">
                  Project Board
                </h4>
                <div className="text-start body-text">
                  Showing {count} Results.
                </div>
              </div>
              <div className="d-flex px-0 col-4 align-items-center ms-auto">
                <p className="mb-0 ms-auto body-text-bold">Sort by:</p>
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
            {/* <div className="col-12 mt-4 mt-lg-0 row row-cols-2 pb-4 col-12 overflow-scroll project-board-card-container"> */}
            <div className="col-12 mt-4 mt-lg-0 project-bb overflow-scroll">
              {/* <div className="mt-4 mt-lg-0 row row-cols-2 col-12 pb-4 overflow-scroll"> */}
              {loading ? (
                <div className="m-auto large-screen-pag">
                  <Spinner />
                </div>
              ) : (
                currentProjects?.map((project) => (
                  <ProjectDataCard
                    key={project.id}
                    handleProjectDetailCLick={handleProjectDetailCLick}
                    handleArchive={handleArchive}
                    handleFavourite={handleFavourite}
                    isFavourite={checkFav(project.id)}
                    {...project}
                    authenticatedUser={authenticatedUser}
                  />
                ))
              )}
              <div className="col-12 large-screen-pag">
                {loading ? (
                  ""
                ) : (
                  <PaginationV2
                    totalRecords={projects?.length}
                    pageLimit={10}
                    pageNeighbours={1}
                    onPageChanged={handlePageChanged}
                    pageNumber={currentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LargeScreen;
