import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Planify = () => {
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={10}>
          <Row>
            <h1 className="fw-bolder mt-5 display-3">
              Streamline your proposals: Generate or Download Templates
            </h1>
            <Col md={8} className="justify-content-center mx-auto my-5 mt-3">
              <p className="my-5 h3 lh-base">
                Ganarpro Proposal provides a document generator and access to
                construction cleaning scope of work templates. It streamlines
                the process by delivering estimator and project manager approved
                commercial construction scope of work requirements.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-evenly mt-5 ">
            <Col md={4} className="gy-3 my-sm-5">
              <Link
                to="/my_proposal"
                className="text-decoration-none text-dark"
              >
                <Card className="h-100 p-0" border="light">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bolder mb-5 ">
                      {" "}
                      <h2 className="text-start fw-bolder">
                        Document generator
                      </h2>
                    </Card.Title>
                    <Card.Text className="h3 text-start mb-5 lh-base">
                      Experience the efficiency of our automated merging feature
                      as you create compelling proposals with ease
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="text-center col-md-7 mt-5 py-md-2"
                    >
                      <span className="h3 ">CREATE proposal</span>
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="gy-3 my-sm-5">
              <Link
                to="/proposal_templates"
                className="text-decoration-none text-dark"
              >
                <Card className="h-100 p-0" border="light">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bolder mb-5 ">
                      {" "}
                      <h2 className="text-start fw-bolder">Templates</h2>
                    </Card.Title>
                    <Card.Text className=" text-start mb-5 h3 lh-base">
                      Empower your brand and streamline your document creation
                      process with our set on. downloadable construction
                      cleaning proposal templates that will serve you
                      indefinitely.
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="text-center col-md-7 mt-5 py-md-2 px-md-3"
                    >
                      <span className="h3 ">VIEW templates</span>
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

export default Planify;
