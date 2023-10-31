import React from "react";
import { Col, Form } from "react-bootstrap";
import { State, City } from "country-state-city";

let cities = City.getCitiesOfState("US", "");
const CityDropdown = ({ projectState }) => {
  let cities = City.getCitiesOfState("US", projectState);
  return (
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>City</Form.Label>
      <Form.Select defaultValue="Choose...">
        <option>Choose...</option>
        {cities.map((item, index) => {
          return (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
};

export default CityDropdown;
