import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

import "./Dropdown.css";

const Dropdown = () => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>User</span>
          <img
            src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
            alt="User avatar"
          />
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <Link to="#">Messages</Link>
            </li>
            <li>
              <Link to="#">Trips</Link>
            </li>
            <li>
              <Link to="#">Saved</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dropdown;
