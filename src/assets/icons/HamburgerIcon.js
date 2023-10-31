const HamburgerIcon = ({
  style = {},
  fill = "######",
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
    <path d="M4 4H20.5V6.5H4V4Z" fill={fill} />
    <path d="M4 10.75H20.5V13.25H4V10.75Z" fill={fill} />
    <path d="M4 17.5H20.5V20H4V17.5Z" fill={fill} />
  </svg>
);

export default HamburgerIcon;
