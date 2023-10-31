import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LocationIcon from "../../../assets/icons/LocationIcon";
import RenameIcon from "../../../assets/icons/RenameIcon";
import ProjectIcon from "../../../assets/icons/ProjectIcon";
import PhoneIcon from "../../../assets/icons/PhoneIcon";
import WorldIcon from "../../../assets/icons/WorldIcon";
import { useEffect, useState } from "react";
import { getRegionsAPI } from "../../../utils/requests/regions";
import Modal from "../../../components/modal/Modal";
import Spinner from "../../../components/spinner/Spinner";

const Company = ({
  account_name,
  address,
  state,
  city,
  zip_code,
  account_phone,
  account_website,
  company_market_working_region,
}) => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const fullAddress = `${
    address !== null ? address + "," : ""
  } ${city}, ${state} ${zip_code ? zip_code : ""}`;

  const closeRegionModalHandler = () => {
    setShow(false);
  };
  const showRegionHandler = () => {
    setShow(true);
  };

  useEffect(() => {
    getRegions();
  }, []);

  const getRegions = () => {
    setLoading(true);
    getRegionsAPI()
      .then((response) => {
        setRegions(response);
        setLoading(false);
      })
      .catch(() => {});

    return;
  };
  return (
    <div>
      <div className="row row-cols-2 row-cols-md-3 gy-3">
        <div className="col d-md-flex text-start">
          <RenameIcon
            width="24"
            height="24"
            fill="#CCCCCC"
            className="me-md-3"
          />
          <div>
            <h6 className="fw-bold mt-2">Legal Name</h6>
            <h6 className="description-value">{account_name}</h6>
          </div>
        </div>
        <div className="col d-md-flex text-start">
          <ProjectIcon
            width="20"
            height="21"
            fill="#CCCCCC"
            className="me-md-3"
          />
          <div>
            <h6 className="fw-bold mt-2">Address</h6>
            <h6 className="description-value">{fullAddress}</h6>
          </div>
        </div>
        <div className="col d-md-flex text-start">
          <PhoneIcon
            className="me-md-3"
            width="24"
            height="24"
            fill="#CCCCCC"
          />
          <div>
            <h6 className="fw-bold mt-2">Phone</h6>
            <a href={`tel:${account_phone}`} className="text-decoration-none">
              <h6 className="description-value">{account_phone}</h6>
            </a>
          </div>
        </div>
        <div className="col d-md-flex text-start">
          <WorldIcon
            className="me-md-3"
            width="20"
            height="21"
            fill="#CCCCCC"
          />
          <div className="">
            <h6 className="fw-bold mt-2">Website</h6>
            <h6 className="profile-website description-value">
              <a
                href={account_website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {account_website}
              </a>
            </h6>
          </div>
        </div>
        <div className="col text-start">
          <div className="col d-md-flex text-start">
            <LocationIcon
              width="28"
              height="28"
              fill="#CCCCCC"
              className="me-3"
            />
            <div>
              <h6 className="fw-bold mt-2">Working Regions</h6>
              <h6 className="description-value">
                {company_market_working_region}
              </h6>
            </div>
          </div>
          <div className="text-start">
            <button
              onClick={showRegionHandler}
              type="button"
              className="btn btn-link"
            >
              See all regions
            </button>
            <Modal
              title="Working Regions"
              show={show}
              onCloseModal={closeRegionModalHandler}
            >
              {loading ? (
                <div className="vh-90 justify-content-center align-items-center d-flex">
                  <Spinner />
                </div>
              ) : (
                <div className="container">
                  <div className="row overflow-scroll">
                    {regions.map((region, index) => (
                      <div
                        key={index + 1}
                        onClick={() => {}}
                        className="cursor-pointer py-2 ps-4 col-md-4 col-lg-4"
                      >
                        {region.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

Company.defaultProps = {
  account_name: "Williams Square",
  address: "Williams Square",
  city: "Williams Square",
  state: "Williams Square",
  account_phone: "902504890",
  account_website: "www.globexcorportion.org",
};

Company.propTypes = {
  account_name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  account_phone: PropTypes.string.isRequired,
  account_website: PropTypes.string.isRequired,
};

export default Company;
