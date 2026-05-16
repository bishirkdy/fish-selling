import { api } from "../../config/apiClient";

export const addShippingAddress = async (data) => {
  const res = await api.post("/addresses", data);
  return res.data;
};