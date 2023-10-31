const SizeIcon = ({
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 20 20"
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    className={`svg-icon ${className || ""}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.59 10L12.59 6H9V4H16V11H14V7.41L10 11.41V14H18V2H6V10H8.59ZM20 0V16H10V20H0V10H4V0H20ZM8 12H2V18H8V12Z"
      fill={fill}
    />
  </svg>
);

export default SizeIcon;
