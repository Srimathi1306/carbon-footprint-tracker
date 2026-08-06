import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children }) {
  const { user, token } = useContext(AuthContext);

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default RoleProtectedRoute;
