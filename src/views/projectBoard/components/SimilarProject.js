import FileIcon from "../../../assets/icons/FileIcon";
import CompanyIcon from "../../../assets/icons/CompanyIcon";
import { Link } from "react-router-dom";

const SimilarProject = ({ id, url_slug, name, company_name }) => {
  return (
    <div className="similar-project">
      <div className="d-flex mt-4">
        <div className="col-3 similar-project-icon rounded-circle me-3">
          <FileIcon width="26" height="20" fill="#70B2F0" />
        </div>
        <div className="text-start text-13 similar-project-desc">
          <Link
            to={`/project_board/${url_slug}`}
            className="text-decoration-none text-reset"
          >
            <h6 className="fw-light black-200 m-0 mb-2">{name}</h6>
            <div className="d-flex align-items-center">
              <CompanyIcon
                width="18"
                height="18"
                fill="#888888"
                className="me-1"
              />
              <h6 className="fw-light black-300 m-0 col-8 text-truncate">
                {company_name}
              </h6>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimilarProject;
