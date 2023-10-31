import PropTypes from "prop-types";
import { useState } from "react";
import DownIcon from "../../assets/icons/DownIcon";
import Dropdown from "../dropdown/Dropdown";

import "./Input.css";



const SelectInput = ({ placeholder, options }) => {
  const [selectedItem, setSelectedItem] = useState(placeholder);
  const [items, setItems] = useState(options);
  const [showItems, setShowItems] = useState(false);

  const dropDown = () => {
    // this.setState(prevState => ({
    //   showItems: !prevState.showItems
    // }));

    setShowItems(!showItems);
  };

  const selectItem = item => {
    // this.setState({
    //   selectedItem: item,
    //   showItems: false
    // });

    setSelectedItem(item);
    setShowItems(false);
  };

  return (
    <div className="position-relative w-70">
      <div className="border bg-transparent w-100 rounded-3 px-3 py-2">
        <div className="py-1 text-start">{selectedItem}</div>
        <div
          className="select-box--arrow bg-primary px-2 py-2"
          onClick={dropDown}
        >
          {/* <span
            className={`${
              showItems ? "select-box--arrow-up" : "select-box--arrow-down"
            }`}
          /> */}

          <DownIcon fill="white" width="18" height="18" className="mt-2" />
        </div>

        <div
          style={{ display: showItems ? "block" : "none" }}
          className={"select-box--items"}
        >
          {items?.map(item => (
            <div
              key={item.id}
              onClick={() => selectItem(item)}
              className={selectedItem === item ? "selected" : ""}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="d-flex w-70 ms-auto mt-5">
        <input
          type="text"
          className="border bg-transparent w-100 rounded-3 px-3 py-2"
          placeholder={placeholder}
        />
        <div className="bg-primary d-flex mt-n1 px-2 rounded-end">
          <DownIcon fill="white" width="18" height="18" className="mt-2" />
        </div>
      </div> */}
    </div>
  );
  
};

SelectInput.propTypes = {
  placeholder: PropTypes.string.isRequired
};

export default SelectInput;
