import { api } from "../../config/apiClient";
const REVIEW = "/Review";

export const addReviewDB = async (data) => {
  const res = await api.post(`${REVIEW}`, data)
  return res.data;
};


export const getReviewsByProduct = async (productId) => {    
  const res = await api.get(`${REVIEW}/${productId}`);
  return res.data.data;
};