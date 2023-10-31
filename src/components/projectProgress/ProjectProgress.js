import { classNames } from "../helpers/helpers";
import "./ProjectProgress.css";

const ProjectProgress = ({ stage_name, progressClicked }) => {
  return (
    <div className="d-flex mx-auto justify-content-lg-center project-progress row">
      <div
        className={classNames(
          progressClicked === "Pre-construction"
            ? "active-project-progress"
            : "not-active",
          "text-start col-md-2"
        )}
      >
        <div className="mb-2 progress-header">Pre Construction</div>
        <div className="text-13 col progress-list">
          <div>Design phase</div>
          <div>Contract awarded to GC</div>
          <div>value engineering</div>
          <div>Subcontract award bidding phase 1</div>
          <div>Civil</div>
          <div>Electrical</div>
          <div>Mechanical</div>
          <div>Plumbing</div>
          <div>Framing and drywall</div>
          <div>Roofing</div>
        </div>
      </div>
      <div
        // className="col-5"
        className={classNames(
          progressClicked === "Work in progress"
            ? "active-project-progress"
            : "not-active",
          "col-md-5"
        )}
      >
        <div className="mb-2 progress-header text-center">Work in Progress</div>
        <div className="d-flex text-start text-13">
          <div className="progress-list me-4">
            <div>Subcontract award bidding phase 2</div>
            <div>Casework carpentry</div>
            <div>Windows</div>
            <div>Painting</div>
            <div>Doors and hardware</div>
            <div>Flooring</div>
            <div>Roofing</div>
            <div>Procurement of materials</div>
          </div>
          <div className="progress-list">
            <div>Construction phase</div>
            <div>Site development</div>
            <div>Pour concrete footings</div>
            <div>Construct framing/ roof trusses</div>
            <div>Doorframes</div>
            <div>Roofing</div>
            <div>Windows</div>
            <div>Install MEP rough ins</div>
            <div>Insulation</div>
            <div>HVAC</div>
          </div>
        </div>
      </div>
      <div
        // className="col-5"
        className={classNames(
          progressClicked === "90% contracts purchased"
            ? "active-project-progress"
            : "not-active",
          "col-md-5"
        )}
      >
        <div className="mb-2 progress-header text-center">
          90% contracts purchased
        </div>
        <div className="d-flex text-start text-13">
          <div className="progress-list me-4">
            <div>Drywall and ceilings</div>
            <div>Doors</div>
            <div>Fire alarm devices</div>
            <div>Plumbing fixtures</div>
            <div>Electrical and mechanical trimout</div>
            <div>Flooring</div>
            <div>Paint</div>
            <div>Landscaping</div>
          </div>
          <div className="progress-list">
            <div>Subcontract award bidding phase 3</div>
            <div>Cleaning</div>
            <div>Project closeout</div>
            <div>Close-out submittals</div>
            <div>Final inspections and testing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;
