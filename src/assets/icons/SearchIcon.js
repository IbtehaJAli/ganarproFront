const SearchIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 20 20"
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
      d="M14.5357 8.39286C14.5357 11.7855 11.7855 14.5357 8.39286 14.5357C5.00025 14.5357 2.25 11.7855 2.25 8.39286C2.25 5.00025 5.00025 2.25 8.39286 2.25C11.7855 2.25 14.5357 5.00025 14.5357 8.39286Z"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="square"
    />
    <path d="M13.3333 13.3333L17.5 17.5" stroke={fill} strokeWidth="2" />
  </svg>
);

export default SearchIcon;
