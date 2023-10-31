import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
