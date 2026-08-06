import api from "./api";

export const getDashboardStats = () => api.get("/admin/analytics/dashboard");

export const getTrend = (filter) =>
  api.get(`/admin/analytics/trend?filter=${filter}`);

export const getCategoryBreakdown = () =>
  api.get("/admin/analytics/categories");
