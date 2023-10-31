import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import preQualImg from "../../assets/img/prequalify.jpg";
import projectImg from "../../assets/img/projects.jpg";
import proposalImg from "../../assets/img/proposal.jpg";
import trialImg from "../../assets/img/trial.jpg";
import calculatorImg from "../../assets/img/calculator.jpg";
import prequelMasterKeyImg from "../../assets/img/prequel_masterkey-min.jpeg";
import capabilitiesImg from "../../assets/img/capabilities-min.jpg";
import { useSelector } from "react-redux";

const Home = () => {
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);

  return (
    <Container>
      <Row className="mt-3 justify-content-center">
        <Col md={7} style={{ height: "10em" }} className="col-7">
          <h1 className="fw-bolder">Welcome to Ganarpro!</h1>
          <p>Dont have a subscription? Checkout the following options.</p>
        </Col>
      </Row>
      <Row>
        <Col className="col-7 justify-content-center mx-auto col-md-3">
          {free_mode_count > 0 ? (
            ""
          ) : (
            <Link to="/signup" className="text-decoration-none text-dark">
              <Card className="">
                <Card.Img
                  variant="top"
                  src={trialImg}
                  style={{ width: "113%" }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fw-bolder">
                    Start with a free trial
                  </Card.Title>
                  <Card.Text>
                    Access Ganarpro Business Suite Cloud services.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="mt-auto align-self-start"
                  >
                    Start
                  </Button>
                </Card.Body>
              </Card>
            </Link>
          )}
        </Col>
      </Row>
      <Row className="my-3">
        <h2 className="text-start fw-bolder">Ganarpro services</h2>
      </Row>
      <Row className="justify-content-center">
        <Col md={3} className="gy-3 my-md-5 my-xs-5 col-7">
          <Link to="/projects_overview" className="text-decoration-none text-dark">
            <Card className="h-100">
              <Card.Img variant="top" src={projectImg} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bolder">Projects</Card.Title>
                <Card.Text className="display-10">
                  Construction project data for prospecting, analyzing, researching.
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit projects
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="gy-3 my-md-5 my-xs-5 col-7">
          <Link
            to="/cleanup_calculator_overview"
            className="text-decoration-none text-dark"
          >
            <Card className="h-100">
              <Card.Img variant="top" src={calculatorImg} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bolder">Calculator</Card.Title>
                <Card.Text>
                  Calculates bid amount estimates and analyze potential cost and
                  profits. Win more bids.
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit calculator
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="gy-3 my-md-5 col-7">
          <Link to="/proposal" className="text-decoration-none text-dark">
            <Card className="h-100">
              <Card.Img variant="top" src={proposalImg} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bolder h1">Proposals</Card.Title>
                <Card.Text>
                  Standardize proposal creation with templates. Satisfy customer
                  needs with the correct scope of work.
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit proposals
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={3} className="gy-3 my-md-5 col-7">
          <Link to="/planify" className="text-decoration-none text-dark">
            <Card className="h-100">
              <Card.Img variant="top" src={preQualImg} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bolder">Planify</Card.Title>
                <Card.Text>
                  Unleash the Power of Pre-Qualification and Dynamic Plan Rooms
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit Planify
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="gy-3 my-md-5 my-xs-5 col-7">
          <Link
            to="/prequel-masterkey"
            className="text-decoration-none text-dark"
          >
            <Card className="h-100">
              <Card.Img variant="top" src={prequelMasterKeyImg} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bolder">Prequel MasterKey</Card.Title>
                <Card.Text>
                  Centralize company information to utilize in vendor
                  application forms. Gather and answer up to 240 questions.
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit Prequel MasterKey
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3} className="gy-3 my-md-5 col-7">
          <Link
            to="/capability_statement"
            className="text-decoration-none text-dark"
          >
            <Card className="h-100">
              <Card.Img variant="top" src={capabilitiesImg} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bolder h1">
                  Capability Statement
                </Card.Title>
                <Card.Text>
                  A single-page summary highlighting your business operations
                  and main contact point.
                </Card.Text>
                <Button variant="primary" className="mt-auto align-self-center">
                  Visit Capability Statement
                </Button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
