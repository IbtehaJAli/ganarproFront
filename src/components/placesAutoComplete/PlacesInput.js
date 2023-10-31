import CloseIcon from "../../assets/icons/CloseIcon";
import BarIcon from "../../assets/icons/BarIcon";
import SearchIcon from "../../assets/icons/SearchIcon";

import { classNames } from "../helpers/helpers";

const PlacesInput = ({
  getInputProps,
  getSuggestionItemProps,
  suggestions,
  loading,
  activeSearch,
  navBarSearch,
  fillColor = "white",
  showSearchHandler,
  customClassInput,
}) => {
  // let customClassName = "search-width";
  // if (activeSearch) {
  //   customClassName = "increase-search-width";
  // }
  return (
    <div
      // className={`position-relative  ${customClassName}`}
      className="position-relative"
      onClick={showSearchHandler}
    >
      <div>
        {navBarSearch && !activeSearch ? (
          <SearchIcon
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={fillColor}
            className="position-absolute start-0 search-icon-svg"
          />
        ) : (
          ""
        )}
        <input
          {...getInputProps({
            placeholder: "Event Location",
            // className: "location-search-input form-control",
            className: classNames(
              customClassInput,
              activeSearch ? "active-search-input" : "nav-search-input"
            ),
          })}
        />
        <div className="icons d-flex position-absolute end-0 top-50 translate-middle-y me-2">
          {activeSearch ? (
            <>
              <CloseIcon
                width="13"
                height="20"
                fill={fillColor}
                className="mx-2 close-search"
              />
              <BarIcon
                width="2"
                height="20"
                fill={fillColor}
                className="mx-2"
              />
            </>
          ) : (
            ""
          )}
          {navBarSearch && !activeSearch ? (
            ""
          ) : (
            <SearchIcon
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill={fillColor}
            />
          )}
        </div>
        <div
          className={
            suggestions.length > 1
              ? "autocomplete-dropdown-container"
              : "no-suggestion"
          }
        >
          {loading && <div>Loading...</div>}
          {suggestions.map((suggestion) => {
            const className = suggestion.active
              ? "suggestion-item--active"
              : "suggestion-item";
            return (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className,
                })}
              >
                <span className="location-text">{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlacesInput;
