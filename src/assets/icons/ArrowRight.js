const ArrowRight = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 24 24"
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
    {/* <path d="M0.5 13L6.5 7L0.499999 1" stroke={fill} /> */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.70706 18.7071L8.29285 17.2929L13.5857 12L8.29285 6.70709L9.70706 5.29288L16.4142 12L9.70706 18.7071Z"
      fill={fill}
    />
  </svg>
);

export default ArrowRight;