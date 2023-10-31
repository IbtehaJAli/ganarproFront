import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Col, OverlayTrigger, Row } from "react-bootstrap";
import singleApp from "../../assets/img/singleapp.jpg";
import allApp from "../../assets/img/allapps.jpg";
import { Link } from "react-router-dom";

const SubscriptionModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={props.closeButton}>
        <Modal.Title id="contained-modal-title-vcenter">
          Get apps like Projects, Cleanup Calculator, Proposal Generator, and
          PreQualify for your business.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-md-center">
          <Col md="5">
            <Link to="/pricing" target="_blank" rel="noreferrer">
              {" "}
              <img src={allApp} className="img-fluid" alt="pricing" />
            </Link>
          </Col>
          <Col md="5">
            <Link to="/pricing" target="_blank" rel="noreferrer">
              <img src={singleApp} className="img-fluid" alt="pricing" />
            </Link>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {/*<Button onClick={props.onHide}>Close</Button>*/}
      </Modal.Footer>
    </Modal>
  );
};
SubscriptionModal.defaultProps = {
  closeButton: true,
};
export default SubscriptionModal;
