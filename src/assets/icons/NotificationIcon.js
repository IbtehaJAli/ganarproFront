const NotificationIcon = ({
  style = {},
  fill = "#000",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 20 22"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 18.5H0V16.5H1V9.531C1 4.543 5.03 0.5 10 0.5C14.97 0.5 19 4.543 19 9.531V16.5H20V18.5ZM3 16.5H17V9.531C17 5.648 13.866 2.5 10 2.5C6.134 2.5 3 5.648 3 9.531V16.5ZM7.5 19.5H12.5C12.5 20.163 12.2366 20.7989 11.7678 21.2678C11.2989 21.7366 10.663 22 10 22C9.33696 22 8.70107 21.7366 8.23223 21.2678C7.76339 20.7989 7.5 20.163 7.5 19.5Z"
      fill={fill}
    />
  </svg>
);

export default NotificationIcon;
