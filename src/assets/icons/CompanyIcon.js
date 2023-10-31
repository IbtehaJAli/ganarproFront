const CompanyIcon = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 18 21"
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
      d="M16 0.5H6C4.897 0.5 4 1.397 4 2.5V8.5H2C0.897 8.5 0 9.397 0 10.5V19.5C0 19.7652 0.105357 20.0196 0.292893 20.2071C0.48043 20.3946 0.734784 20.5 1 20.5H17C17.2652 20.5 17.5196 20.3946 17.7071 20.2071C17.8946 20.0196 18 19.7652 18 19.5V2.5C18 1.397 17.103 0.5 16 0.5ZM2 10.5H8V18.5H2V10.5ZM16 18.5H10V10.5C10 9.397 9.103 8.5 8 8.5H6V2.5H16V18.5Z"
      fill={fill}
    ></path>
    <path
      d="M8 4.5H10V6.5H8V4.5ZM12 4.5H14V6.5H12V4.5ZM12 8.531H14V10.5H12V8.531ZM12 12.5H14V14.5H12V12.5ZM4 12.501H6V14.501H4V12.501Z"
      fill={fill}
    ></path>
  </svg>
);

export default CompanyIcon;
