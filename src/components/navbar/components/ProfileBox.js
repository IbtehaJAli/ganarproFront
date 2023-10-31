import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../dropdown/Dropdown";
import UserProfileIcon from "../../../assets/icons/UserProfileIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import LogoutIcon from "../../../assets/icons/LogoutIcon";

const ProfileBox = ({ title, isAuthenticated, logoutHandler }) => {
  const [hoverState, setHoverState] = useState();
  const handleHover = async (item) => {
    await setHoverState(item);
  };
  const handleStopHover = async () => {
    await setHoverState("");
  };

  useEffect(() => {
    handleHover(hoverState);
    if (!hoverState) {
      handleStopHover();
    }
  }, [hoverState]);

  return (
    <Dropdown title={title} customClassName="profile-container">
      <div className="profile_box">
        <ul className="list-unstyled py-4 m-0">
          <li
            className=""
            onMouseEnter={() => handleHover("profile")}
            onMouseLeave={handleStopHover}
          >
            <Link
              to="#"
              className="px-4 py-3 d-flex justify-content-start text-decoration-none active"
            >
              <UserProfileIcon
                fill={hoverState === "profile" ? "white" : "#888888"}
                height="24"
                width="24"
              />
              <div className="ms-3">User profile</div>
            </Link>
          </li>
          <li
            onMouseEnter={() => handleHover("settings")}
            onMouseLeave={handleStopHover}
          >
            <Link
              to="#"
              className="px-4 py-3 d-flex justify-content-start text-decoration-none active"
            >
              <SettingsIcon
                height="21"
                width="24"
                fill={hoverState === "settings" ? "white" : "#888888"}
              />
              <div className="ms-3">User Settings</div>
            </Link>
          </li>
          {isAuthenticated ? (
            <li
              onMouseEnter={() => handleHover("logout")}
              onMouseLeave={handleStopHover}
              onClick={logoutHandler}
            >
              <Link
                to="#"
                className="px-4 py-3 d-flex justify-content-start text-decoration-none active"
              >
                <LogoutIcon
                  height="25"
                  width="24"
                  fill={hoverState === "logout" ? "white" : "#888888"}
                />
                <div className="ms-3">Log Out</div>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </Dropdown>
  );
};

export default ProfileBox;
