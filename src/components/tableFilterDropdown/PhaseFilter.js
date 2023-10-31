import React from 'react';
import { Button, Col, Form, Row, Container } from "react-bootstrap";
export const PhaseFilters = ({ value, onChange }) => {
  return (
    <Form.Select
      style={{height: '40px',}}
      value={value}
      onChange={(e) => onChange(e.target.value)}>
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="historical">Historical (Complete)</option>
    </Form.Select>
  );
};
