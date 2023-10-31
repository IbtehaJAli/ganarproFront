import React, { useState } from "react";
import { classNames } from "../../../components/helpers/helpers";
import SearchBar from "../../../components/searchBar/SearchBar";
import { filterArray } from "../../../data/projectBoardFilter";
import SearchIcon from "../../../assets/icons/SearchIcon";
import MapIcon from "../../../assets/icons/MapIcon";
import ListIcon from "../../../assets/icons/ListIcon";
import DownIcon from "../../../assets/icons/DownIcon";
import ProjectListFilter from "./ProjectListFilter";
import BuildingTypeFilter from "./BuildingTypeFilter";
import Search from "../../../components/searchBar/Search";
import Button from "../../../components/button/Button";
import LocationSearchInput from "../../../components/placesAutoComplete/PlacesAutoComplete";
import Modal from "../../../components/modal/Modal";
import SaveSearchForm from "../../../components/forms/saveSearchForm/SaveSearchForm";
import LocationIcon from "../../../assets/icons/LocationIcon";

const ProjectBoardNav = ({
  selectedTab,
  setSelectedTab,
  setQueryParams,
  phases,
  sizes,
  buildingTypes,
  queryString,
  modalState,
  setSearchLatLng,
  saveSearchHandler,
  handleGetLocation,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [projectTypeFilters, setProjectTypeFilters] = useState([]);
  const [phaseFilters, setPhaseFilters] = useState([]);
  const [sizeFilters, setSizeFilters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);

  const handleBuildingTypesFilters = (target, filterItem) => {
    if (target.checked) {
      setProjectTypeFilters((prevItems) => [...prevItems, filterItem]);
      return;
    }
    const filterItems = projectTypeFilters.filter(
      (item) => item !== filterItem
    );
    setProjectTypeFilters([...filterItems]);
  };

  const handlePhaseFilters = (target, filterItem) => {
    if (target.checked) {
      setPhaseFilters((prevItems) => [...prevItems, filterItem]);
      return;
    }
    const filterItems = phaseFilters.filter((item) => item !== filterItem);
    setPhaseFilters([...filterItems]);
  };

  const handleSizeFilters = (target, filterItem) => {
    if (target.checked) {
      setSizeFilters((prevItems) => [...prevItems, filterItem]);
      return;
    }
    const filterItems = sizeFilters.filter((item) => item !== filterItem);
    setSizeFilters([...filterItems]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearch(!showSearch);
  };

  const handleSetLatLng = (latLng) => {
    setSearchLatLng(latLng);
    handleSubmitFilter("", latLng);
  };

  const handleSubmitFilter = (value = null, latLng = "") => {
    let search = "";
    if (typeof value === "string") {
      search = value?.split(",")[0];
      if (!search) {
        search = searchValue;
      }
    }
    const values = {
      phaseFilters: phaseFilters.toString() ?? "",
      sizeFilters: sizeFilters.toString() ?? "",
      projectTypes: projectTypeFilters.toString() ?? "",
      searchValue: search.toString() ?? "",
      sortItem: "",
      latitude: latLng.lat ?? "",
      longitude: latLng.lng ?? "",
    };
    setQueryParams(values);
  };

  const handleShowSearch = (e) => {
    if (e.target.name === "search-location") {
      setShowSearch(true);
      return;
    }
    if (e.target.name === "input-search") {
      setShowSearch(true);
      return;
    }
    if (e.target.name === "search-mobile") {
      setShowSearch(true);
      return;
    }
    e.stopPropagation();
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e);
    setShowSearch(true);
    // handleSubmitFilter(e);
  };

  const handleSelectAll = (e, placeHolder) => {
    const value = e.target.checked;
    const checkbox = document.querySelectorAll(`.${placeHolder}`);
    checkbox.forEach((checkbox) => (checkbox.checked = value));
    if (placeHolder === "phase") {
      if (value) {
        const allPhase = filterArray[0].values.map((filter) => filter.value);
        setPhaseFilters([...allPhase]);
        return;
      }
      setPhaseFilters([]);
    } else if (placeHolder === "size") {
      if (value) {
        const allSize = filterArray[1].values.map((filter) => filter.value);
        setSizeFilters([...allSize]);
        return;
      }
      setSizeFilters([]);
    } else if (placeHolder === "building") {
      if (value) {
        const allBuilding = filterArray[2].values.map((filter) => filter.value);
        setProjectTypeFilters([...allBuilding]);
        return;
      }
      setProjectTypeFilters([]);
    }
  };
  const handleShowSaveSearchModal = () => {
    setShowSaveSearchModal(true);
  };
  const handleCloseSaveSearchModal = (e) => {
    saveSearchHandler(e);
    setShowSaveSearchModal(false);
  };

  return (
    <div className="bg-primary position-relative">
      <div className="d-flex justify-content-between d-md-none">
        <div
          className="text-white d-flex col-4 justify-content-center cursor-pointer py-3"
          onClick={handleShowSearch}
        >
          <SearchIcon fill="#BBBBBB" width="20" height="20" className="me-2" />
          <div>Search</div>
        </div>

        <div
          className={classNames(
            "text-white d-flex col-4 justify-content-center cursor-pointer py-3",
            selectedTab === "map" ? "project-board-nav-active" : ""
          )}
          onClick={() => setSelectedTab("map")}
        >
          <MapIcon fill="white" width="21" height="21" className="icon me-2" />
          <div>Map</div>
        </div>
        <div
          className={classNames(
            "text-white d-flex col-4 justify-content-center cursor-pointer py-3",
            selectedTab === "list" ? "project-board-nav-active" : ""
          )}
          onClick={() => setSelectedTab("list")}
        >
          <ListIcon fill="white" width="18" height="18" className="icon me-2" />
          <div>List</div>
        </div>
      </div>

      <div className="d-none d-md-flex justify-content-between align-items-center px-2 py-3">
        <div className="wrapper__menu__input m-1">
          <form onSubmit={handleSearch}>
            <Search
              showSearchHandler={handleShowSearch}
              activeSearch={showSearch}
              searchValue={searchValue}
              setSearchValue={handleSearchChange}
              handleSearchChange={handleSearchChange}
              customClassInput="form-control project-board-search"
              placeHolder="Search by project name or location oo"
              setSearchLatLng={handleSetLatLng}
              handleGetLocation={handleGetLocation}
            />
          </form>
          {/* <LocationSearchInput location={locationHandler} /> */}
        </div>
        <div className="d-flex justify-content-end w-60 filter-container">
          <div className="text-white d-flex justify-content-between align-items-center position-relative me-5">
            <ProjectListFilter
              title={
                <div className="d-flex bg-transparent border-0 body-text text-white">
                  Phase
                  <DownIcon height="18" width="14" className="ms-2 mt-1" />
                </div>
              }
              filters={filterArray[0]}
              filterData={phases}
              placeHolder="Phase"
              handleSelectAll={handleSelectAll}
              handleFilter={handlePhaseFilters}
              submitFilter={handleSubmitFilter}
            />
            <ProjectListFilter
              title={
                <div className="d-flex bg-transparent border-0 body-text text-white">
                  Size
                  <DownIcon height="18" width="14" className="ms-2 mt-1" />
                </div>
              }
              filters={filterArray[1]}
              filterData={sizes}
              placeHolder="Size"
              handleSelectAll={handleSelectAll}
              handleFilter={handleSizeFilters}
              submitFilter={handleSubmitFilter}
            />
            <BuildingTypeFilter
              title={
                <div className="d-flex bg-transparent border-0 body-text text-white">
                  Building Types
                  <DownIcon height="18" width="14" className="ms-2 mt-1" />
                </div>
              }
              handleSelectAll={handleSelectAll}
              handleFilter={handleBuildingTypesFilters}
              submitFilter={handleSubmitFilter}
              filterData={buildingTypes}
            />
          </div>
          <Button
            customClassName="btn-board-nav"
            onClick={handleShowSaveSearchModal}
          >
            Save Search
          </Button>
          <Modal
            title="Save the Search"
            show={showSaveSearchModal}
            onCloseModal={handleCloseSaveSearchModal}
          >
            <SaveSearchForm
              queryString={queryString}
              closeSaveSearch={handleCloseSaveSearchModal}
              saveSearchHandler={handleCloseSaveSearchModal}
              // saveSearchHandler={saveSearchHandler}
            />
          </Modal>
        </div>
      </div>

      {showSearch ? (
        <div className="position-absolute bg-white w-100 show-search-mobile">
          {/* <div class="triangle-up"></div> */}
          <div>
            <SearchBar
              handlePhaseFilters={handlePhaseFilters}
              handleBuildingTypesFilters={handleBuildingTypesFilters}
              handleSizeFilters={handleSizeFilters}
              submitFilter={handleSubmitFilter}
              showSearchHandler={handleShowSearch}
              activeSearch={showSearch}
              searchValue={searchValue}
              handleSearchChange={handleSearchChange}
              // handleSearch={handleSearch}
              handleSelectAll={handleSelectAll}
              setSearchLatLng={handleSetLatLng}
              handleGetLocation={handleGetLocation}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProjectBoardNav;
