// src/components/DataDisplay.js
import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

function DataDisplay({ locations }) {
  return (
    <Row>
      {locations.map((location, index) => (
        <Col md={12} key={index} className="mb-3">
          <Card>
            <Card.Header>{location.project_name}</Card.Header>
            <Card.Body>
              <Card.Title>{location.project_name}</Card.Title>
              <Card.Text>
                {/* Display additional details */}
                Address: {location.address}, {location.city}, {location.state}{" "}
                {location.zip_code}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
              {/* Any footer info */}
              Bid Due Date: {location.bid_due_date}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DataDisplay;
