import PropTypes from "prop-types";
import dayjs from "dayjs";
import calendar from "../../../assets/icons/calendar.svg";

const ImportantDates = ({
  bid_due_date,
  created,
  last_modified_date,
  project_completion,
  est_break_ground_date,
}) => {
  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }
    return dayjs(date).format("MMM. D, YYYY");
  };
  return (
    <div>
      <div className="row row-cols-2 row-cols-md-3 mt-1">
        <div className="col d-md-flex text-start mt-3">
          <div className="me-md-3">
            <img src={calendar} alt="size" />
          </div>
          <div>
            <h6 className="fw-bold mt-2">Added date</h6>
            <h6 className="description-value"> {formatDate(created)}</h6>
          </div>
        </div>
        <div className="col d-md-flex text-start mt-3">
          <div className="me-md-3">
            <img src={calendar} alt="size" />
          </div>
          <div>
            <h6 className="fw-bold mt-2">Last updated</h6>
            <h6 className="description-value">
              {formatDate(last_modified_date)}
            </h6>
          </div>
        </div>
      </div>
      <div className="row row-cols-2 row-cols-md-3 mt-1">
        <div className="col d-md-flex text-start mt-3">
          <div className="me-md-3">
            <img src={calendar} alt="size" />
          </div>
          <div>
            <h6 className="fw-bold mt-2">Preconstruction bid due date</h6>
            <h6 className="description-value">{formatDate(bid_due_date)}</h6>
          </div>
        </div>
        {est_break_ground_date ? (
          <div className="col d-md-flex text-start mt-3">
            <div className="me-md-3">
              <img src={calendar} alt="size" />
            </div>
            <div>
              <h6 className="fw-bold mt-2">Break ground date</h6>
              <h6 className="description-value">
                {formatDate(est_break_ground_date)}
              </h6>
            </div>
          </div>
        ) : (
          ""
        )}
        {project_completion ? (
          <div className="col d-md-flex text-start mt-3">
            <div className="me-md-3">
              <img src={calendar} alt="size" />
            </div>
            <div>
              <h6 className="fw-bold mt-2">Completion date</h6>
              <h6 className="description-value">
                {formatDate(project_completion)}
              </h6>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

// ImportantDates.defaultProps = {
//   bid_due_date: "2020-04-05",
//   last_modified_date: "2020-04-05",
// };
//
// ImportantDates.propTypes = {
//   bid_due_date: PropTypes.string,
//   last_modified_date: PropTypes.string.isRequired,
// };

export default ImportantDates;
