import api from "./api";

export const getActiveEmissionFactors = () => {
  return api.get("/user/emission-factors");
};
export const userCreateEmissionFactor = (data) => {
  return api.post("/user/emission-factors", data);
};
// Admin functions (for future admin pages)

export const getAllEmissionFactors = () => {
  return api.get("/admin/emission-factors");
};

export const getEmissionFactorById = (id) => {
  return api.get(`/admin/emission-factors/${id}`);
};

export const createEmissionFactor = (data) => {
  return api.post("/admin/emission-factors", data);
};

export const updateEmissionFactor = (id, data) => {
  return api.put(`/admin/emission-factors/${id}`, data);
};

export const deleteEmissionFactor = (id) => {
  return api.delete(`/admin/emission-factors/${id}`);
};
