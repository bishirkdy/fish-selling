import { api } from "../../config/apiClient";
const ADDRESS = "/Address";
export const addShippingAddress = async (data) => {
  console.log(data)
  const res = await api.post(`${ADDRESS}`, data);
  return res.data.data;
};