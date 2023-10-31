import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./services.css";

export const Services = ({ img, title, text, link }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if(title === "Research") {
        navigate("/project_research");
    } else {
        navigate("/project_board")
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-start gap-3">
        <img src={img} className="service-img" />
        <h1 className="service-title">{title}</h1>
        <p className="service-para">{text}</p>
        <Link
          to={link}
          target="_blank"
          className="learn-more d-flex align-items-center gap-2"
        >
          Learn More
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="new-tab-icon"
            style={{ fontSize: "14px" }}
          />
        </Link>
        <Button
          className="create_btn service-btn"
          variant="primary"
          size="sm" // Use "sm" for small size
          onClick={handleButtonClick}
        >
          {title === "Research"? "Visit Table" : "Search Map" }
        </Button>
        {title !== "Research" ? (<Link
          to="/myganarpro/favorites"
          target="_blank"
          className="learn-more d-flex align-items-center gap-2"
        >
          Manage Dashboard
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            className="new-tab-icon"
            style={{ fontSize: "14px" }}
          />
        </Link>) : ("")}
      </div>
    </>
  );
};
