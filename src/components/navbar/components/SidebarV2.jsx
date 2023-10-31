import { NavLink } from "react-router-dom";
import homeIcon from "../../../assets/img/sidebar/home.png";
import projectIcon from "../../../assets/img/sidebar/projects.png";
import calculatorIcon from "../../../assets/img/sidebar/calculator.png";
import proposalIcon from "../../../assets/img/sidebar/proposal.png";
import prequalifyIcon from "../../../assets/img/sidebar/prequalify.png";
import my_companyIcon from "../../../assets/img/sidebar/my_company.png";
import forgot_passwordIcon from "../../../assets/img/sidebar/forgot_password.png";

const sideBarList = [
  {
    name: "Home",
    to: "/",
    icon: homeIcon,
    divider: true,
  },
  {
    name: "Projects",
    to: "/project_board",
    // "icon": "../../../assets/img/sidebar/projects.png",
    icon: projectIcon,
    divider: false,
  },
  {
    name: "Cleanup Calculator",
    to: "/cleanup_calculator_overview",
    icon: calculatorIcon,
    divider: false,
  },
  {
    name: "Cleanup Proposal",
    to: "/my_proposal",
    icon: proposalIcon,
    divider: false,
  },
  {
    name: "Planify",
    to: "/planify",
    icon: prequalifyIcon,
    divider: true,
  },
  {
    name: "Company Information",
    to: "/profile",
    icon: my_companyIcon,
    divider: false,
  },
  {
    name: "Password Reset",
    to: "/password_reset",
    icon: forgot_passwordIcon,
    divider: false,
  },
];

const SidebarV2 = ({ toggleSideBar, toggleSideBarHandler }) => {
  return (
    <section className="text-start">
      <div
        id="mySideNav-v2"
        className={toggleSideBar ? "sideNav-v2 sideNav-v2-open" : "sideNav-v2"}
      >
        <span
          className="sidebar-open-v2 px-lg-4 ms-4"
          onClick={toggleSideBarHandler}
        >
          &#9776;
        </span>
        {sideBarList.map((list, index) => {
          return (
            <div key={index}>
              <NavLink to={list.to} className="sidebar-links px-lg-4">
                <img src={list.icon} style={{ width: 60 }} alt="home" />
                <span>{list.name}</span>
              </NavLink>
              {list.divider ? <div className="sidebar-divider my-4"></div> : ""}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SidebarV2;
