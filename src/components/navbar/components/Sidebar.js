import { NavLink } from "react-router-dom";
import LocationIcon from "../../../assets/icons/LocationIcon";
import CompanyIcon from "../../../assets/icons/CompanyIcon";
import ProjectIcon from "../../../assets/icons/ProjectIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import ContactIcon from "../../../assets/icons/ContactIcon";
import EmailIcon from "../../../assets/icons/EmailIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";
import HamburgerIcon from "../../../assets/icons/HamburgerIcon";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator, faFile } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ openLargeSidebar, showLargeScreenNav }) => {
  const handleActiveNavLink = (match) => {
    if (!match?.isExact) {
      return "false";
    }
    return "true";
  };

  return (
    <section className="wrapper__menu__menu">
      <div
        className="d-sm-none d-lg-flex justify-content-center large-screen-hamburger"
        onClick={openLargeSidebar}
      >
        {showLargeScreenNav ? (
          <CloseIcon width="18" height="18" className="me-3 cursor-pointer" />
        ) : (
          <div className="d-none d-sm-none d-lg-flex cursor-pointer">
            <HamburgerIcon width="24" height="24" />
            <ArrowRight width="24" height="24" fill="white" />
          </div>
        )}
      </div>
      <NavLink
        to="/"
        className="wrapper__menu__menu__box"
        isactive={handleActiveNavLink}
        activeclassname="wrapper__menu__menu__box--active"
      >
        <HomeIcon
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="similar-icon me-1"
        />
        <div className="pt-1 ms-3 nav-link-text">Welcome</div>
      </NavLink>
      <NavLink
        to="/cleanup_calculator_overview"
        className="wrapper__menu__menu__box"
        isactive={handleActiveNavLink}
        activeclassname="wrapper__menu__menu__box--active"
      >
        <FontAwesomeIcon icon={faCalculator} size="2xl" />
        <div className="pt-1 ms-3 nav-link-text">Ganarpro Calculator</div>
      </NavLink>
      <NavLink
        to="/my_proposal"
        className="wrapper__menu__menu__box"
        isactive={handleActiveNavLink}
        activeclassname="wrapper__menu__menu__box--active"
      >
        <FontAwesomeIcon icon={faFile} size="2xl" />
        <div className="pt-1 ms-3 nav-link-text">Create Proposal</div>
      </NavLink>
      <NavLink
        to="/pre_qualify"
        className="wrapper__menu__menu__box"
        isactive={handleActiveNavLink}
        activeclassname="wrapper__menu__menu__box--active"
      >
        <CompanyIcon
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="similar-icon me-1"
        />
        <div className="pt-1 ms-3 nav-link-text">Planify</div>
      </NavLink>

      <NavLink
        to="/project_board"
        className="wrapper__menu__menu__box"
        isactive={handleActiveNavLink}
        activeclassname="wrapper__menu__menu__box--active"
      >
        <ProjectIcon width="24" height="24" fill="currentColor" />
        <div className="pt-1 ms-3 nav-link-text">Projects Board</div>
      </NavLink>
      {/*<NavLink*/}
      {/*  to="/key"*/}
      {/*  className="wrapper__menu__menu__box"*/}
      {/*  isactive={handleActiveNavLink}*/}
      {/*  activeclassname="wrapper__menu__menu__box--active"*/}
      {/*>*/}
      {/*  <ContactIcon width="24" height="25" fill="currentColor" />*/}
      {/*  <div className="pt-1 ms-3 nav-link-text">Key Contact Lists</div>*/}
      {/*</NavLink>*/}

      {/*<NavLink*/}
      {/*  to="management"*/}
      {/*  className="wrapper__menu__menu__box"*/}
      {/*  isactive={handleActiveNavLink}*/}
      {/*  activeclassname="wrapper__menu__menu__box--active"*/}
      {/*>*/}
      {/*  <LocationIcon*/}
      {/*    width="24"*/}
      {/*    height="24"*/}
      {/*    viewBox="0 0 24 24"*/}
      {/*    fill="currentColor"*/}
      {/*  />*/}
      {/*  <div className="pt-1 ms-3 nav-link-text">Territory Management</div>*/}
      {/*</NavLink>*/}
      {/*<NavLink*/}
      {/*  to="/activities"*/}
      {/*  className="wrapper__menu__menu__box"*/}
      {/*  isactive={handleActiveNavLink}*/}
      {/*  activeclassname="wrapper__menu__menu__box--active"*/}
      {/*>*/}
      {/*  <EmailIcon width="24" height="25" fill="currentColor" />*/}
      {/*  <div className="pt-1 ms-3 nav-link-text">Activities</div>*/}
      {/*</NavLink>*/}
    </section>
  );
};

export default Sidebar;
