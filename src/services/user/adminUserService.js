import { api } from "../../api/apiClient";
import { ADMIN_USER_ENDPOINTS } from "../../api/endpoints/user/adminUserEndpoints";

export const getAllUsers = () =>
  api.get(ADMIN_USER_ENDPOINTS.BASE);

export const blockUser = (id) =>
  api.patch(ADMIN_USER_ENDPOINTS.BLOCK(id), {
    isBlocked: true,
  });

export const unblockUser = (id) =>
  api.patch(ADMIN_USER_ENDPOINTS.BLOCK(id), {
    isBlocked: false,
  });