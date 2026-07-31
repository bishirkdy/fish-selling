import { api } from "../../api/apiClient";
import { AUTH_ENDPOINTS } from "../../api/endpoints/auth/authEndpoints";

export const registerUser = (data) =>
  api.post(AUTH_ENDPOINTS.REGISTER, data);

export const loginUser = async (data) => {
  const res = await api.post(AUTH_ENDPOINTS.LOGIN, data);
  return res.data.data
}
export const getCurrentUser = async () => {
  const res = await api.get(AUTH_ENDPOINTS.PROFILE);
  return res.data.data;
};