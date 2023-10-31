import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./projectsOverview.css";
import { Services } from "./components/Services";

export const ProjectOverview = () => {
    const services = {
        board: {
            img: "project-board.jpg",
            title: "Project Board",
            text: "Use a map to locate construction projects and view their associated data tables.",
            link: "https://learn.ganarpro.com/business-suite-intro-project-board-overview/"
        },
        research: {
            img: "project_research.jpg",
            title: "Research",
            text: "Date table displaying projects based on location and current construction phase.",
            link: "https://learn.ganarpro.com/business-suite-intro-project-research/"
        }
    }

  return (
    <>
      <div className="overview-container">
        <div className="get-started pt-4">
            <h3>Get Started</h3>
        </div>
        <div className="d-flex flex-column align-items-sm-center align-items-start gap-2 mt-5 mb-5">
          <h1 className="page-title">Ganarpro Projects</h1>
          <p className="para text-start text-sm-center">
            Analyze active and historical building project data in North America
            constructed by commercial general contractors
          </p>
          <Link
            to="https://learn.ganarpro.com/business-suite-intro-projects/"
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
        </div>

        <div className="d-flex justify-content-evenly mb-5 flex-column flex-sm-row">
          <Services
            img={services.board.img}
            title={services.board.title}
            text={services.board.text}
            link={services.board.link}
          />

          <Services
            img={services.research.img}
            title={services.research.title}
            text={services.research.text}
            link={services.research.link}
          />
        </div>
      </div>
    </>
  );
};
