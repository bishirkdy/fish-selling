import { api } from "../../api/apiClient";
import { CATEGORY_ENDPOINTS } from "../../api/endpoints/category/categoryEndpoints";

export const getCategories = async () => {
  const res = await api.get(CATEGORY_ENDPOINTS.BASE);
  return res.data.data;
};