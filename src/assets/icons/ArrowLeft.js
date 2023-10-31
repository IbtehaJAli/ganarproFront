const ArrowLeft = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 8 14"
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
    <path d="M7.5 1L1.5 7L7.5 13" stroke={fill} />
  </svg>
);

export default ArrowLeft;
