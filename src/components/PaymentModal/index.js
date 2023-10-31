import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import PricingPage from "../../views/pricing";
import React from "react";

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 10px;
  }
`;
const PaymentModal = (props) => {
  return (
    <StyledModal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <PricingPage />
      </Modal.Body>
    </StyledModal>
  );
};
export default PaymentModal;
