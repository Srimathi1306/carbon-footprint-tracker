import api from "./api";

export const getTodayMissions = () => api.get("/daily-missions");
