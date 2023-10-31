import React from "react";
import { Col, Form } from "react-bootstrap";
import Select from "react-select";
import { State } from "country-state-city";

let state = State.getStatesOfCountry("US");

const MultiStateDropdown = ({ handleChange, name, selected }) => {

  return (
    <Select
      isMulti
      name={name}
      menuPortalTarget={document.body}
      options={state.map((item) => ({"value": item.name, "label": item.name}))}
      value={selected}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleChange}
    />
  );
};

export default MultiStateDropdown;
