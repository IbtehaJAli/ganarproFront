import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import "./PlacesAutoComplete.css";
import LocationIcon from "../../assets/icons/LocationIcon";
import CloseIcon from "../../assets/icons/CloseIcon";

const LocationSearchInput = ({
  activeSearch,
  placeholder,
  searchValue,
  handleSearchChange,
  setSearchLatLng,
  handleMapSearchActive,
  // currentLocation,
  handleSetCurrentLocation,
  // handleGetLocation,
}) => {
  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
    if (address != "") {
      handleSetCurrentLocation(false);
      return;
    }
    handleSetCurrentLocation(true);
  };

  const handleSelect = (address) => {
    setAddress(address);
    handleSearchChange(address);
    const position = geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setSearchLatLng(latLng))
      .catch((error) => console.error("Error", error));
  };

  const clearSearchIcon = (e) => {
    setAddress("");
    e.stopPropagation();
  };

  let customClassInput =
    "form-control project-board-search location-search-input increase-search-width";
  if (activeSearch) {
    customClassInput = `${customClassInput} increase-search-width`;
  }
  if (!activeSearch) {
    customClassInput = `${customClassInput} map-search-input`;
  }

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions: { country: "us" } }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                className: customClassInput,
                placeholder: placeholder,
                name: "input-search",
                valueprop: address,
                // onChangeProp: handleChange,
                onFocus: handleMapSearchActive,
                onBlur: handleMapSearchActive,
              })}
            />

            {!loading && suggestions?.length > 0 ? (
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={suggestion.index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span className="search-location">
                        {suggestion.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </PlacesAutocomplete>
      <div className="clear-search-icon" onClick={clearSearchIcon}>
        <CloseIcon
          width="13"
          height="20"
          fill="white"
          className="mx-2 close-search z-3"
          handleClick={clearSearchIcon}
        />
      </div>
    </>
  );
};
export default LocationSearchInput;
