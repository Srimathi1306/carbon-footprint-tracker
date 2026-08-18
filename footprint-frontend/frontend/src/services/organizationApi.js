import axios from "axios";

const organizationApi = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

organizationApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("organizationToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default organizationApi;
