const PlanIcon = ({
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 18 18"
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
      d="M7 2V7H6V2H2V10H6V9H7V14H6V11H2V16H9V14H10V16H16V14H18V18H0V0H18V12H16V7H10V12H9V6H16V2H7Z"
      fill={fill}
    />
  </svg>
);

export default PlanIcon;
