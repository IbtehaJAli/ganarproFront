import Button from "../../button/Button";
import "./LogForm.css";

const LogForm = ({ phone, contactId, setShowLogCallModal, callLogHandler }) => {
  return (
    <div>
      <div className="text-center black-200 ">
        <a href={`tel:${phone}`} className="text-decoration-none text-dark">
          <h1 className="fw-bold text-32">{phone}</h1>
        </a>
        {/*<p className="text-13">We will save your answer.</p>*/}
      </div>
      {/* <div className="grid d-md-flex justify-content-between mx-4 row"> */}
      {/*<div className="container">*/}
      {/*  <div className="row">*/}
      {/*    <Button*/}
      {/*      onClick={() => callLogHandler("CA", contactId, setShowLogCallModal)}*/}
      {/*      customClassName="btn btn-outline-secondary-intel btn-small col-sm"*/}
      {/*    >*/}
      {/*      They answered?*/}
      {/*    </Button>*/}
      {/*    <Button*/}
      {/*      onClick={() => callLogHandler("VM", contactId, setShowLogCallModal)}*/}
      {/*      customClassName="btn btn-outline-secondary-intel btn-small col-sm mx-md-4 mx-sm-2 logForm-middle-btn"*/}
      {/*    >*/}
      {/*      Left a voice mail*/}
      {/*    </Button>*/}
      {/*    <Button*/}
      {/*      onClick={() => callLogHandler("NA", contactId, setShowLogCallModal)}*/}
      {/*      customClassName="btn btn-outline-secondary-intel btn-small col-sm"*/}
      {/*    >*/}
      {/*      No answer*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default LogForm;
