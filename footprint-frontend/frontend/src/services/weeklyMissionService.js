import api from "./api";

export const getWeeklyMissions = () => api.get("/weekly-missions");
