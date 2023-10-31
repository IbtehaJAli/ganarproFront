import React from "react";
import { Link } from "react-router-dom";
import checkIcon from "../../../assets/icons/check.svg";

const TerritoryDropdown = ({ data, selected, setSelected }) =>
  data.map((territory, index) => (
    <Link
      className="item"
      to="#"
      key={index}
      onClick={() => setSelected(territory)}
    >
      <div className="w-10 me-2">
        {selected === territory ? <img src={checkIcon} alt="selected" /> : ""}
      </div>
      <div className="ml-2 w-90">{territory}</div>
    </Link>
  ));
export default TerritoryDropdown;
