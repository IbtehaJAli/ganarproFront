const SettingsIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 24 21"
}) => (
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
      d="M5.57398 2H4.14439V9.14796H5.57398V2ZM14.2945 9.14796H9.7198L9.14796 8.36169V6.93209L9.7198 6.28878H14.2945L14.8663 7.00357V8.43317L14.2945 9.14796ZM7.14653 13.4367H2.57184L2 12.7219V11.2924L2.57184 10.5776H7.14653L7.71837 11.2924V12.7219L7.14653 13.4367ZM12.7219 2H11.2924V4.85918H12.7219V2ZM11.2924 10.5776H12.7219V19.1551H11.2924V10.5776ZM5.57398 14.8663H4.14439V19.1551H5.57398V14.8663ZM16.8678 14.8663H21.4282L22 14.1515V12.7934L21.4282 12.0786H16.8678L16.2959 12.7934V14.1515L16.8678 14.8663ZM19.8699 2H18.4403V10.5776H19.8699V2ZM18.4403 16.2959H19.8699V19.1551H18.4403V16.2959Z"
      fill={fill}
    />
  </svg>
);

export default SettingsIcon;
