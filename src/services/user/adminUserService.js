import { api } from "../../api/apiClient";
import { ADMIN_USER_ENDPOINTS } from "../../api/endpoints/user/adminUserEndpoints";

// export const getAllUsers = async () =>{
//   const res = await api.get(ADMIN_USER_ENDPOINTS.BASE);
//   return res.data.data;
// }

export const getUsers = async ({page = 1, pageSize = 6, search = "", status = "all"}) => {
  const res = await api.get(ADMIN_USER_ENDPOINTS.BASE, {
    params: {
      page,
      pageSize,
      search,
      status,
    },
  });  
  return res.data;
};

export const blockUser = (id) =>
  api.patch(ADMIN_USER_ENDPOINTS.BLOCK(id), {
    isBlocked: true,
  });

export const unblockUser = (id) =>
  api.patch(ADMIN_USER_ENDPOINTS.BLOCK(id), {
    isBlocked: false,
  });

export const deleteUser = (id) =>
  api.delete(ADMIN_USER_ENDPOINTS.DELETE(id));