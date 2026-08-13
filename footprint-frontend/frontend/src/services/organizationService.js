import api from "./api";

export const getOrganizationUsers = () => {
  return api.get("/organization/users");
};

export const createOrganizationUser = (userData) => {
  return api.post("/organization/users", userData);
};
