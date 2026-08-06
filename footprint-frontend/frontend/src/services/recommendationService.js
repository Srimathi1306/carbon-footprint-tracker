import api from "./api";

export const getRecommendations = async () => {
  return await api.get("/recommendations");
};
