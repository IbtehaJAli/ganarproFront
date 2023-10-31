import React from "react";

const LogoutIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 24 25"
}) => {
  return (
    <svg
      style={style}
      width={width}
      height={height}
      viewBox={viewBox}
      className={`svg-icon ${className || ""}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5.58612C3 4.48612 3.9 3.58612 5 3.58612H13V5.58612H5V19.5861H13V21.5861H5C3.9 21.5861 3 20.6861 3 19.5861V5.58612ZM17.176 11.5861L14.64 9.05012L16.054 7.63612L21.004 12.5861L16.054 17.5361L14.64 16.1221L17.176 13.5861H10.59V11.5861H17.176Z"
        fill={fill}
      />
    </svg>
  );
};

export default LogoutIcon;
