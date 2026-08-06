import api from "./api";

// Get all users
export const getAllUsers = () => {
  return api.get("/admin/users");
};

export const getDashboard = () => {
  return api.get("/admin/dashboard");
};

// Get user by ID
export const getUserById = (id) => {
  return api.get(`/admin/users/${id}`);
};

// Create new user
export const createUser = (userData) => {
  return api.post("/admin/users", userData);
};

// Update user
export const updateUser = (id, userData) => {
  return api.put(`/admin/users/${id}`, userData);
};

// Delete user
export const deleteUser = (id) => {
  return api.delete(`/admin/users/${id}`);
};
