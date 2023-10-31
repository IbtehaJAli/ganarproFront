import React from 'react';
import { Form } from 'react-bootstrap';
import "./Color.css"

const ColorPicker = ({ borderColor, onBorderColorChange }) => {
  const handleColorChange = (e) => {
    onBorderColorChange(e.target.value);
  };

  return (
    <Form.Group className='color'>
      <Form.Label>Set Border Color</Form.Label>
      <Form.Control
        type="color"
        value={borderColor}
        onChange={handleColorChange}
      />
    </Form.Group>
  );
};

export default ColorPicker;
