import React, { useState } from "react";
import { fetchRegions } from "../../store/actions/gc_qualify/gcQualify.actions";
import AsyncSelect from "react-select/async";

const MultiSelectDropdown = ({ customHandler, selectedRegions }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const customFilter = (option, searchText) => {
    if (
      option.label.toLowerCase().includes(searchText.toLowerCase()) ||
      option.value.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleChange = (value) => {
    setSelectedValue(value);
    customHandler(value);
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isSearchable
      value={selectedValue ? selectedValue : selectedRegions}
      filterOption={customFilter}
      getOptionLabel={(e) => e.name}
      getOptionValue={(e) => e.name}
      loadOptions={fetchRegions}
      isMulti
      // onInputChange={handleSelectRegion}
      onChange={handleChange}
    />
  );
};

export default MultiSelectDropdown;
