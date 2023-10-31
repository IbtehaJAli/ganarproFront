const CheckIcon = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 20 17",
  strokeWidth="2"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={`svg-icon ${className || ""}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.81811 10.5664L8.45711 16.021L18.1817 4.27271"
      stroke={fill}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export default CheckIcon;
