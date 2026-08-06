import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user, token } = useContext(AuthContext);

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
