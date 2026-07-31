import { api } from "../../api/apiClient";
import { REVIEW_ENDPOINTS } from "../../api/endpoints/reviewEndpoints";

export const addReview = async (data) => {
  const res = await api.post(REVIEW_ENDPOINTS.BASE, data);
  return res.data;
};

export const getReviewsByProduct = async (productId) => {
  const res = await api.get(REVIEW_ENDPOINTS.BY_PRODUCT(productId));
  return res.data.data;
};