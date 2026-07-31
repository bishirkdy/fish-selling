import { api } from "../../api/apiClient";
import { PRODUCT_ENDPOINTS } from "../../api/endpoints/product/productEndpoints";


export const getProductsByFiltered = async (params = {}) => {
  const res = await api.get(PRODUCT_ENDPOINTS.BASE, { params });
  return res.data.data;
};

export const getSixFeaturedProduct = async () => {
  const res = await api.get(PRODUCT_ENDPOINTS.SIX_FEATURED);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(PRODUCT_ENDPOINTS.BY_ID(id));
  return res.data.data;
};