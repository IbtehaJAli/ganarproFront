import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Col, Form, OverlayTrigger, Row } from "react-bootstrap";
import { sendDomainVerification } from "../../store/actions/users/users.actions";
import { useDispatch, useSelector } from "react-redux";

const DomainVerificationModal = (props) => {
  const [email, setEmail] = useState("");
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const { loading } = useSelector((state) => state.domainVerification);
  const dispatch = useDispatch();
  const handleSendEmail = (e) => {
    e.preventDefault();
    if (email !== "") {
      dispatch(sendDomainVerification());
      setEmail("");
    }
  };
  useEffect(() => {
    if (user?.outbound_email) {
      setEmail(user?.outbound_email);
    }
  }, [user?.outbound_email]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={props.closeButton}>
        <Modal.Title
          className="text-center d-flex"
          id="contained-modal-title-vcenter"
        ></Modal.Title>
        <h3 className=" col-md-7 text-center">
          We need to verify your domain{" "}
        </h3>
        <h3 className="col-md-4">
          {" "}
          <a
            href="tel:9051290512"
            className="cursor-pointer text-decoration-none"
          >
            Call (945)218-5522
          </a>
        </h3>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-md-center">
          <Col md="12">
            <h4>
              Before you a start using Ganarpro email functionality, we need to
              add DNS records to your domain and then you can use it to send
              email and do business.
            </h4>
            <h4 className="mb-md-4">
              Don’t worry, this doesn’t affect your current email or website
            </h4>
            <h4>
              If you do not have a domain your own domain, ex (ganarpro.com) you
              cannot verify a domain. Ganarpro can help you purchase a domain
              and then verify your domain so you can send emails through Ganarpo
            </h4>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="12">
            <Form onSubmit={handleSendEmail} className="text-center">
              <p className="text-center">Enter your email address:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button disabled={loading} className="btn btn-primary">
                {loading && (
                  <span className="spinner-grow spinner-grow-sm"></span>
                )}
                send
              </button>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {/*<Button onClick={props.onHide}>Close</Button>*/}
      </Modal.Footer>
    </Modal>
  );
};
DomainVerificationModal.defaultProps = {
  closeButton: true,
};
export default DomainVerificationModal;
