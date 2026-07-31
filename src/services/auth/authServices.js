import { api } from "../../api/apiClient";
import { AUTH_ENDPOINTS } from "../../api/endpoints/auth/authEndpoints";

export const registerUser = (data) =>
  api.post(AUTH_ENDPOINTS.REGISTER, data);

export const loginUser = (data) =>
  api.post(AUTH_ENDPOINTS.LOGIN, data);

export const getCurrentUser = () =>
  api.get(AUTH_ENDPOINTS.PROFILE);