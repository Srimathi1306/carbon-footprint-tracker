import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);

    sessionStorage.setItem("user", JSON.stringify(data.user));
    sessionStorage.setItem("token", data.token);
  };
  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    sessionStorage.setItem("user", JSON.stringify(updatedUser));
  };
  const logout = () => {
    setUser(null);
    setToken(null);

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
