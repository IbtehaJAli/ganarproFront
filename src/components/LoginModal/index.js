import Modal from "react-bootstrap/Modal";
import LoginForm from "../forms/LoginForm";
import styled from "styled-components";
import SubscriptionModal from "../subscriptionModal";

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 10px;
  }
`;
const LoginModal = (props) => {
  return (
    <StyledModal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton={props.closeButton}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm />
      </Modal.Body>
    </StyledModal>
  );
};
LoginModal.defaultProps = {
  closeButton: true,
};
export default LoginModal;
