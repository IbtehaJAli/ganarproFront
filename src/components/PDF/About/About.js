import React from "react";
import { Form, FormControl } from "react-bootstrap";
import "./About.css";

const About = ({ isEditMode, intialState, handleOnChange }) => {
  return (
    <div className="About">
      
      {isEditMode ? (
        <Form.Control
          className="edit-textarea"
          as="input"
          name="about_us_header"
          value={intialState.about_us_header}
          onChange={handleOnChange}
        />
      ) : (
        <h1 className="about_h"><b>{intialState.about_us_header}</b></h1>
      )}
      {isEditMode ? (
        <Form.Control
          className="edit-textarea"
          as="textarea"
          rows={3}
          name="about_us"
          value={intialState.about_us}
          onChange={handleOnChange}
        />
      ) : (
        <div className="about-content">{intialState.about_us}</div>
      )}
    </div>
  );
};

export default About;
