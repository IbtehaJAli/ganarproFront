const ProjectIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 18 21",
  handleClick = () => {}
}) => (
  <svg
    onClick={handleClick}
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    className={`svg-icon ${className || ""}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5263 4.71053V2.60526H7.01754V4.71053H10.5263ZM1.75439 6.81579V18.3947H15.7895V6.81579H1.75439ZM15.7895 4.71053C16.7632 4.71053 17.5439 5.64737 17.5439 6.81579V18.3947C17.5439 19.5632 16.7632 20.5 15.7895 20.5H1.75439C0.780702 20.5 0 19.5632 0 18.3947L0.00877192 6.81579C0.00877192 5.64737 0.780702 4.71053 1.75439 4.71053H5.26316V2.60526C5.26316 1.43684 6.04386 0.5 7.01754 0.5H10.5263C11.5 0.5 12.2807 1.43684 12.2807 2.60526V4.71053H15.7895Z"
      fill={fill}
    ></path>
  </svg>
);
export default ProjectIcon;
