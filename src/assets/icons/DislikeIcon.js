const DislikeIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 24 24",
  handleClick = () => {}
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
      d="M20.0001 3H6.69306C6.28617 3.00135 5.88928 3.12616 5.55484 3.35792C5.22041 3.58969 4.96419 3.91749 4.82006 4.298L2.06306 11.649C2.0212 11.7613 1.99986 11.8802 2.00006 12V14C2.00006 15.103 2.89706 16 4.00006 16H9.61206L8.49006 19.367C8.39003 19.6676 8.36271 19.9877 8.41034 20.301C8.45796 20.6142 8.57919 20.9117 8.76406 21.169C9.14006 21.689 9.74606 22 10.3881 22H12.0001C12.2971 22 12.5781 21.868 12.7691 21.64L17.4691 16H20.0001C21.1031 16 22.0001 15.103 22.0001 14V5C22.0001 3.897 21.1031 3 20.0001 3ZM11.5311 20H10.3861L11.9481 15.316C11.9981 15.1657 12.0117 15.0058 11.9879 14.8492C11.964 14.6926 11.9033 14.544 11.8107 14.4155C11.7181 14.287 11.5964 14.1823 11.4554 14.1101C11.3145 14.0379 11.1584 14.0001 11.0001 14H4.00006V12.181L6.69306 5H16.0001V14.638L11.5311 20ZM18.0001 14V5H20.0001L20.0011 14H18.0001Z"
      fill={fill}
    />
  </svg>
);

export default DislikeIcon;
