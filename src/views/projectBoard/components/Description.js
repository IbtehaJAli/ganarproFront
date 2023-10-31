import PropTypes from "prop-types";
import SizeIcon from "../../../assets/icons/SizeIcon";
import BuildingIcon from "../../../assets/icons/BuildingIcon";
import PlanIcon from "../../../assets/icons/PlanIcon";
import PenIcon from "../../../assets/icons/PenIcon";
import LocationIcon from "../../../assets/icons/LocationIcon";
import Modal from "../../../components/modal/Modal";
import { useState } from "react";
import RequestPlanForm from "../../../components/forms/requestPlanForm/RequestPlanForm";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const sortItems = [
  {
    id: 1,
    key: "last_modified_date",
    value: "updated",
  },
  {
    id: 2,
    key: "created_date",
    value: "newest",
  },
  {
    id: 3,
    key: "bid_due_date",
    value: "Bid due date",
  },
  {
    id: 4,
    key: "sf_size",
    value: "Square Feet",
  },
];

const Description = ({
  description,
  sf_size,
  project_type,
  units,
  plan_drawings,
  address,
  city,
  state_short,
  stage_name,
}) => {
  const [showRequestPlanModal, setShowRequestPlanModal] = useState(false);
  const [selectedSortItem, setSelectedSortItem] = useState();

  const handleSelectedSortItem = (itemId) => {
    const item = sortItems.find((item) => item.id === itemId);
    setSelectedSortItem(item.value);
  };

  const formatDescription = (text) => {
    const urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text?.replace(urlRegex, function (url) {
      return '<a target="_blank" href="' + url + '">' + url + "</a>";
    });
  };

  const openPlan = (planLink) => {
    window.open(planLink, "_blank");
  };

  return (
    <div>
      <div className="border description-body p-5 rounded-5 text-start mb-5">
        <div
          style={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
        />
      </div>
      <div className="d-flex row mt-5">
        <div className="col py-5 gray-700-bg rounded-5 d-flex flex-column justify-content-center align-items-center">
          <LocationIcon width="20" height="20" fill="#AAAAAA" className="" />
          <div>
            <h6 className="fw-bold mt-2 text-13">Address</h6>
            <h6 className="description-value">
              {address !== null ? `${address},` : ""} {city},{state_short}
            </h6>
          </div>
        </div>
        <div className="row row-cols-2 row-cols-md-3 mt-4 text-13 col-md-10 gy-2">
          <div className="col d-md-flex text-start">
            <BuildingIcon
              width="24"
              height="24"
              fill="#AAAAAA"
              className="me-md-3"
            />
            <div>
              <h6 className="fw-bold mt-2">Size</h6>
              <h6 className="description-value">
                {sf_size > 0 ? `${sf_size.toLocaleString()} SQFT` : "- SQFT"}
                {/* {sf_size?.toLocaleString()} SQFT */}
              </h6>
            </div>
          </div>
          <div className="col d-md-flex text-start">
            <PlanIcon
              width="18"
              height="18"
              fill="#AAAAAA"
              className="me-md-3"
            />
            <div>
              <h6 className="fw-bold mt-2">Numbers of Units</h6>
              <h6 className="description-value">{units}</h6>
            </div>
          </div>
          <div className="col d-md-flex text-start">
            <SizeIcon
              width="20"
              height="20"
              fill="#AAAAAA"
              className="me-md-3"
            />
            <div>
              <h6 className="fw-bold mt-2">Building Type</h6>
              <h6 className="description-value">{project_type}</h6>
            </div>
          </div>

          <div className="col d-md-flex text-start">
            <PenIcon
              width="19"
              height="19"
              fill="#AAAAAA"
              className="me-md-3"
            />
            <div>
              <h6 className="fw-bold mt-2">Plans/Drawings</h6>
              {plan_drawings === "None" || !plan_drawings ? (
                // <button
                //   className="fw-light text-primary border-0 bg-white"
                //   onClick={() => setShowRequestPlanModal(true)}
                // >
                //   Request Plan
                // </button>
                <h6 className="fw-light text-primary">Plan unavailable</h6>
              ) : (
                <h6
                  className="fw-light text-primary cursor-pointer"
                  onClick={() => openPlan(plan_drawings)}
                >
                  Download Plan
                </h6>
                // <Link to={plan_drawings}>Download Plan</Link>
              )}
            </div>
          </div>
          <Modal
            title="Request Plans"
            show={showRequestPlanModal}
            onCloseModal={() => setShowRequestPlanModal(false)}
          >
            <RequestPlanForm
              selectedSortItem={selectedSortItem}
              sortItems={sortItems}
              handleSelectedSortItem={handleSelectedSortItem}
              setShowLogCallModal={setShowRequestPlanModal}
            />
          </Modal>
          <div className="col d-md-flex text-start">
            <PenIcon
              width="19"
              height="19"
              fill="#AAAAAA"
              className="me-md-3"
            />
            <div>
              <h6 className="fw-bold mt-2">Phase</h6>
              <h6 className="fw-light text-primary">{stage_name}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Description.defaultProps = {
//   description: "Williams Square (Ameilia House & Hotel Fredericksburg...",
//   units: "None",
//   sf_size: 54000,
//   project_type: "None",
//   plan_drawings: "None",
// };
//
// Description.propTypes = {
//   description: PropTypes.string.isRequired,
//   sf_size: PropTypes.number.isRequired,
//   project_type: PropTypes.string.isRequired,
//   units: PropTypes.string.isRequired,
//   plan_drawings: PropTypes.string.isRequired,
// };

export default Description;
