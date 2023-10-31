const CloseIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 10 10",
  handleClick=() => {}
}) => (
  <svg
    style={style}
    width={width}
    height={height}
    viewBox={viewBox}
    className={`svg-icon ${className || ""}`}
    onClick={handleClick}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5 1.54656L8.45344 0.5L5 3.95344L1.54656 0.5L0.5 1.54656L3.95344 5L0.5 8.45344L1.54656 9.5L5 6.04656L8.45344 9.5L9.5 8.45344L6.04656 5L9.5 1.54656Z"
      fill={fill}
    ></path>
  </svg>
);

export default CloseIcon;
