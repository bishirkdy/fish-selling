import { api } from "../../api/apiClient";
import { ADMIN_CATEGORY_ENDPOINTS } from "../../api/endpoints/category/adminCategoryEndpoints";

export const addCategory = async (data) => {
  const res = await api.post(ADMIN_CATEGORY_ENDPOINTS.BASE , data);  
  return res.data
};

export const deleteCategory = async (id) => {
  const res = await api.delete(`${ADMIN_CATEGORY_ENDPOINTS.BY_ID(id)}`);
  return res.data;
};