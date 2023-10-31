import React from "react";
import PropTypes from "prop-types";

import "./Tabs.css";

const Tabs = ({ title, name, setActiveTab, activeTab, contactCount }) => {
  let customClass = "px-2 text-13 text-nowrap tab-component text-capitalize";
  if (activeTab === name) {
    customClass = `${customClass} active-about-tab`;
  }
  return (
    <div className={customClass} name={name} onClick={() => setActiveTab(name)}>
      <p>
        {title}
        {title.toLocaleLowerCase() === "contacts" ? ` (${contactCount})` : ""}
      </p>
    </div>
  );
};

Tabs.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default Tabs;
