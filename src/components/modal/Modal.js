import { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import "./Modal.css";
import CloseIcon from "../../assets/icons/CloseIcon";
const Modal = ({ title, show, onCloseModal, children }) => {
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
    <CSSTransition
      in={show}
      timeout={{ enter: 0, exit: 300 }}
      unmountOnExit
      //   classNames="intel-modal"
    >
      {/* <div className="intel-modal" onClick={onCloseModal}> */}
      <div
        className={`intel-modal ${show ? "enter-done" : "exit"}`}
        onClick={onCloseModal}
      >
        <div className="intel-modal-content" onClick={e => e.stopPropagation()}>
          <div className="intel-modal-header d-flex justify-content-between px-4 py-4 text-white bg-primary">
            <h5 className="intel-modal-title text-14">{title}</h5>
            <CloseIcon
              width="14"
              height="14"
              fill="#9EC3E8"
              className="cursor-pointer"
              handleClick={onCloseModal}
            />
          </div>
          <div className="intel-modal-body">{children}</div>
          {/* <div className="intel-modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModal}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
