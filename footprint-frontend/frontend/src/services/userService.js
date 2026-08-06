import api from "./api";

// Get logged-in user's profile
export const getProfile = () => {
  return api.get("/user/profile");
};

// Update logged-in user's profile
export const updateProfile = (userData) => {
  return api.put("/user/profile", userData);
};
