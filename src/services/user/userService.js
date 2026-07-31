import { api } from "../../api/apiClient";
import { USER_ENDPOINTS } from "../../api/endpoints/user/userEndpoints";

export const getUserById = (id) =>
  api.get(USER_ENDPOINTS.BY_ID(id));