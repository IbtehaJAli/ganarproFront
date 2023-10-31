const HomeIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 24 25",
  handleClick = () => {}
}) => (
  <svg
    onClick={handleClick}
    style={style}
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon ${className || ""}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.71429 15.8571V23H3V10.1429L11.5714 3L20.1429 10.1429V23H14.4286V15.8571H8.71429Z"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HomeIcon;
