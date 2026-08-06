import api from "./api";

export const getUserActivities = () => {
  return api.get("/user/activities");
};

export const addActivity = (data) => {
  return api.post("/user/activities", data);
};

export const updateActivity = (id, data) => {
  return api.put(`/user/activities/${id}`, data);
};

export const deleteActivity = (id) => {
  return api.delete(`/user/activities/${id}`);
};
export const getAllActivities = () => {
  return api.get("/admin/activities");
};
