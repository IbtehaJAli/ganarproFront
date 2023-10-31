const BarIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 2 20"
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
    <path d="M1 0.75V19.25" stroke={fill}></path>
  </svg>
);

export default BarIcon;
