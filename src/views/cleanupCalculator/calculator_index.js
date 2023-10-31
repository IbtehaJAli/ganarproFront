import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Calculator = () => {

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={10}>
          <Row>
            <h1 className="fw-bolder mt-5 display-3">
            Calculate rates for Final cleaning, generate bid amounts, and assess costs
            </h1>
            <Col md={8} className="justify-content-center mx-auto my-5 mt-3">
              <p className="my-5 h3 lh-base">
                The Ganarpro Cleanup Calculator provides methods for obtaining initial price estimates or establishing a reliable pricing foundation.
                It proves instrumental in aiding cleaning enterprises to secure competitive contracts and streamline the bidding process for enhanced efficiency.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-evenly mt-5 ">
            <Col md={4} className="gy-3 my-sm-5">
              <Link
                to="/cleanup_rates"
                className="text-decoration-none text-dark"
              >
                <Card className="h-100 p-0" border="light">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bolder mb-5 ">
                      {" "}
                      <h2 className="text-start fw-bolder">Rates</h2>
                    </Card.Title>
                    <Card.Text className=" text-start mb-5 h3 lh-base">
                    Swiftly access location-based final clean rates. Customize and configure your own pricing rate sheet.
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="text-center col-md-7 mt-5 py-md-2 px-md-3"
                    >
                      <span className="h3 ">Access Rates</span>
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="gy-3 my-sm-5">
              <Link
                to="/cleanup_calculator"
                className="text-decoration-none text-dark"
              >
                <Card className="h-100 p-0" border="light">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bolder mb-5 ">
                      {" "}
                      <h2 className="text-start fw-bolder">
                        Calculator
                      </h2>
                    </Card.Title>
                    <Card.Text className="h3 text-start mb-5 lh-base">
                    An advanced solution that computes the bid amount for final cleaning, anticipates project expenses, and forecasts potential profits.
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="text-center col-md-7 mt-5 py-md-2"
                    >
                      <span className="h3 ">Use Calculator</span>
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;
