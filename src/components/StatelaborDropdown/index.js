import React from "react";
import { Col, Form } from "react-bootstrap";

import { State } from "country-state-city";

let state = State.getStatesOfCountry("US");

const StateDropdown = ({ handleChange, name, selected, hideLabel }) => {
  return (
    <Form.Group as={Col} controlId="formGridState">
      {!hideLabel && <Form.Label>State</Form.Label>}
      <Form.Select onChange={handleChange} name={name} value={selected}>
        <option value="">Choose</option>
        {state.map((item) => {
          return (
            <option key={item.isoCode} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
};

export default StateDropdown;
