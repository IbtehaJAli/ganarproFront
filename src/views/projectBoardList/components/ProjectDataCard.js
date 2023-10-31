import React, { useState } from "react";
import PropTypes from "prop-types";
import FavouriteIcon from "../../../assets/icons/FavouriteIcon";
import LocationIcon from "../../../assets/icons/LocationIcon";
import DirectionIcon from "../../../assets/icons/DirectionIcon";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import FavouriteStrokeIcon from "../../../assets/icons/FavouriteStrokeIcon";
import DislikeIcon from "../../../assets/icons/DislikeIcon";
import Modal from "../../../components/modal/Modal";
import SendEmailForm from "../../../components/forms/sendEmailForm/SendEmailForm";
import Button from "../../../components/button/Button";
import "./ProjectDataCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faClock,
  faHeart,
  faHardHat,
  faHelmetSafety,
} from "@fortawesome/free-solid-svg-icons";
dayjs.extend(relativeTime);

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

const ProjectDataCard = ({
  id,
  name,
  address,
  city,
  state_short,
  created_date,
  account_name,
  sf_size,
  url_slug,
  isFavourite,
  handleArchive,
  handleFavourite,
  last_modified_date,
  handleProjectDetailCLick,
  authenticatedUser,
  isHidden,
}) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedSortItem, setSelectedSortItem] = useState();

  const handleSelectedSortItem = (itemId) => {
    const item = sortItems.find((item) => item.id === itemId);
    setSelectedSortItem(item.value);
  };

  const handleShowEmailModal = (e) => {
    setShowEmailModal(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const fullAddress = `${city}, ${state_short}`;
  const duration = dayjs(last_modified_date).fromNow();

  return (
    <div className="board-list-card bg-white py-4">
      {/* // <div className="bg-white col py-4"> */}

      <div className="d-flex justify-content-between mb-3">
        <div className="flex-grow-1 text-start black-400 caption-text">
          <FontAwesomeIcon
            icon={faClock}
            size="1x"
            className="cursor-pointer me-1"
          />
          {duration}
        </div>
        {!isHidden && (
          <div className="svg-container">
            {isFavourite ? (
              <FontAwesomeIcon
                icon={faHeart}
                className="cursor-pointer"
                size="xl"
                style={{ color: "#0d6efd" }}
                onClick={(e) => handleFavourite(e, "unfavourite", id)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                className="cursor-pointer"
                size="xl"
                style={{
                  color: "#fff",
                  stroke: "#0d6efd",
                  strokeWidth: 50,
                }}
                onClick={(e) => handleFavourite(e, "favourite", id)}
              />
            )}
          </div>
        )}
      </div>
      <Link
        to={`/project_board/${url_slug}`}
        className="text-decoration-none text-reset"
        onClick={(e) =>
          handleProjectDetailCLick(e, `/project_board/${url_slug}`)
        }
      >
        <div className="d-flex justify-content-between mb-4">
          <div className="text-start project-name-details">
            <p className="me-4 fw-bold text-13 project-name">{name}</p>
            <p className="text-10">
              By{" "}
              {authenticatedUser ? (
                <span className="blue-100">{account_name}</span>
              ) : (
                "..."
              )}
            </p>
          </div>
        </div>
        <div className="location-div">
          <div className="d-flex text-start align-items-center mb-3">
            <LocationIcon
              width="14"
              height="14"
              fill="#333333"
              className="me-3"
            />
            <p className="mb-0 text-13">{fullAddress}</p>
          </div>
          <div className="d-flex text-start align-items-center">
            <DirectionIcon
              fill="#333333"
              width="14"
              height="14"
              className="me-3"
            />
            <p className="mb-0 text-13">
              {sf_size > 0 ? `${sf_size.toLocaleString()} SQFT` : "- SQFT"}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="flex-grow-1 text-start">
            {/* <DislikeIcon
              width="24"
              height="24"
              handleClick={(e) => handleArchive(e, id)}
              className="me-3 cursor-pointer svg-archive"
              fill="currentColor"
            /> */}
            {/* <FontAwesomeIcon
              icon={faHardHat}
              className=""
              size="xl"
              style={{ color: "#0d6efd" }}
            /> */}
          </div>
          <div className="d-flex align-items-center">
            {/* <Button
              customClassName="btn-outline-secondary-intel btn-small"
              onClick={(e) => handleShowEmailModal(e)}
            >
              Check Availability
            </Button> */}
            <Modal
              title="New message to Aaron Johnson"
              show={showEmailModal}
              onCloseModal={() => setShowEmailModal(false)}
            >
              <SendEmailForm
                selectedSortItem={selectedSortItem}
                sortItems={sortItems}
                handleSelectedSortItem={handleSelectedSortItem}
              />
            </Modal>
          </div>
        </div>
      </Link>
    </div>
  );
};

ProjectDataCard.defaultProps = {
  name: "Williams Square (Ameilia House & Hotel Fredericksburg...",
  address: "Fredericksburg, VA",
  city: "city",
  state_short: "IA",
  created_date: "2020-04-20T16:08:10-04:00",
  account_name: "Damilola Adekoya",
  sf_size: 54000,
  id: 1,
  isHidden: false,
};

ProjectDataCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state_short: PropTypes.string.isRequired,
  created_date: PropTypes.string.isRequired,
  account_name: PropTypes.string.isRequired,
  sf_size: PropTypes.number.isRequired,
};

export default ProjectDataCard;
