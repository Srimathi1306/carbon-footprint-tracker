import { createContext, useState } from "react";

export const OrganizationAuthContext = createContext();

export function OrganizationAuthProvider({ children }) {
  const [organization, setOrganization] = useState(() => {
    const storedOrganization = sessionStorage.getItem("organization");

    return storedOrganization ? JSON.parse(storedOrganization) : null;
  });

  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("organizationToken");
  });

  const login = (data) => {
    setToken(data.token);
    setOrganization(data.organization);

    sessionStorage.setItem("organizationToken", data.token);
    sessionStorage.setItem("organization", JSON.stringify(data.organization));
  };

  const logout = () => {
    setToken(null);
    setOrganization(null);

    sessionStorage.removeItem("organizationToken");
    sessionStorage.removeItem("organization");
  };

  return (
    <OrganizationAuthContext.Provider
      value={{
        organization,
        token,
        login,
        logout,
      }}
    >
      {children}
    </OrganizationAuthContext.Provider>
  );
}
