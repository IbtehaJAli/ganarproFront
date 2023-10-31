import React from "react";
import { classNames } from "../helpers/helpers";
import trackingIcon from "../../assets/icons/tracking.svg";
import newIndicator from "../../assets/icons/indicator.svg";
import fileIcon from "../../assets/icons/file-large.svg";
import messageIcon from "../../assets/icons/message-large.svg";

import "./TableCard.css";
import { Link } from "react-router-dom";

const TableCard = ({ cardTitle, headers, cardData, dataType }) => {
  return (
    <div className="card">
      <div className="header text-start">
        <h5 className="title-two">{cardTitle}</h5>
      </div>
      {cardData?.length ? (
        <>
          <div className="p-3 justify-content-between d-flex text-start">
            {headers.map((head, index) => (
              <div
                key={index}
                className={classNames(
                  index === 0 ? "w-75" : "w-25",
                  "text-uppercase"
                )}
              >
                <h5 className="title-three" slot={index > 1 ? "start" : ""}>
                  {head}
                </h5>
              </div>
            ))}
          </div>
          <div className="body text-start">
            {cardData.map((data, index) => (
              <div
                key={index + 1}
                className={classNames(
                  "p-3 item card-item",
                  index === 0 ? "active" : ""
                )}
              >
                <div className="w-60 card-text d-flex">
                  {data.new ? (
                    <div className="w-10">
                      <img src={newIndicator} alt="new indicator" />
                    </div>
                  ) : (
                    ""
                  )}
                  {data.name}
                </div>
                <div
                  className={classNames(
                    "w-15 text-10",
                    data.tracking ? "d-contents" : ""
                  )}
                >
                  {data.tracking ? (
                    <img src={trackingIcon} alt="tracking" />
                  ) : (
                    ""
                  )}
                  {data?.score}
                </div>
                <div className="w-25 card-sub-text">{data.type}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="py-5">
          {dataType === "file" ? (
            <div className="text-13 no-records">
              <img src={fileIcon} alt="empty records" />
              <p className="mt-4">No records visited yet</p>
            </div>
          ) : (
            <div className="text-13 no-records">
              <img src={messageIcon} alt="empty records" />
              <p className="mt-4">No contact engaged yet</p>
            </div>
          )}
        </div>
      )}
      <div className="p-3 footer d-flex justify-content-end">
        <Link to="/" className="me-4 card-text--footer">
          See All
        </Link>
      </div>
    </div>
  );
};

export default TableCard;
