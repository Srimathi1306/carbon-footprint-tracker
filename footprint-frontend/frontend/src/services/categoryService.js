import api from "./api";

export const getCategories = () => {
  return api.get("/admin/categories");
};

export const getCategoryById = (id) => {
  return api.get(`/admin/categories/${id}`);
};

export const createCategory = (data) => {
  return api.post("/admin/categories", data);
};

export const updateCategory = (id, data) => {
  return api.put(`/admin/categories/${id}`, data);
};

export const deleteCategory = (id) => {
  return api.delete(`/admin/categories/${id}`);
};
