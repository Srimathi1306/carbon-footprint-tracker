import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { OrganizationAuthContext } from "../../context/OrganizationAuthContext";

function OrganizationProtectedRoute({ children }) {
  const { organization, token } = useContext(OrganizationAuthContext);

  if (!token || !organization) {
    return <Navigate to="/organization/login" />;
  }

  return children;
}

export default OrganizationProtectedRoute;
