const ArrowBack = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 19 16"
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
      d="M18.5 7H3.914L9.207 1.707L7.793 0.292999L0.0860004 8L7.793 15.707L9.207 14.293L3.914 9H18.5V7Z"
      fill={fill}
    />
  </svg>
);

export default ArrowBack;
