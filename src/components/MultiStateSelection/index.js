import React, { useCallback, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getStateLaborPricingList } from "../../store/actions/mortgage_calculator/mortgage_calculator.actions";

const MultiStateSelection = ({ handleChange, name, selected, stateLabors }) => {
  return (
    <>
    {stateLabors ? (
      <Select
        isMulti
        name={name}
        menuPortalTarget={document.body}
        options={stateLabors.map((item) => ({
          value: item.area_name,
          label: item.area_name,
        }))}
        value={selected}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    ) : (
      <Select
        isMulti
        name={name}
        menuPortalTarget={document.body}
        options={{value: "Loading...", label: "Loading..."}}
        value={selected}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    )}
    </>
  );
};

export default MultiStateSelection;
