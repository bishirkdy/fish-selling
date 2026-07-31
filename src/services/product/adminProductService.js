import { api } from "../../api/apiClient";
import { ADMIN_PRODUCT_ENDPOINTS } from "../../api/endpoints/product/adminProductEndpoints";

export const addProduct = async (data) => {
  const res = await api.post(ADMIN_PRODUCT_ENDPOINTS.BASE, data);
  return res.data.data;
};

export const updateProductById = async ({ id, data }) => {
  const res = await api.patch(ADMIN_PRODUCT_ENDPOINTS.BY_ID(id), data);
  return res.data.data;
};

export const removeProduct = async (id) => {
  const res = await api.delete(ADMIN_PRODUCT_ENDPOINTS.BY_ID(id));
  return res.data;
};