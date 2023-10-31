import CloseIcon from "../../assets/icons/CloseIcon";
import BarIcon from "../../assets/icons/BarIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import LocationSearchInput from "../placesAutoComplete/PlacesAutoComplete";

import LocationIcon from "../../assets/icons/LocationIcon";

import "./SearchBar.css";
import { classNames } from "../helpers/helpers";
import { useState } from "react";

const Search = ({
  showSearchHandler,
  activeSearch,
  searchValue,
  handleSearchChange,
  fillColor = "white",
  customClassInput,
  placeHolder,
  name = "search",
  setSearchLatLng,
  globalSearch,
  handleGetLocation,
}) => {
  const [searchActive, setSearchActive] = useState(false);
  const [mapSearchActive, setMapSearchActive] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(false);

  const searchActiveHandler = (e) => {
    if (e.type === "focus") {
      setSearchActive(true);
      return;
    }
    if (e.type === "blur") {
      setSearchActive(false);
    }
  };

  const mapSearchHandler = (e) => {
    if (e.type === "focus") {
      setMapSearchActive(true);
      return;
    }
    if (e.type === "blur") {
      setMapSearchActive(false);
    }
  };

  const setCurrentLocationHandler = (value, getProjectLocation = false) => {
    if (getProjectLocation) {
      handleGetLocation();
    }
  };

  // let customClassName = "search-width";
  let customClassName = "increase-search-width";
  if (activeSearch || mapSearchActive) {
    // customClassName = "increase-search-width";
  }
  if (!activeSearch || !mapSearchActive) {
    customClassName = `increase-search-width`;
    // customClassName = `map-search-input`;
  }
  return (
    <>
      <div
        className={`position-relative  ${customClassName}`}
        onClick={showSearchHandler}
      >
        {globalSearch ? (
          <>
            <div className="icons d-flex position-absolute start-0 top-50 translate-middle-y ms-3 me-4">
              {globalSearch ? (
                <SearchIcon
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill={fillColor}
                />
              ) : (
                ""
              )}
            </div>
            <input
              type="text"
              className={classNames(
                customClassInput,
                activeSearch ? "active-search-input" : "nav-search-input"
              )}
              placeholder={placeHolder}
              name={name}
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={searchActiveHandler}
              onBlur={searchActiveHandler}
            />
          </>
        ) : (
          <>
            <LocationSearchInput
              activeSearch={mapSearchActive}
              placeholder={placeHolder}
              inputName={name}
              searchValue={searchValue}
              handleSearchChange={handleSearchChange}
              setSearchLatLng={setSearchLatLng}
              handleMapSearchActive={mapSearchHandler}
              // currentLocation={currentLocation}
              handleSetCurrentLocation={setCurrentLocationHandler}
              // handleGetLocation={handleGetLocation}
            />
            {currentLocation ? (
              <div
                className="search-current-location"
                onClick={(e) => mapSearchHandler(e, true)}
              >
                <LocationIcon
                  width="10"
                  height="12"
                  fill="#333333"
                  className="me-3 mb-1"
                />
                Current Location
              </div>
            ) : (
              ""
            )}
          </>
        )}

        <div
          className="icons position-absolute end-0 top-50 translate-middle-y me-3 search-icon-container"
        >
          {searchActive || mapSearchActive ? (
            <>
              {/* <CloseIcon
                width="13"
                height="20"
                fill={fillColor}
                className="mx-2 close-search z-3"
                handleClick={clearSearchIcon}
              /> */}
              {
                globalSearch ? "" : ""
                // <BarIcon
                //   width="2"
                //   height="20"
                //   fill={fillColor}
                //   className="mx-2"
                // />
              }
            </>
          ) : (
            ""
          )}
          {
            !mapSearchActive || globalSearch ? "" : ""
            // <SearchIcon
            //   width="16"
            //   height="16"
            //   viewBox="0 0 16 16"
            //   fill={fillColor}
            // />
          }
        </div>
      </div>
    </>
  );
};

export default Search;
