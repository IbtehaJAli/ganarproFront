import React, { useRef } from "react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";

import "./Dropdown.css";
import { Link } from "react-router-dom";

const Dropdown = ({ children, title, customClassName }) => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = () => {
    return setIsActive(!isActive);
  };
  return (
    <div className="container-dropdown">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <Link
            to="/profile"
            className="text-decoration-none d-none d-md-block"
          >
            <span>{title}</span>
          </Link>
        </button>
        <nav
          ref={dropdownRef}
          className={`c-dropdown-menu ${customClassName} ${
            isActive ? "active" : "inactive"
          }`}
        >
          {children}
        </nav>
      </div>
    </div>
  );
};

export default Dropdown;
