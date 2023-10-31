const EmailIcon = ({
  style = {},
  fill = "white",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 24 25",
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 5.60582C3.00276 5.54691 3.0514 5.5 3.11099 5.5H20.8888C20.9484 5.5 20.9971 5.547 20.9998 5.60599L12 11.1058L3 5.60582ZM2.99988 7.94964L12 13.4497L20.9999 7.94981V18.9444C20.9999 19.0058 20.9501 19.0556 20.8888 19.0556H3.11099C3.04962 19.0556 2.99988 19.0058 2.99988 18.9444V7.94964ZM22.9999 6.1897V18.9444C22.9999 20.1104 22.0547 21.0556 20.8888 21.0556H3.11099C1.94505 21.0556 0.999878 20.1104 0.999878 18.9444V6.16572V5.61111C0.999878 4.44518 1.94505 3.5 3.11099 3.5H20.8888C22.0547 3.5 22.9999 4.44518 22.9999 5.61111V6.14174C23.0003 6.15775 23.0003 6.17374 22.9999 6.1897Z"
      fill={fill}
    />
  </svg>
);

export default EmailIcon;
