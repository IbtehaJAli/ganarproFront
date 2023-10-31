const RenameIcon = ({
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
    <path
      d="M20.005 5.995H19.005V7.995H20.005V15.995H19.005V17.995H20.005C21.108 17.995 22.005 17.098 22.005 15.995V7.995C22.005 6.893 21.107 5.995 20.005 5.995ZM6.005 9.995H15V13.995H6.005V9.995Z"
      fill={fill}
    />
    <path
      d="M17.005 17.995V4H20V2H12V4H15.005V5.995H4.005C2.902 5.995 2.005 6.892 2.005 7.995V15.995C2.005 17.098 2.902 17.995 4.005 17.995H15.005V20H12V22H20V20H17.005V17.995ZM4.005 15.995V7.995H15.005V15.995H4.005Z"
      fill={fill}
    />
  </svg>
);

export default RenameIcon;
