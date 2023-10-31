import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Proposal = () => {
  const { free_mode_count } = useSelector((state) => state.userFreeModeCount);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={10}>
          <Row>
            <h1 className="fw-bolder mt-5 display-3 text-center">
              Unleash the Power of Pre-Qualification <br />
              and Dynamic Plan Rooms
            </h1>
            <Col md={8} className="justify-content-center mx-auto my-5 mt-3 ">
              <p className="my-5 h3 lh-base">
                Discover a world of customers and endless opportunities through
                Planify. Connect with prospective clients, unlock new business
                prospects, and forge valuable partnerships. With Planify,
                expanding your customer base and accessing lucrative
                opportunities has never been easier.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-evenly mt-5 ">
            <Col md={4} className="gy-3 my-sm-5">
              <Link
                to="/pre_qualify"
                className="text-decoration-none text-dark"
              >
                <Card className="h-100 p-0" border="light">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bolder mb-5 ">
                      {" "}
                      <h2 className="text-start fw-bolder">PreQualify</h2>
                    </Card.Title>
                    <Card.Text className="h3 text-start mb-5 lh-base">
                      Seamlessly access Subcontractor Applications, Secure Your
                      Spot on the Bid List, Attain Prequalification, and Receive
                      Invitations to Bid Requests
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="text-center col-md-8 col-xs-2 mt-5 py-md-2"
                    >
                      <span className="h3">Access applications</span>
                    </Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={4} className="gy-3 my-sm-5">
              <Link to="/plan_room" className="text-decoration-none text-dark">
                <Card className="h-100 p-0" border="light">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bolder mb-5 ">
                      {" "}
                      <h2 className="text-start fw-bolder">PlanRoom</h2>
                    </Card.Title>
                    <Card.Text className=" text-start mb-5 h3 lh-base">
                      Discover Bidding Projects: Access Plans, Drawings, and
                      Unleash Your Quoting Potential for Active Commercial
                      Construction Projects
                    </Card.Text>
                    <Button
                      variant="primary"
                      className="text-center col-md-7 mt-5 py-md-2 px-md-3"
                    >
                      <span className="h3 ">Explore plan rooms</span>
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

export default Proposal;
