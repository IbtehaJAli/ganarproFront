import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const DropDownMenu = ({ list, closeSidebar }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {list?.hasSubCategory ? (
        <div
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className="sidebar-links px-lg-4 cursor-pointer"
        >
          <img src={list.icon} style={{ width: 60 }} alt="home" />
          <span>{list.name}</span>
          {list?.categories?.length && open && (
            <span>
              <FontAwesomeIcon
                icon={faChevronUp}
                size="sm"
                style={{ width: 20 }}
                className="cursor-pointer ms-lg-4 "
              />
            </span>
          )}
          {list?.categories?.length && !open && (
            <span>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="sm"
                style={{ width: 20 }}
                className="cursor-pointer ms-lg-4 "
              />
            </span>
          )}
        </div>
      ) : (
        <NavLink
          to={list.to}
          className="sidebar-links px-lg-4"
          onClick={(e) => closeSidebar(e, list.to)}
        >
          <img src={list.icon} style={{ width: 60 }} alt="home" />
          <span>{list.name}</span>
        </NavLink>
      )}
      {list?.categories?.length &&
        list?.categories?.map((category, index) => {
          return (
            <Collapse in={open} key={index}>
              <div id="example-collapse-text" className="my-2">
                <NavLink
                  to={category.to}
                  className="sidebar-links px-lg-4"
                  onClick={(e) => closeSidebar(e, category.to)}
                >
                  {/* <img src={list.icon} style={{ width: 60 }} alt="home" /> */}
                  <div style={{ width: 65 }}></div>
                  <span>{category.name}</span>
                </NavLink>
              </div>
            </Collapse>
          );
        })}
      {list.divider ? <div className="sidebar-divider my-4"></div> : ""}
    </div>
  );
};

export default DropDownMenu;
