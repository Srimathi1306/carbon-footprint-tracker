import organizationApi from "./organizationApi";

const ORGANIZATION_NOTIFICATIONS_API = "/organization/notifications";

const AUTH_API = "/organization/auth";
const DASHBOARD_API = "/organization/dashboard";
const USERS_API = "/organization/users";

export const registerOrganization = async (organizationData) => {
  const response = await organizationApi.post(
    `${AUTH_API}/register`,
    organizationData,
  );

  return response.data;
};

export const loginOrganization = async (loginData) => {
  const response = await organizationApi.post(`${AUTH_API}/login`, loginData);

  return response.data;
};

export const getOrganizationProfile = async () => {
  const response = await organizationApi.get("/organization/profile");

  return response.data;
};

export const updateOrganizationProfile = async (profileData) => {
  const response = await organizationApi.put(
    "/organization/profile",
    profileData,
  );

  return response.data;
};

export const getOrganizationDashboard = async () => {
  const response = await organizationApi.get(DASHBOARD_API);

  return response.data;
};

// Get all users belonging to the organization
export const getOrganizationUsers = async () => {
  const response = await organizationApi.get(USERS_API);

  return response.data;
};

// Create a user under the organization
export const createOrganizationUser = async (userData) => {
  const response = await organizationApi.post(USERS_API, userData);

  return response.data;
};

// Update a user
export const updateOrganizationUser = async (id, userData) => {
  const response = await organizationApi.put(`${USERS_API}/${id}`, userData);

  return response.data;
};

// Delete a user
export const deleteOrganizationUser = async (id) => {
  const response = await organizationApi.delete(`${USERS_API}/${id}`);

  return response.data;
};

export const getOrganizationActivities = async () => {
  const response = await organizationApi.get("/organization/activities");

  return response.data;
};

export const getOrganizationAnalytics = async () => {
  const response = await organizationApi.get("/organization/analytics");

  return response.data;
};

export const getOrganizationNotifications = async () => {
  const response = await organizationApi.get(ORGANIZATION_NOTIFICATIONS_API);

  return response.data;
};

export const markOrganizationNotificationAsRead = async (id) => {
  const response = await organizationApi.put(
    `${ORGANIZATION_NOTIFICATIONS_API}/${id}/read`,
  );

  return response.data;
};
