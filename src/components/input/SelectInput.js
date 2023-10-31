import { useEffect, useRef } from 'react';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import DownIcon from '../../assets/icons/DownIcon';

import './Input.css';
import { classNames } from '../helpers/helpers';

const SelectInput = ({ selectedItem, children, placeHolder }) => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    setIsActive(false);
  }, [selectedItem, setIsActive]);

  return (
    <div className="container-dropdown">
      <div className="menu-container">
        <button
          onClick={onClick}
          className="menu-trigger border rounded-3 w-100"
        >
          <div className="text-start ps-2 text-truncate">
            {selectedItem ? (
              selectedItem
            ) : (
              <div className="black-400">{placeHolder}</div>
            )}
          </div>
          <div
            className={classNames(
              'select-box--arrow h-100 px-2 pt-2 rounded-end',
              isActive ? 'select-active-down' : 'select-inactive-down'
            )}
          >
            <DownIcon fill="white" width="14" height="14" className="" />
          </div>
        </button>
        <nav
          ref={dropdownRef}
          className={`select-input ${isActive ? 'active' : 'inactive'}`}
        >
          {children}
        </nav>
      </div>
    </div>
  );
};

export default SelectInput;
