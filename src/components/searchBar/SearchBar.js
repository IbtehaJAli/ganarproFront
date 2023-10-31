import React, { useState } from "react";
import { filterArray } from "../../data/projectBoardFilter";
import Accordion from "../accordion/Accordion";
import FilterIcon from "../../assets/icons/FilterIcon";

import "./SearchBar.css";
import Search from "./Search";

const SearchBar = ({
  handlePhaseFilters,
  handleBuildingTypesFilters,
  handleSizeFilters,
  submitFilter,
  showSearchHandler,
  activeSearch,
  searchValue,
  handleSearchChange,
  handleSearch,
  handleSelectAll,
  setSearchLatLng,
  handleGetLocation,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
    submitFilter();
  };

  const handleChange = (target, filterKey, value) => {
    switch (filterKey) {
      case "phase":
        handlePhaseFilters(target, value);
        break;
      case "building":
        handleBuildingTypesFilters(target, value);
        break;
      case "size":
        handleSizeFilters(target, value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="px-2 border-white py-4 d-md-none">
      <div>
        <form onSubmit={handleSearch} className="mb-3">
          <Search
            showSearchHandler={showSearchHandler}
            activeSearch={true}
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            fillColor="#BBBBBB"
            customClassInput="form-control project-board-search py-3"
            name="search-mobile"
            placeHolder="Search by project name or location "
            setSearchLatLng={setSearchLatLng}
            handleGetLocation={handleGetLocation}
          />
        </form>
        <div className="">
          <div className="d-flex justify-content-between mb-4">
            <button
              className="btn btn-outline-primary small-size"
              onClick={handleShowFilter}
            >
              {showFilter ? (
                "Done"
              ) : (
                <>
                  <FilterIcon
                    width="24"
                    height="24"
                    fill="#276FB4"
                    className="me-3"
                  />
                  Filter
                </>
              )}
            </button>
            <button className="btn btn-primary small-size">Save Search</button>
          </div>
          {showFilter ? (
            <div>
              {filterArray.map((filter, index) => (
                <Accordion
                  accordionClass="border-top pt-5 mb-5"
                  title={filter.title}
                  key={index + 1}
                >
                  <div className="">
                    <div className="text-start mb-4">
                      <input
                        type="checkbox"
                        className="me-3"
                        onChange={(e) => handleSelectAll(e, filter.key)}
                      />
                      <label htmlFor="">Select All </label>
                    </div>
                    {filter?.values?.map((value, index) => (
                      <div key={index + 1} className="text-start mb-4">
                        <input
                          type="checkbox"
                          className={`me-3 ${filter.key}`}
                          onChange={(e) =>
                            handleChange(e.target, filter.key, value.key)
                          }
                        />
                        <label htmlFor="">{value.value}</label>
                      </div>
                    ))}
                  </div>
                </Accordion>
              ))}
            </div>
          ) : (
            <div className="text-start">
              {/* <p className="text-10 black-300">Recent Searches</p> */}
              {/* <div>
                {new Array(4).fill(4).map((card, index) => (
                  <div
                    key={index + 1}
                    className="d-flex justify-content-between text-13 my-3 black-100"
                  >
                    <p className="mb-0">Oak Grove Racing & Gaming</p>
                    <CloseIcon
                      width="13"
                      height="20"
                      fill="#BBBBBB"
                      className="mx-2 close-search"
                    />
                  </div>
                ))}
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
