import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import ProposalPreviewForm from "../ProposalPreviewForm";
import { Button } from "react-bootstrap";

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 10px;
  }
`;
const ProposalPreviewModal = (props) => {
  return (
    <StyledModal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProposalPreviewForm />
      </Modal.Body>
    </StyledModal>
  );
};
export default ProposalPreviewModal;
