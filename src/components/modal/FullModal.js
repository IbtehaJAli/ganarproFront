import { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import "./Modal.css";
// import CloseIcon from "../../assets/icons/CloseIcon";

const FullModal = ({ title, show, onCloseModal, children }) => {
  const closeOnEscapeButton = e => {
    if ((e.charCode || e.keyCode) === 27) {
      onCloseModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeButton);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeButton);
    };
  }, []);

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal(
    //   return (
    <CSSTransition in={show} timeout={{ enter: 0, exit: 300 }} unmountOnExit>
      <div
        className={`intel-modal ${show ? "enter-done" : "exit"}`}
        onClick={onCloseModal}
      >
        <div
          className="intel-modal-content full"
          onClick={e => e.stopPropagation()}
        >
          <div className="intel-modal-body">{children}</div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default FullModal;
