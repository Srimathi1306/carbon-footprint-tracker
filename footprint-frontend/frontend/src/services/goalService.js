import api from "./api";

export const createGoal = (goal) => api.post("/goals/create", goal);

export const updateGoal = (id, goal) => api.put(`/goals/${id}`, goal);

export const cancelGoal = (id) => api.delete(`/goals/${id}`);

export const getGoal = () => api.get("/goals");

export const getCategories = () => api.get("/categories");
